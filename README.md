<<<<<<< HEAD
# 🚀 Welcome to Z.ai Code Scaffold

A modern, production-ready web application scaffold powered by cutting-edge technologies, designed to accelerate your development with [Z.ai](https://chat.z.ai)'s AI-powered coding assistance.

## ✨ Technology Stack

This scaffold provides a robust foundation built with:

### 🎯 Core Framework
- **⚡ Next.js 15** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🌈 Framer Motion** - Production-ready motion library for React
- **🎨 Next Themes** - Perfect dark mode in 2 lines of code

### 📋 Forms & Validation
- **🎣 React Hook Form** - Performant forms with easy validation
- **✅ Zod** - TypeScript-first schema validation

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - Simple, scalable state management
- **🔄 TanStack Query** - Powerful data synchronization for React
- **🌐 Axios** - Promise-based HTTP client

### 🗄️ Database & Backend
- **🗄️ Prisma** - Next-generation Node.js and TypeScript ORM
- **🔐 NextAuth.js** - Complete open-source authentication solution

### 🎨 Advanced UI Features
- **📊 TanStack Table** - Headless UI for building tables and datagrids
- **🖱️ DND Kit** - Modern drag and drop toolkit for React
- **📊 Recharts** - Redefined chart library built with React and D3
- **🖼️ Sharp** - High performance image processing

### 🌍 Internationalization & Utilities
- **🌍 Next Intl** - Internationalization library for Next.js
- **📅 Date-fns** - Modern JavaScript date utility library
- **🪝 ReactUse** - Collection of essential React hooks for modern development

## 🎯 Why This Scaffold?

- **🏎️ Fast Development** - Pre-configured tooling and best practices
- **🎨 Beautiful UI** - Complete shadcn/ui component library with advanced interactions
- **🔒 Type Safety** - Full TypeScript configuration with Zod validation
- **📱 Responsive** - Mobile-first design principles with smooth animations
- **🗄️ Database Ready** - Prisma ORM configured for rapid backend development
- **🔐 Auth Included** - NextAuth.js for secure authentication flows
- **📊 Data Visualization** - Charts, tables, and drag-and-drop functionality
- **🌍 i18n Ready** - Multi-language support with Next Intl
- **🚀 Production Ready** - Optimized build and deployment settings
- **🤖 AI-Friendly** - Structured codebase perfect for AI assistance

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 🤖 Powered by Z.ai

This scaffold is optimized for use with [Z.ai](https://chat.z.ai) - your AI assistant for:

- **💻 Code Generation** - Generate components, pages, and features instantly
- **🎨 UI Development** - Create beautiful interfaces with AI assistance  
- **🔧 Bug Fixing** - Identify and resolve issues with intelligent suggestions
- **📝 Documentation** - Auto-generate comprehensive documentation
- **🚀 Optimization** - Performance improvements and best practices

Ready to build something amazing? Start chatting with Z.ai at [chat.z.ai](https://chat.z.ai) and experience the future of AI-powered development!
=======
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
>>>>>>> 6adbe868b9cd82cd2868ccf3305329840468af50

## 📁 Project Structure

```
<<<<<<< HEAD
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations
```

## 🎨 Available Features & Components

This scaffold includes a comprehensive set of modern web development tools:

### 🧩 UI Components (shadcn/ui)
- **Layout**: Card, Separator, Aspect Ratio, Resizable Panels
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Badge, Avatar, Calendar

### 📊 Advanced Data Features
- **Tables**: Powerful data tables with sorting, filtering, pagination (TanStack Table)
- **Charts**: Beautiful visualizations with Recharts
- **Forms**: Type-safe forms with React Hook Form + Zod validation

### 🎨 Interactive Features
- **Animations**: Smooth micro-interactions with Framer Motion
- **Drag & Drop**: Modern drag-and-drop functionality with DND Kit
- **Theme Switching**: Built-in dark/light mode support

### 🔐 Backend Integration
- **Authentication**: Ready-to-use auth flows with NextAuth.js
- **Database**: Type-safe database operations with Prisma
- **API Client**: HTTP requests with Axios + TanStack Query
- **State Management**: Simple and scalable with Zustand

### 🌍 Production Features
- **Internationalization**: Multi-language support with Next Intl
- **Image Optimization**: Automatic image processing with Sharp
- **Type Safety**: End-to-end TypeScript with Zod validation
- **Essential Hooks**: 100+ useful React hooks with ReactUse for common patterns

## 🤝 Get Started with Z.ai

1. **Clone this scaffold** to jumpstart your project
2. **Visit [chat.z.ai](https://chat.z.ai)** to access your AI coding assistant
3. **Start building** with intelligent code generation and assistance
4. **Deploy with confidence** using the production-ready setup

---

Built with ❤️ for the developer community. Supercharged by [Z.ai](https://chat.z.ai) 🚀
=======
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

### Deploying to Vercel (no EC2 required)

1. **Prepare the build**
   ```bash
   npm install
   npm run build:web        # exports static web app to dist/
   ```
2. **Environment variables (set in Vercel Project → Settings → Environment Variables)**
   - `EXPO_PUBLIC_API_URL=https://wardrobe-ten-phi.vercel.app/api`
   - `MONGODB_URI=<your MongoDB Atlas URI>`
   - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`
   - `OPENAI_API_KEY`, `FAL_API_KEY`
   - `CORS_ORIGIN=https://wardrobe-ten-phi.vercel.app`
3. **Deploy**
   ```bash
   npm i -g vercel
   vercel --prod
   ```
4. **Verify**
   - API health: `https://<your-vercel-domain>/api/health`
   - Frontend served from `dist/`

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
>>>>>>> 6adbe868b9cd82cd2868ccf3305329840468af50
