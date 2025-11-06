# Digital Wardrobe Application

A comprehensive digital wardrobe management system that allows users to organize, track, and manage their clothing collection with AI-powered features.

## 🎯 Features

### Core Features
- **📸 Image Upload & Management**: Upload clothing images from camera or gallery
- **🤖 Automatic Background Removal**: AI-powered background removal using fal.ai
- **🏷️ Automatic Categorization**: AI-powered tagging using OpenAI GPT-4o
  - Category detection (Tops, Bottoms, Dresses, etc.)
  - Color detection (up to 5 primary colors)
  - Season detection (Spring, Summer, Fall, Winter)
  - Occasion detection (Casual, Work, Formal, Party, etc.)
- **👕 Laundry & Usage Tracking**:
  - Track when items were last worn
  - Track wear count (usage frequency)
  - Track when items were last washed
  - Track wash count
- **👗 Outfit Management**:
  - Create outfit combinations on a freeform canvas
  - Drag and drop clothing items
  - Save favorite outfits
  - Tag outfits with seasons and occasions
- **🔍 Search & Filter**:
  - Filter by category
  - Filter by tags
  - Search clothing items
  - View items by color, season, or occasion

## 🏗️ Architecture

```
Frontend (React Native/Expo)
    ↓
Backend API (Node.js + Express)
    ↓
MongoDB Database
    ↓
AWS S3 (Image Storage)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- AWS S3 bucket (for image storage)
- API Keys:
  - OpenAI API key
  - fal.ai API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd wardrobe
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

3. **Configure environment variables**

**Frontend** (`.env` in root):
```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

**Backend** (`backend/.env`):
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-closet
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=ai-closet-images
OPENAI_API_KEY=your_openai_api_key
FAL_API_KEY=your_fal_api_key
CORS_ORIGIN=http://localhost:19006,http://localhost:3001
```

4. **Start the application**

**Option 1: Using the startup script (Windows)**
```powershell
.\start-app.ps1
```

**Option 2: Manual start**

Start backend:
```bash
cd backend
npm run dev
```

Start frontend (in a new terminal):
```bash
npm run web    # For web browser
npm start      # For mobile/Expo
```

## 📱 Usage

### Adding Clothing Items
1. Click the "+" button
2. Take a photo or select from gallery
3. Wait for automatic processing:
   - Background removal
   - Categorization and tagging
4. Edit metadata if needed
5. Save the item

### Tracking Usage
1. Open a clothing item
2. In the "Usage & Laundry Tracking" section:
   - Click "Mark as Worn" to track when you wear it
   - Click "Mark as Washed" to track laundry

### Creating Outfits
1. Go to the Outfits tab
2. Click "Create Outfit"
3. Drag and drop clothing items onto the canvas
4. Arrange items as desired
5. Save the outfit

## 🛠️ Technology Stack

- **Frontend**: React Native, Expo, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: AWS S3
- **AI Services**: OpenAI (GPT-4o), fal.ai

## 📁 Project Structure

```
wardrobe/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── contexts/          # State management
│   ├── screens/           # App screens
│   ├── services/          # API services
│   └── types/             # TypeScript types
├── backend/               # Backend API
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── config/           # Configuration
└── assets/               # Static assets
```

## 📚 Documentation

- [Setup Guide](README_SETUP.md) - Detailed setup instructions
- [Architecture](ARCHITECTURE.md) - System architecture overview
- [Project Synopsis](PROJECT_SYNOPSIS.md) - Project documentation
- [Backend API](backend/README.md) - Backend API documentation

## 🔧 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm start
```

### API Endpoints

- `GET /api/clothing?userId=<id>` - Get all clothing items
- `POST /api/clothing` - Create clothing item
- `GET /api/clothing/:id` - Get single clothing item
- `PUT /api/clothing/:id` - Update clothing item
- `DELETE /api/clothing/:id` - Delete clothing item
- `PATCH /api/clothing/:id/usage` - Update usage tracking

See [backend/README.md](backend/README.md) for complete API documentation.

## 🎓 Project Information

This project is part of a DevOps course submission focusing on:
- Application development
- Infrastructure automation (Terraform - Planned)
- Configuration management (Ansible - Planned)
- Monitoring (Nagios - Planned)

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.
