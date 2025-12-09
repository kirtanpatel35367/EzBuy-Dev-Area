# 📦 EzBuy — Modern E-Commerce Web Application

EzBuy is a full-stack **E-Commerce web application** built using the **MERN Stack** with modern tools such as **Redux Toolkit**, **RTK Query**, **TailwindCSS**, **ShadCN UI**, and **Stripe payments**.  
It provides a fast, interactive, and scalable shopping experience with clean architecture and feature-based modular structure.

---

## 🚀 Tech Stack

### **Frontend**
- ⚛ React  
- 🛠 Redux Toolkit (State Management)  
- 🔄 RTK Query (API Integration + Caching)  
- 🎨 Tailwind CSS  
- 🌈 ShadCN UI Components  

### **Backend**
- 🟩 Node.js  
- 🌐 Express.js  
- 🍃 MongoDB (Mongoose ODM)

### **Payments**
- 💳 Stripe Checkout Sessions

---

## ✨ Features

- 🔐 User Authentication (Login / Register)  
- 🛒 Add to Cart, Remove from Cart  
- ❤️ Wishlist Support  
- 📦 Product Listing with Filters  
- 🔍 Product Detail Pages  
- 💳 Stripe Payment Integration  
- 📱 Fully Responsive UI  
- ⚡ Blazing Fast API communication using RTK Query  
- 🎯 Ready Structure for Admin Dashboard Expansion  

---

## 📂 Folder Structure
EzBuy-Dev-Area/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── features/ # Modular feature folders (auth, cart, products)
│ │ ├── pages/
│ │ ├── store/ # Redux Toolkit + RTK Query setup
│ │ ├── services/ # Centralized API logic
│ │ └── utils/
│ └── public/
│
└── server/ # Node.js Backend
├── routes/ # API route definitions
├── controllers/ # Request handlers
├── services/ # Business logic
├── models/ # Database schemas (MongoDB)
├── middlewares/ # Auth, validation, etc.
├── config/ # Environment + DB config
└── utils/ # Helpers, formatters, constants

---

## 🛠 Installation & Setup

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/kirtanpatel35367/EzBuy-Dev-Area.git
cd EzBuy-Dev-Area

cd client
npm install

cd server
npm install

Backend .env
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
- STRIPE_SECRET_KEY=your_stripe_secret
- CLIENT_URL=http://localhost:5173

Frontend .env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```


