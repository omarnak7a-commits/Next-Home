const express = require('express');
const Property = require('../models/Property');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
router.get('/', asyncHandler(async (req, res, next) => {
  const properties = await Property.find();
  res.status(200).json({
    success: true,
    count: properties.length,
    data: properties
  });
}));

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse('Property not found', 404));
  }

  res.status(200).json({
    success: true,
    data: property
  });
}));

// @desc    Create new property
// @route   POST /api/properties
// @access  Private/Admin
router.post('/', asyncHandler(async (req, res, next) => {
  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    data: property
  });
}));

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Admin
router.put('/:id', asyncHandler(async (req, res, next) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!property) {
    return next(new ErrorResponse('Property not found', 404));
  }

  res.status(200).json({
    success: true,
    data: property
  });
}));

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorResponse('Property not found', 404));
  }

  await property.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
}));

module.exports = router;