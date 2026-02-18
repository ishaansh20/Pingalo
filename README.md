# Pingalo - Modern URL Shortener

<div align="center">

![Pingalo](https://img.shields.io/badge/Pingalo-URL%20Shortener-orange?style=for-the-badge)
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=for-the-badge&logo=render)](DEPLOYMENT.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A full-stack URL shortener application with analytics, QR codes, and modern UI design.

[Live Demo](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Deployment](DEPLOYMENT.md)

</div>

---

## 🚀 Features

### Core Functionality

- ✨ **URL Shortening** - Convert long URLs into short, shareable links
- 📊 **Analytics Dashboard** - Track clicks, devices, countries, and trends
- 📱 **QR Code Generation** - Auto-generate QR codes for each short link
- 🔐 **Authentication** - Secure user registration and login
- 🎨 **Modern UI** - Clean, responsive design with smooth animations

### Advanced Features

- 📈 **Real-time Analytics** - View clicks over time with interactive charts
- 🌍 **Geographic Data** - See where your links are being clicked
- 💻 **Device Tracking** - Understand which devices your audience uses
- 🔗 **Link Management** - Copy, view analytics, and delete links easily
- 🎯 **Rate Limiting** - Built-in protection against abuse
- ⚡ **Fast & Scalable** - Optimized for performance

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **QRCode.react** - QR code generation

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Express Rate Limit** - API rate limiting
- **UAParser.js** - User agent parsing
- **QRCode** - Server-side QR generation

---

## 📁 Project Structure

```
LinkShortner/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── common/     # Common components (ProtectedRoute)
│   │   │   ├── layouts/    # Layout components (Navbar, Footer)
│   │   │   └── sections/   # Page sections (Hero, CTA, Features)
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── ui/             # UI components (Button, Input, Card)
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Entry point
│   └── package.json
│
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ishaansh20/Pingalo.git
   cd Pingalo
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create `.env` file in `server/` directory:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/pingalo
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=http://localhost:5173
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

   Create `.env` file in `client/` directory:

   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Run the Application**

   **Terminal 1 - Backend:**

   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd client
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📖 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### URL Endpoints (Protected)

#### Create Short URL

```http
POST /api/url
Authorization: Bearer <token>
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url"
}
```

#### Get User URLs

```http
GET /api/url
Authorization: Bearer <token>
```

#### Delete URL

```http
DELETE /api/url/:id
Authorization: Bearer <token>
```

### Analytics Endpoints (Protected)

#### Get URL Analytics

```http
GET /api/analytics/:shortCode
Authorization: Bearer <token>
```

### Redirect Endpoint (Public)

#### Redirect to Original URL

```http
GET /:shortCode
```

---

## 🎨 UI Components

The application uses a custom component library:

- **Button** - Multiple variants (primary, secondary, outline, ghost, danger)
- **Input** - Form input with error handling
- **Card** - Flexible card with hover effects
- **Container** - Max-width wrapper for content
- **Section** - Section wrapper with consistent spacing
- **AuthCard** - Centered layout for auth pages

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected API routes
- ✅ Rate limiting on all endpoints
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variable protection
- ✅ XSS protection

---

## 📊 Analytics Features

### Metrics Tracked

- Total clicks per short URL
- Clicks over time (daily breakdown)
- Geographic distribution (country-level)
- Device type (Desktop, Mobile, Tablet)
- Referrer sources

### Visualization

- Line charts for temporal trends
- Pie charts for distribution
- Bar charts for comparisons
- Stat cards for key metrics

---

## 🚢 Deployment

Ready to deploy? Follow our comprehensive [Deployment Guide](DEPLOYMENT.md) for step-by-step instructions on deploying to Render with MongoDB Atlas.

**Quick Deploy:**

1. Setup MongoDB Atlas database
2. Deploy backend on Render
3. Deploy frontend on Render
4. Configure environment variables
5. Done! 🎉

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Ishaan Sharma**

- GitHub: [@ishaansh20](https://github.com/ishaansh20)
- Repository: [Pingalo](https://github.com/ishaansh20/Pingalo)

---

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- Built with ❤️ using React, Node.js, and MongoDB
- Special thanks to the open-source community

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Deployment Guide](DEPLOYMENT.md)
2. Open an [Issue](https://github.com/ishaansh20/Pingalo/issues)
3. Review closed issues for solutions

---

<div align="center">

**Made with ❤️ by Ishaan Sharma**

⭐ Star this repo if you find it helpful!

</div>
