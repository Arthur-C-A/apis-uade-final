const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Entradas', 'Pizzas', 'Pastas', 'Postres']
  },
  description: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String,
    required: false
  }],
  recipe: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dish', dishSchema); 