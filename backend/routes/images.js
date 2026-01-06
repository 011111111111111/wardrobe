const express = require('express');
const router = express.Router();
const { upload, getS3Url, getImageUrl } = require('../config/s3');

// Upload a single image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  res.json({
    url: getImageUrl(req.file, req) || getS3Url(req.file.key),
    key: req.file.key || req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// Upload multiple images
router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No image files provided' });
  }

  const uploadedFiles = req.files.map(file => ({
    url: getImageUrl(file, req) || getS3Url(file.key),
    key: file.key || file.filename,
    size: file.size,
    mimetype: file.mimetype
  }));

  res.json({ files: uploadedFiles });
});

module.exports = router;

