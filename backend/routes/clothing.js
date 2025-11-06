const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const { upload, getS3Url, getImageUrl, deleteFromS3, deleteImage } = require('../config/s3');
const { removeBackground } = require('../services/backgroundRemoval');
const { categorizeClothing } = require('../services/categorization');
const axios = require('axios');

// Get all clothing items for a user
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const items = await ClothingItem.find({ userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// Get a single clothing item
router.get('/:id', async (req, res, next) => {
  try {
    const item = await ClothingItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Upload and create a new clothing item
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const userId = req.body.userId;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const imageUrl = getImageUrl(req.file, req) || req.file.location || getS3Url(req.file.key);
    const fileKey = req.file.key || req.file.filename;

    // Create clothing item
    const clothingItem = new ClothingItem({
      userId,
      imageUri: imageUrl,
      s3ImageKey: fileKey,
      processingStatus: {
        backgroundRemoval: 'pending',
        categorization: 'pending',
      },
    });

    await clothingItem.save();

    // Process background removal and categorization asynchronously
    processClothingItem(clothingItem._id, imageUrl).catch(err => {
      console.error('Error processing clothing item:', err);
    });

    res.status(201).json(clothingItem);
  } catch (error) {
    next(error);
  }
});

// Update a clothing item
router.put('/:id', async (req, res, next) => {
  try {
    const updates = req.body;
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Delete a clothing item
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await ClothingItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    // Delete images
    if (item.s3ImageKey) {
      await deleteImage(item.s3ImageKey, item.s3ImageKey, item.userId);
    }
    if (item.s3BackgroundRemovedKey) {
      await deleteImage(item.s3BackgroundRemovedKey, item.s3BackgroundRemovedKey, item.userId);
    }

    await ClothingItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Clothing item deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Update laundry/usage tracking
router.patch('/:id/usage', async (req, res, next) => {
  try {
    const { action } = req.body; // 'worn' or 'washed'
    const item = await ClothingItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Clothing item not found' });
    }

    if (action === 'worn') {
      item.lastWorn = new Date();
      item.wearCount = (item.wearCount || 0) + 1;
    } else if (action === 'washed') {
      item.lastWashed = new Date();
      item.washCount = (item.washCount || 0) + 1;
    }

    await item.save();
    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Process clothing item (background removal + categorization)
async function processClothingItem(itemId, imageUrl) {
  try {
    const item = await ClothingItem.findById(itemId);
    if (!item) return;

    // Process background removal
    try {
      item.processingStatus.backgroundRemoval = 'processing';
      await item.save();

      const backgroundRemovedUrl = await removeBackground(imageUrl);
      
      // Download and upload to S3
      const response = await axios.get(backgroundRemovedUrl, { responseType: 'arraybuffer' });
      const { s3, getS3Url } = require('../config/s3');
      const s3Key = `${item.userId}/background-removed/${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
      
      await s3.putObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: s3Key,
        Body: Buffer.from(response.data),
        ContentType: 'image/png',
        ACL: 'public-read'
      }).promise();

      item.backgroundRemovedImageUri = getS3Url(s3Key);
      item.s3BackgroundRemovedKey = s3Key;
      item.processingStatus.backgroundRemoval = 'completed';
    } catch (error) {
      console.error('Background removal error:', error);
      item.processingStatus.backgroundRemoval = 'error';
      item.processingError = item.processingError || {};
      item.processingError.backgroundRemoval = error.message;
    }

    // Process categorization
    try {
      item.processingStatus.categorization = 'processing';
      await item.save();

      const categorization = await categorizeClothing(imageUrl);
      item.category = categorization.category;
      item.subcategory = categorization.subcategory;
      item.color = categorization.color;
      item.season = categorization.season;
      item.occasion = categorization.occasion;
      item.processingStatus.categorization = 'completed';
    } catch (error) {
      console.error('Categorization error:', error);
      item.processingStatus.categorization = 'error';
      item.processingError = item.processingError || {};
      item.processingError.categorization = error.message;
    }

    await item.save();
  } catch (error) {
    console.error('Error processing clothing item:', error);
  }
}

module.exports = router;

