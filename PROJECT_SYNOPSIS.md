# Digital Wardrobe Application
## Project Synopsis

### Title
**Digital Wardrobe Application – Automated Deployment and Monitoring using Terraform, Ansible, and Nagios**

---

## Introduction

In today's digital age, technology plays an essential role in simplifying everyday tasks. Managing personal wardrobes often becomes disorganized and time-consuming. The Digital Wardrobe Application aims to transform this experience by allowing users to upload and manage their clothing collection digitally.

The system automatically removes the background from uploaded clothing images and stores them with descriptive metadata such as color, type, occasion, and season. Users can track the laundry status of their clothes, view usage statistics, and save favorite outfit combinations for quick access.

From a DevOps perspective, the project incorporates automation and monitoring using Terraform, Ansible, and Nagios to ensure consistent deployment, scalability, and continuous system health tracking. This integration ensures reliable application performance, reduced manual intervention, and an efficient CI/CD workflow.

---

## Problem Statement

Traditional wardrobe management applications often require manual configuration and lack infrastructure automation. Setting up and maintaining environments manually can lead to inconsistencies, scalability issues, and downtime. Furthermore, users lack an intelligent digital platform to organize, track, and plan their clothing effectively.

This project addresses these challenges by building a feature-rich wardrobe management system integrated with DevOps automation tools for seamless infrastructure setup, configuration management, and continuous monitoring.

---

## Objectives

### 1. Application Objectives

- Develop a digital wardrobe system that enables users to upload clothing images and automatically remove the background.
- Allow users to tag each item with attributes like color, type, occasion, and season.
- Provide features for tracking laundry status, monitoring clothing usage frequency, and saving outfit combinations.

### 2. DevOps Objectives

- Utilize Terraform to automate cloud infrastructure provisioning.
- Implement Ansible for configuration management and automated deployment.
- Integrate Nagios for monitoring infrastructure, application uptime, and resource performance.
- Establish an automated CI/CD workflow ensuring faster, error-free releases.

---

## Tools and Technologies Used

| Category | Tools / Technologies |
|----------|---------------------|
| Frontend | React.js (Expo/React Native), HTML, CSS, JavaScript, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Image Storage | AWS S3 |
| AI Services | OpenAI (GPT-4o), fal.ai (Background Removal) |
| Infrastructure Automation | Terraform (Planned) |
| Configuration Management | Ansible (Planned) |
| Monitoring | Nagios (Planned) |
| Version Control | Git and GitHub |
| Containerization | Docker (Optional) |
| Cloud Platform | AWS |

---

## Application Features

### Core Features (Implemented)

1. **Image Upload & Management**
   - Upload clothing images from camera or gallery
   - Automatic background removal using AI
   - Image storage in AWS S3

2. **Automatic Categorization**
   - AI-powered categorization using OpenAI GPT-4o
   - Automatic detection of:
     - Category (Tops, Bottoms, Dresses, etc.)
     - Subcategory (T-Shirt, Jeans, etc.)
     - Colors (up to 5 primary colors)
     - Seasons (Spring, Summer, Fall, Winter)
     - Occasions (Casual, Work, Formal, Party, etc.)

3. **Laundry & Usage Tracking**
   - Track when items were last worn
   - Track wear count (usage frequency)
   - Track when items were last washed
   - Track wash count
   - View usage statistics

4. **Outfit Management**
   - Create outfit combinations on a freeform canvas
   - Drag and drop clothing items
   - Save favorite outfits
   - Tag outfits with seasons and occasions
   - View all saved outfits

5. **Search & Filter**
   - Filter by category
   - Filter by tags
   - Search clothing items
   - View items by color, season, or occasion

6. **Metadata Management**
   - Custom tags
   - Brand information
   - Purchase date
   - Price tracking

### Planned DevOps Features

- Terraform infrastructure as code
- Ansible configuration management
- Nagios monitoring and alerting
- CI/CD pipeline automation

---

## Expected Outcomes / Results

- A fully functional Digital Wardrobe Application with automatic background removal and attribute tagging.
- Centralized wardrobe management with features like laundry tracking, usage count, and outfit organization.
- Automated provisioning and configuration of infrastructure using Terraform and Ansible (Planned).
- Continuous monitoring and alerting through Nagios, ensuring system reliability and proactive maintenance (Planned).
- Enhanced operational efficiency, faster deployments, and reduced manual workload through Infrastructure as Code (IaC) principles (Planned).

---

## Future Enhancements

- **Integration of Puppet**: Introduce Puppet as an additional configuration management tool to support large-scale deployments and further streamline automation.
- **AI-Based Classification**: Implement machine learning models to automatically detect clothing attributes (type, color, occasion) from uploaded images. *(Partially implemented with OpenAI)*
- **Weather-Based Recommendations**: Integrate a weather API to suggest suitable outfits based on real-time or forecasted weather data.
- **AI-Powered Virtual Try-On**: Use generative AI to simulate how selected clothes would look on the user or with new purchases. *(Partially implemented)*
- **Enhanced Analytics**: Provide wardrobe insights such as item usage frequency, underused clothes, and seasonal trends to help users make informed fashion decisions.

---

## Current Implementation Status

### ✅ Completed
- Frontend application (React Native/Expo with Web support)
- Backend API (Node.js + Express)
- MongoDB database integration
- AWS S3 image storage
- Automatic background removal
- AI-powered categorization
- Laundry and usage tracking
- Outfit management
- Search and filtering

### 🚧 In Progress / Planned
- Terraform infrastructure automation
- Ansible configuration management
- Nagios monitoring setup
- CI/CD pipeline
- User authentication
- Enhanced analytics dashboard

---

## Getting Started

See [README_SETUP.md](README_SETUP.md) for detailed setup instructions.

Quick Start:
```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Configure environment variables
# Edit backend/.env with your MongoDB, AWS, and API keys

# Start the application
npm run web  # For web version
npm start    # For mobile/Expo
```

---

## Project Structure

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
├── assets/               # Static assets
└── docs/                 # Documentation
```

---

## License

MIT License

---

## Contact & Support

For issues, questions, or contributions, please refer to the project repository.

