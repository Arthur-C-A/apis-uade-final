const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const { requireAdmin } = require('../controllers/authController');

// Rutas públicas
router.get('/', dishController.getDishes);
router.get('/category/:category', dishController.getDishesByCategory);
router.get('/:id', dishController.getDishById);

// Rutas protegidas (solo admin)
router.post('/', requireAdmin, dishController.createDish);
router.put('/:id', requireAdmin, dishController.updateDish);
router.delete('/:id', requireAdmin, dishController.deleteDish);

module.exports = router; 