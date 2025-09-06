# E-Commerce Single Page Application (SPA)

A complete full-stack e-commerce application built with React.js frontend and Node.js/Express backend with MongoDB database. Features user authentication, product management, shopping cart functionality, and responsive design.

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based authentication with secure password hashing
- **Product Management**: Full CRUD operations for items/products
- **Advanced Filtering**: Filter products by category, price range, and search terms
- **Shopping Cart**: Persistent cart functionality tied to user accounts
- **Data Validation**: Comprehensive input validation and error handling
- **RESTful APIs**: Well-structured API endpoints following REST conventions

### Frontend Features
- **Modern React**: Built with functional components and React Hooks
- **State Management**: Context API for authentication and cart state
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Routing**: React Router for seamless navigation
- **Real-time Updates**: Dynamic cart updates and user feedback
- **Error Handling**: Graceful error states and loading indicators

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
internshala/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   └── cartController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── items.js
│   │   └── cart.js
│   ├── config.env
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ItemCard.js
│   │   │   ├── FilterBar.js
│   │   │   ├── CartItem.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Cart.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd internshala
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```bash
   cd ../backend
   cp config.env .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

5. **Database Setup**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in your `.env` file.

6. **Seed the Database (Optional)**
   ```bash
   cd backend
   node seed.js
   ```
   This will populate your database with sample products.

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Items Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/items` | Get all items (with filters) | Public |
| GET | `/api/items/:id` | Get single item | Public |
| POST | `/api/items` | Create new item | Public* |
| PUT | `/api/items/:id` | Update item | Public* |
| DELETE | `/api/items/:id` | Delete item | Public* |

*For demo purposes, item CRUD is public. In production, these should be admin-only.

### Cart Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/cart` | Get user cart | Private |
| POST | `/api/cart/add` | Add item to cart | Private |
| POST | `/api/cart/remove` | Remove item from cart | Private |
| PUT | `/api/cart/update` | Update cart item quantity | Private |
| DELETE | `/api/cart/clear` | Clear entire cart | Private |

### Query Parameters for Items

- `category`: Filter by category (Electronics, Clothing, Books, etc.)
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `search`: Search in name and description

Example: `GET /api/items?category=Electronics&minPrice=100&maxPrice=1000&search=phone`

## 🎯 Usage Guide

### For Users

1. **Registration/Login**
   - Create a new account or login with existing credentials
   - Authentication is required for cart functionality

2. **Browsing Products**
   - View all available products on the home page
   - Use filters to narrow down products by category, price, or search terms
   - Click on "Add to Cart" to add items to your cart

3. **Shopping Cart**
   - View your cart by clicking the cart icon in the navigation
   - Adjust quantities or remove items
   - Cart persists across browser sessions and login/logout

### For Developers

1. **Adding New Features**
   - Backend: Add new routes in the `routes/` directory
   - Frontend: Create new components in the `components/` directory
   - State management: Use Context API for global state

2. **Database Models**
   - User model includes authentication and cart data
   - Item model supports categories, pricing, and inventory
   - Cart items are embedded in the User document

3. **Authentication**
   - JWT tokens are stored in localStorage
   - Automatic token refresh and logout on expiration
   - Protected routes require authentication

## 🔧 Configuration

### Backend Configuration
- **Port**: Default 5000 (configurable via PORT env variable)
- **Database**: MongoDB connection string in MONGODB_URI
- **JWT Secret**: Change JWT_SECRET for production

### Frontend Configuration
- **API Base URL**: Default `http://localhost:5000/api`
- **Port**: Default 3000 (React development server)

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Update CORS settings for production domain

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Update API base URL for production backend

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network access for MongoDB Atlas

2. **CORS Errors**
   - Backend CORS is configured for `http://localhost:3000`
   - Update CORS settings for different frontend URLs

3. **Authentication Issues**
   - Clear localStorage and try logging in again
   - Check JWT secret configuration
   - Verify token expiration settings

4. **Cart Not Persisting**
   - Ensure user is logged in
   - Check network requests in browser dev tools
   - Verify backend cart endpoints are working

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as a complete e-commerce solution demonstrating modern web development practices with React.js and Node.js.

---

**Note**: This is a demo application. For production use, implement additional security measures, payment processing, and admin functionality as needed.
