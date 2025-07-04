const Review = require('../models/Review');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('dish');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('dish');
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    Object.assign(review, req.body);
    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json({ message: 'Reseña eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 