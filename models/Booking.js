const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Please add check-in date']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in months'],
    min: 1,
    max: 12
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please add total price']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  invoiceNumber: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate total price before saving
BookingSchema.pre('save', async function(next) {
  if (!this.isNew) return next();
  
  const property = await this.model('Property').findById(this.property);
  this.totalPrice = property.price * this.duration;
  
  // Generate unique invoice number
  const timestamp = new Date().getTime();
  this.invoiceNumber = `NH-${timestamp.toString().slice(-6)}`;
  
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);