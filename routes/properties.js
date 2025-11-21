const express = require('express');
const Property = require('../models/Property');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
router.get('/', asyncHandler(async (req, res, next) => {
  const properties = await Property.find().populate('ownerId', 'name');
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
}));

// @desc    Create new property
// @route   POST /api/properties
// @access  Private
router.post('/', asyncHandler(async (req, res, next) => {
  // Get user from protect middleware
  req.body.ownerId = req.user.id;
  
  const property = await Property.create(req.body);
  
  res.status(201).json({
    success: true,
    data: property
  });
}));

module.exports = router;