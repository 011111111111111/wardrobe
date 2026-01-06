const mongoose = require('mongoose');

const outfitItemSchema = new mongoose.Schema({
  clothingItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingItem',
    required: true
  },
  transform: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    scale: { type: Number, default: 1 },
    rotation: { type: Number, default: 0 }
  },
  zIndex: {
    type: Number,
    default: 0
  }
}, { _id: false });

const outfitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  imageUri: {
    type: String,
    default: ''
  },
  s3ImageKey: {
    type: String,
    default: ''
  },
  clothingItems: [outfitItemSchema],
  tags: [{
    type: String
  }],
  season: [{
    type: String
  }],
  occasion: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes
outfitSchema.index({ userId: 1, createdAt: -1 });
outfitSchema.index({ userId: 1, tags: 1 });

module.exports = mongoose.model('Outfit', outfitSchema);

