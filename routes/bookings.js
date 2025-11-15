const express = require('express');
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');
const InvoiceGenerator = require('../utils/invoiceGenerator');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, asyncHandler(async (req, res, next) => {
  let query;
  
  if (req.user.role === 'admin') {
    query = Booking.find().populate('user property');
  } else {
    query = Booking.find({ user: req.user.id }).populate('property');
  }
  
  const bookings = await query;
  
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
}));

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).populate('user property');

  if (!booking) {
    return next(new ErrorResponse('Booking not found', 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to view this booking', 403));
  }

  res.status(200).json({
    success: true,
    data: booking
  });
}));

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, asyncHandler(async (req, res, next) => {
  const { property, checkIn, duration } = req.body;

  // Get property
  const prop = await Property.findById(property);
  if (!prop) {
    return next(new ErrorResponse('Property not found', 404));
  }

  // Check if property is available
  if (!prop.available) {
    return next(new ErrorResponse('Property is not available', 400));
  }

  // Create booking
  const booking = await Booking.create({
    user: req.user.id,
    property,
    checkIn,
    duration
  });

  // Mark property as unavailable
  prop.available = false;
  await prop.save();

  // Generate invoice
  const user = await User.findById(req.user.id);
  const invoiceBuffer = await InvoiceGenerator.generateInvoice(booking, user, prop);

  res.status(201).json({
    success: true,
    data: booking,
    invoice: booking.invoiceNumber
  });
}));

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse('Booking not found', 404));
  }

  // Make sure user is booking owner
  if (booking.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to cancel this booking', 403));
  }

  // Mark property as available
  const property = await Property.findById(booking.property);
  property.available = true;
  await property.save();

  await booking.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
}));

module.exports = router;