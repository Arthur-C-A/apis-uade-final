const Dish = require('../models/Dish');

// Get all active dishes (handles legacy data without 'isActive' field)
exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({ isActive: { $ne: false } });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dishes by category (only active ones, handles legacy data)
exports.getDishesByCategory = async (req, res) => {
  try {
    const dishes = await Dish.find({ 
      category: req.params.category, 
      isActive: { $ne: false }
    });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new dish
exports.createDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    const newDish = await dish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update dish
exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    Object.assign(dish, req.body);
    const updatedDish = await dish.save();
    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logical delete a dish
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
        deletedAt: new Date(),
        deletedBy: req.user.userId // From requireAdmin middleware
      },
      { new: true }
    );

    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }

    res.json({ message: 'Plato eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 