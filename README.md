🛒 MarketBaseX — Full-Stack E-Commerce Platform

MarketBaseX is a scalable, production-ready e-commerce web application built using the MERN stack. It delivers a seamless shopping experience with a modern UI, secure authentication, real-time data handling, and integrated online payments.

🚀 Live Demo

🔗 Explore the live application:
https://marketbasex-ki1yihvn0-mutukuvincent752-7467s-projects.vercel.app/

📌 Overview

MarketBaseX is designed to simulate a real-world online store, featuring both customer-facing functionality and a powerful admin dashboard. The platform emphasizes performance, usability, and clean architecture.

✨ Key Features
🛍️ Customer Features
Browse and search products
View detailed product pages with reviews
Add items to cart and checkout securely
User registration and authentication
🔐 Authentication & Security
JWT-based authentication
HTTP-only cookies for enhanced security
Protected routes for users and admins
💳 Payments
Integrated PayPal Sandbox for secure transactions
Order creation and payment tracking
📷 Media Handling
Image uploads and optimization using Cloudinary
🛠️ Admin Dashboard
Manage products (Create, Read, Update, Delete)
Manage users and orders
Monitor platform activity and performance
📱 UI/UX
Fully responsive design
Clean and modern interface built with Tailwind CSS
🏗️ Tech Stack
Frontend
React.js (Vite)
Redux Toolkit (State Management)
Tailwind CSS
Backend
Node.js
Express.js
Database & Services
MongoDB Atlas
Cloudinary (Media Storage)
PayPal SDK (Payments)
⚙️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/vin-devs/marketbasex.git
cd marketbasex
2️⃣ Backend Setup
cd backend
npm install --legacy-peer-deps

Create a .env file in /backend and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
NODE_ENV=development

Run the backend:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🌐 Deployment
Service	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas
📁 Project Structure
marketbasex/
│
├── backend/        # Express API & business logic
├── frontend/       # React application (Vite)
├── uploads/        # Local storage (fallback)
└── README.md
🎯 Future Improvements
Stripe payment integration
Product filtering & sorting enhancements
Wishlist functionality
Email notifications (orders, verification)
Performance optimization & caching
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Vincent Mutuku

GitHub: https://github.com/vin-devs
