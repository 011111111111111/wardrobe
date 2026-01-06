const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');

// Check if S3 is configured
const isS3Configured = process.env.AWS_ACCESS_KEY_ID && 
                       process.env.AWS_SECRET_ACCESS_KEY && 
                       process.env.S3_BUCKET_NAME &&
                       process.env.AWS_ACCESS_KEY_ID !== 'your_aws_access_key';

// Configure AWS S3 (if available)
let s3 = null;
if (isS3Configured) {
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
  });
}

// Create uploads directory for local storage
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage (S3 if configured, otherwise local)
let storage;
if (isS3Configured) {
  // Use S3 storage
  storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      const userId = req.body.userId || 'anonymous';
      const folder = file.fieldname === 'backgroundRemoved' ? 'background-removed' : 'original';
      const filename = `${userId}/${folder}/${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, filename);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    }
  });
} else {
  // Use local file storage
  console.log('⚠️  S3 not configured, using local file storage');
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const userId = req.body.userId || 'anonymous';
      const userDir = path.join(uploadsDir, userId);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }
      cb(null, userDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
}

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Helper function to get image URL
const getImageUrl = (file, req) => {
  if (!file) return null;
  
  if (isS3Configured) {
    // S3 URL
    return file.location || `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${file.key}`;
  } else {
    // Local file URL (relative path for serving)
    const userId = req.body.userId || 'anonymous';
    return `/uploads/${userId}/${file.filename}`;
  }
};

// Helper function to get S3 URL (for backward compatibility)
const getS3Url = (key) => {
  if (!key) return null;
  if (isS3Configured) {
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
  }
  return null;
};

// Helper function to delete image
const deleteImage = async (key, filename, userId) => {
  try {
    if (isS3Configured && key) {
      // Delete from S3
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key
      }).promise();
      return true;
    } else if (filename && userId) {
      // Delete local file
      const filePath = path.join(uploadsDir, userId, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Helper function to delete from S3 (for backward compatibility)
const deleteFromS3 = async (key) => {
  return deleteImage(key, null, null);
};

module.exports = {
  s3,
  upload,
  getS3Url,
  getImageUrl,
  deleteFromS3,
  deleteImage,
  isS3Configured
};

