# AI Closet - Architecture Overview

## System Architecture

```
┌──────────────────────────┐
│        Users (UI)         │
│ ┌───────────┐ ┌────────┐ │
│ │ Web (React│ │ Mobile │ │
│ │ Browser)  │ │ (Expo) │ │
│ └───────────┘ └────────┘ │
└──────────┬──────────────┘
           │ HTTPS (API Requests)
           ▼
┌────────────────────────────────┐
│         Backend Service         │
│      Node.js + Express API      │
│  - Background removal           │
│  - Metadata tagging             │
│  - Laundry & usage tracking     │
│  - Outfit save/view             │
└───────────┬────────────────────┘
            │
            ▼
┌────────────────────────────────┐
│        MongoDB Database        │
│ Stores:                        │
│  - Clothing metadata           │
│  - Usage statistics            │
│  - User data                   │
└────────────────────────────────┘
            │
            ▼
┌────────────────────────────────┐
│        Image Storage (S3)       │
│  - Clothing images              │
│  - Background removed assets    │
└────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React Native** (Expo) - Cross-platform mobile app
- **React** - Web version (via Expo Web)
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database (via Mongoose)
- **AWS S3** - Image storage
- **Multer** - File upload handling

### AI Services
- **OpenAI GPT-4o** - Clothing categorization
- **fal.ai** - Background removal
- **Kwai Kolors** - Virtual try-on (planned)

## Data Flow

### Adding a Clothing Item

1. User selects/takes photo
2. Frontend uploads image to backend API
3. Backend uploads image to S3
4. Backend creates MongoDB document
5. Backend processes image asynchronously:
   - Background removal (fal.ai)
   - Categorization (OpenAI)
6. Backend updates MongoDB with results
7. Frontend polls for updates
8. UI updates when processing completes

### Creating an Outfit

1. User arranges clothing items on canvas
2. User saves outfit
3. Frontend sends outfit data to backend
4. Backend saves to MongoDB
5. If outfit image exists, upload to S3
6. Frontend receives saved outfit

## API Endpoints

### Clothing
- `GET /api/clothing?userId=<id>` - List all items
- `GET /api/clothing/:id` - Get single item
- `POST /api/clothing` - Create item (multipart/form-data)
- `PUT /api/clothing/:id` - Update item
- `DELETE /api/clothing/:id` - Delete item
- `PATCH /api/clothing/:id/usage` - Track usage

### Outfits
- `GET /api/outfits?userId=<id>` - List all outfits
- `GET /api/outfits/:id` - Get single outfit
- `POST /api/outfits` - Create outfit
- `PUT /api/outfits/:id` - Update outfit
- `DELETE /api/outfits/:id` - Delete outfit

## Database Schema

### ClothingItem
```javascript
{
  userId: String,
  imageUri: String (S3 URL),
  s3ImageKey: String,
  backgroundRemovedImageUri: String,
  s3BackgroundRemovedKey: String,
  category: String,
  subcategory: String,
  tags: [String],
  color: [String],
  season: [String],
  occasion: [String],
  brand: String,
  purchaseDate: String,
  price: Number,
  processingStatus: {
    backgroundRemoval: String,
    categorization: String
  },
  lastWorn: Date,
  wearCount: Number,
  lastWashed: Date,
  washCount: Number
}
```

### Outfit
```javascript
{
  userId: String,
  imageUri: String (S3 URL),
  s3ImageKey: String,
  clothingItems: [{
    clothingItemId: ObjectId,
    transform: { x, y, scale, rotation },
    zIndex: Number
  }],
  tags: [String],
  season: [String],
  occasion: [String]
}
```

## Security Considerations

- API keys stored in environment variables
- S3 bucket with proper IAM permissions
- CORS configured for frontend origins
- User isolation via userId
- File upload validation and size limits

## Future Enhancements

- User authentication (JWT)
- Rate limiting
- Image optimization
- CDN for image delivery
- Real-time updates (WebSockets)
- Offline support
- Batch operations
- Analytics and insights

