# AI Closet Backend API

Node.js + Express backend for AI Closet application.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

See `.env.example` for all required environment variables.

## API Documentation

### Clothing Endpoints

- `GET /api/clothing?userId=<userId>` - Get all clothing items for a user
- `GET /api/clothing/:id` - Get a single clothing item
- `POST /api/clothing` - Create a new clothing item (multipart/form-data with image)
- `PUT /api/clothing/:id` - Update a clothing item
- `DELETE /api/clothing/:id` - Delete a clothing item
- `PATCH /api/clothing/:id/usage` - Update usage tracking (body: `{ action: "worn" | "washed" }`)

### Outfit Endpoints

- `GET /api/outfits?userId=<userId>` - Get all outfits for a user
- `GET /api/outfits/:id` - Get a single outfit
- `POST /api/outfits` - Create a new outfit
- `PUT /api/outfits/:id` - Update an outfit
- `DELETE /api/outfits/:id` - Delete an outfit

### Health Check

- `GET /api/health` - Check API health and database connection

## Features

- **Image Upload**: Multer + S3 for image storage
- **Background Removal**: fal.ai integration
- **AI Categorization**: OpenAI GPT-4o for automatic tagging
- **Usage Tracking**: Track when items are worn/washed
- **MongoDB**: Persistent data storage

## Project Structure

```
backend/
├── config/
│   └── s3.js              # S3 configuration
├── models/
│   ├── ClothingItem.js    # Clothing item model
│   └── Outfit.js          # Outfit model
├── routes/
│   ├── clothing.js        # Clothing routes
│   ├── outfits.js         # Outfit routes
│   ├── images.js          # Image upload routes
│   └── health.js          # Health check route
├── services/
│   ├── backgroundRemoval.js  # Background removal service
│   └── categorization.js     # AI categorization service
├── server.js              # Express server
└── package.json
```

