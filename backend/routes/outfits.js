const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const { upload, getS3Url, getImageUrl, deleteFromS3, deleteImage } = require('../config/s3');

// Get all outfits for a user
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const outfits = await Outfit.find({ userId })
      .populate('clothingItems.clothingItemId')
      .sort({ createdAt: -1 });
    res.json(outfits);
  } catch (error) {
    next(error);
  }
});

// Get a single outfit
router.get('/:id', async (req, res, next) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
      .populate('clothingItems.clothingItemId');
    
    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }
    res.json(outfit);
  } catch (error) {
    next(error);
  }
});

// Create a new outfit
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { userId, clothingItems, tags, season, occasion } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const outfitData = {
      userId,
      clothingItems: JSON.parse(clothingItems || '[]'),
      tags: JSON.parse(tags || '[]'),
      season: JSON.parse(season || '[]'),
      occasion: JSON.parse(occasion || '[]'),
    };

    if (req.file) {
      outfitData.imageUri = getImageUrl(req.file, req) || getS3Url(req.file.key);
      outfitData.s3ImageKey = req.file.key || req.file.filename;
    }

    const outfit = new Outfit(outfitData);
    await outfit.save();
    
    const populatedOutfit = await Outfit.findById(outfit._id)
      .populate('clothingItems.clothingItemId');

    res.status(201).json(populatedOutfit);
  } catch (error) {
    next(error);
  }
});

// Update an outfit
router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const updates = { ...req.body };
    
    // Parse JSON fields if they're strings
    if (updates.clothingItems && typeof updates.clothingItems === 'string') {
      updates.clothingItems = JSON.parse(updates.clothingItems);
    }
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = JSON.parse(updates.tags);
    }
    if (updates.season && typeof updates.season === 'string') {
      updates.season = JSON.parse(updates.season);
    }
    if (updates.occasion && typeof updates.occasion === 'string') {
      updates.occasion = JSON.parse(updates.occasion);
    }

    if (req.file) {
      const outfit = await Outfit.findById(req.params.id);
      if (outfit && outfit.s3ImageKey) {
        await deleteImage(outfit.s3ImageKey, outfit.s3ImageKey, outfit.userId);
      }
      updates.imageUri = getImageUrl(req.file, req) || getS3Url(req.file.key);
      updates.s3ImageKey = req.file.key || req.file.filename;
    }

    const outfit = await Outfit.findByIdAndUpdate(
      req.params.id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('clothingItems.clothingItemId');

    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    res.json(outfit);
  } catch (error) {
    next(error);
  }
});

// Delete an outfit
router.delete('/:id', async (req, res, next) => {
  try {
    const outfit = await Outfit.findById(req.params.id);
    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found' });
    }

    // Delete image
    if (outfit.s3ImageKey) {
      await deleteImage(outfit.s3ImageKey, outfit.s3ImageKey, outfit.userId);
    }

    await Outfit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Outfit deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

