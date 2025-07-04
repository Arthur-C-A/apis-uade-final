const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAdmin } = require('../controllers/authController');

// All user routes are protected and require admin role
router.use(requireAdmin);

// GET /users - List all users
router.get('/', userController.getUsers);

// POST /users - Create a new user
router.post('/', userController.createUser);

// PUT /users/:id - Update a user
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Logically delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router; 