const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    enum: ['cairo', 'alexandria', 'mansoura', 'assuit', 'tanta', 'zagazig', 'helwan']
  },
  university: {
    type: String,
    required: [true, 'Please specify the nearest university']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Please add number of bedrooms']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Please add number of bathrooms']
  },
  area: {
    type: Number,
    required: [true, 'Please add area in square meters']
  },
  amenities: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Cascade delete bookings when property is deleted
PropertySchema.pre('remove', async function(next) {
  await this.model('Booking').deleteMany({ property: this._id });
  next();
});

module.exports = mongoose.model('Property', PropertySchema);