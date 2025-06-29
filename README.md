# Nestigo 🏠✈️

**Making travel easy and enjoyable**

Nestigo is an intuitive vacation rental platform that connects travelers with unique accommodations worldwide. Our platform allows guests to find and book their ideal stay with confidence, while hosts benefit from secure transactions and dedicated support to manage their listings effortlessly.

## 🌟 About Nestigo

At Nestigo, we believe in making travel easy and enjoyable. Whether you're looking for a cozy beachfront cottage, a modern downtown loft, or a luxury penthouse with city views, our platform offers diverse accommodations to suit every traveler's needs and budget.

**🌐 Live Platform**: [https://nestigo-elhe.onrender.com](https://nestigo-elhe.onrender.com)

## ✨ Key Features

### For Travelers 🧳
- **Diverse Accommodations**: From ₹1,000 to ₹50,000+ per night
  - Beachfront cottages and mountain retreats
  - Modern lofts and downtown apartments  
  - Historic villas and luxury penthouses
  - Unique stays like treehouses and safari lodges
  - Premium hotels and boutique properties

- **Transparent Pricing**: Clear cost breakdown with 18% GST calculations
- **Easy Search & Discovery**: Find properties by location, price, and amenities
- **Secure Booking Process**: Safe and reliable reservation system
- **Detailed Listings**: High-quality photos and comprehensive property information

### For Hosts 🏡
- **Simple Listing Management**: Easy-to-use interface for property owners
- **Secure Transactions**: Protected payment processing
- **Dedicated Support**: Comprehensive assistance for listing management
- **Real-time Availability**: Live booking calendar and availability updates
- **Performance Analytics**: Track your listing's performance and revenue

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3/SCSS** - Modern styling with responsive design
- **JavaScript (ES6+)** - Interactive user interface
- **Bootstrap/Tailwind** - Responsive UI components

### Backend
- **Node.js** - Server-side runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for scalable data storage
- **Mongoose** - Object Data Modeling (ODM) library

### Additional Services
- **JWT Authentication** - Secure user session management
- **Cloudinary/AWS S3** - Image storage and optimization
- **Stripe/Razorpay** - Payment gateway integration
- **Nodemailer** - Email notifications and communication
- **Google Maps API** - Location services and mapping

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rohitsolanki01/Nestigo.git
cd Nestigo
```

### 2. Install Dependencies
```bash
# Install all project dependencies
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/nestigo
MONGODB_URI_PROD=your_mongodb_atlas_connection_string

# Server Configuration
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Image Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# External APIs
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
WEATHER_API_KEY=your_weather_api_key
```

### 4. Database Setup
```bash
# Start MongoDB service (if running locally)
sudo service mongod start

# Or start MongoDB with mongod command
mongod

# Seed the database with sample data (optional)
npm run seed
```

### 5. Run the Application
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
Nestigo/
├── public/                  # Static assets
│   ├── images/             # Image assets
│   ├── css/                # Stylesheets
│   └── js/                 # Client-side JavaScript
├── views/                   # Template files (EJS/Handlebars)
│   ├── layouts/            # Layout templates
│   ├── partials/           # Reusable template components
│   └── pages/              # Page templates
├── routes/                  # Express route definitions
│   ├── auth.js             # Authentication routes
│   ├── listings.js         # Property listing routes
│   ├── bookings.js         # Booking management routes
│   └── users.js            # User management routes
├── models/                  # Database models
│   ├── User.js             # User model
│   ├── Listing.js          # Property listing model
│   ├── Booking.js          # Booking model
│   └── Review.js           # Review model
├── middleware/              # Custom middleware
│   ├── auth.js             # Authentication middleware
│   ├── validation.js       # Input validation
│   └── upload.js           # File upload handling
├── controllers/             # Route controllers
│   ├── authController.js   # Authentication logic
│   ├── listingController.js # Listing management
│   └── bookingController.js # Booking operations
├── utils/                   # Utility functions
│   ├── database.js         # Database connection
│   ├── email.js            # Email utilities
│   └── helpers.js          # General helper functions
├── config/                  # Configuration files
│   ├── database.js         # Database configuration
│   └── cloudinary.js       # Image upload configuration
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
└── server.js               # Main application entry point
```

## 🏨 Featured Property Types

### Vacation Rentals
- **Cozy Beachfront Cottage** - ₹3,000/night
- **Mountain Retreat** - ₹1,800/night  
- **Secluded Treehouse Getaway** - ₹1,200/night
- **Lakefront Cabin in New Hampshire** - ₹1,800/night

### Urban Accommodations  
- **Modern Loft in Downtown** - ₹3,000/night
- **Modern Apartment in Tokyo** - ₹1,000/night
- **Luxury Penthouse with City Views** - ₹5,000/night

### Premium Properties
- **Historic Villa in Tuscany** - ₹2,500/night
- **Safari Lodge in the Serengeti** - ₹4,000/night
- **Historic Canal House** - ₹5,000/night
- **Hotel Du Cap-Eden-Roc** - ₹50,000/night

*All prices include transparent 18% GST calculations*

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login  
POST   /api/auth/logout       # User logout
GET    /api/auth/profile      # Get user profile
PUT    /api/auth/profile      # Update user profile
```

### Listings
```
GET    /api/listings          # Get all listings
GET    /api/listings/:id      # Get specific listing
POST   /api/listings          # Create new listing (host only)
PUT    /api/listings/:id      # Update listing (owner only)
DELETE /api/listings/:id      # Delete listing (owner only)
```

### Bookings
```
POST   /api/bookings          # Create new booking
GET    /api/bookings/guest    # Get guest bookings
GET    /api/bookings/host     # Get host bookings  
PUT    /api/bookings/:id      # Update booking status
DELETE /api/bookings/:id      # Cancel booking
```

### Search & Filters
```
GET    /api/search            # Search listings
GET    /api/listings/filter   # Filter by criteria
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Production Deployment on Render

1. **Connect Repository**: Link your GitHub repository to Render
2. **Environment Variables**: Set all required environment variables in Render dashboard
3. **Build Settings**: 
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. **Deploy**: Automatic deployment on push to main branch

### Alternative Deployment Options

#### Heroku
```bash
# Install Heroku CLI and login
heroku login

# Create new Heroku app
heroku create nestigo-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri

# Deploy to Heroku
git push heroku main
```

#### DigitalOcean/AWS
- Use Docker for containerized deployment
- Set up reverse proxy with Nginx
- Configure SSL certificates with Let's Encrypt

## 📊 Performance Features

- **Responsive Design**: Optimized for all device sizes
- **Image Optimization**: Compressed images for faster loading
- **Caching**: Strategic caching for improved performance
- **SEO Optimized**: Meta tags and structured data
- **Progressive Web App**: App-like experience on mobile devices

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🔮 Roadmap & Future Enhancements

### Phase 1 - Core Features ✅
- [x] User authentication and profiles
- [x] Property listing management
- [x] Booking system with payment integration
- [x] Search and filtering functionality
- [x] Responsive web design

### Phase 2 - Enhanced Experience 🚧
- [ ] Mobile application (React Native/Flutter)
- [ ] Advanced search filters (amenities, accessibility)
- [ ] Instant booking feature
- [ ] Host analytics dashboard
- [ ] Guest review and rating system

### Phase 3 - Advanced Features 📋
- [ ] Multi-language support
- [ ] Wishlist and favorites
- [ ] Social media integration
- [ ] In-app messaging system
- [ ] Smart pricing recommendations
- [ ] Travel insurance integration

## 🛡️ Security Features

- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Data Validation**: Input sanitization and validation
- **HTTPS Encryption**: Secure data transmission
- **Payment Security**: PCI DSS compliant payment processing
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing security

## 📈 Analytics & Monitoring

- **User Analytics**: Track user behavior and platform usage
- **Performance Monitoring**: Application performance metrics
- **Error Tracking**: Real-time error monitoring and alerting
- **Business Metrics**: Booking conversion rates and revenue tracking

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rohit Solanki**
- GitHub: [@rohitsolanki01](https://github.com/rohitsolanki01)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/rohit-solanki-495860348/)
- Portfolio: [View my work](https://rohitsolanki.dev)
- Email: rohitsolanki0473@gmail.com

## 🙏 Acknowledgments

- Thanks to the travel and hospitality industry for inspiration
- Appreciation for the open-source community and their contributions
- Special thanks to all early users and beta testers
- Gratitude to mentors and fellow developers for guidance

## 📞 Support & Contact

**Need Help?**
- 📧 **Email**: support@nestigo.com
- 🐛 **Bug Reports**: [Open an issue](https://github.com/rohitsolanki01/Nestigo/issues)
- 💡 **Feature Requests**: [Submit a feature request](https://github.com/rohitsolanki01/Nestigo/issues/new)
- 📖 **Documentation**: [Visit our wiki](https://github.com/rohitsolanki01/Nestigo/wiki)

## 🌟 Show Your Support

If you find Nestigo helpful and enjoy using it:

- ⭐ **Star this repository** on GitHub
- 🐛 **Report bugs** to help us improve
- 💡 **Suggest features** for future development
- 🤝 **Contribute** to make Nestigo even better
- 📢 **Share** with friends and fellow developers

---

**Built with ❤️ for travelers seeking unique experiences worldwide**

*Making every journey memorable, one stay at a time* 🌍✨
