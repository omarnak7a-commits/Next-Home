const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Body parser
app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));

// API routes
const auth = require('./routes/auth');
const properties = require('./routes/properties');
const bookings = require('./routes/bookings');
const contact = require('./routes/contact');

app.use('/api/auth', auth);
app.use('/api/properties', properties);
app.use('/api/bookings', bookings);
app.use('/api/contact', contact);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});