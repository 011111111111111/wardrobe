const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  imageUri: {
    type: String,
    required: true
  },
  s3ImageKey: {
    type: String,
    required: true
  },
  backgroundRemovedImageUri: {
    type: String,
    default: ''
  },
  s3BackgroundRemovedKey: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  subcategory: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  color: [{
    type: String
  }],
  season: [{
    type: String
  }],
  occasion: [{
    type: String
  }],
  brand: {
    type: String,
    default: ''
  },
  purchaseDate: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  processingStatus: {
    backgroundRemoval: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'error'],
      default: 'pending'
    },
    categorization: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'error'],
      default: 'pending'
    }
  },
  processingError: {
    backgroundRemoval: String,
    categorization: String
  },
  // Laundry & usage tracking
  lastWorn: {
    type: Date
  },
  wearCount: {
    type: Number,
    default: 0
  },
  lastWashed: {
    type: Date
  },
  washCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
clothingItemSchema.index({ userId: 1, createdAt: -1 });
clothingItemSchema.index({ userId: 1, category: 1 });
clothingItemSchema.index({ userId: 1, tags: 1 });

module.exports = mongoose.model('ClothingItem', clothingItemSchema);

