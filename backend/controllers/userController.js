const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'El nombre de usuario y la contraseña son obligatorios.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe.' });
    }

    const user = new User({ username, password, role });
    await user.save();

    // Avoid sending password back
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ message: 'Usuario creado exitosamente', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active users (handles legacy data)
exports.getUsers = async (req, res) => {
  try {
    // Exclude passwords from the result
    const users = await User.find({ isActive: { $ne: false } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    const updateData = { username, role };

    // Prevent password updates through this endpoint for security
    // A separate "change password" endpoint would be better
    
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logical delete a user
exports.deleteUser = async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.user.userId === req.params.id) {
        return res.status(400).json({ message: 'No se puede eliminar a sí mismo.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
        deletedAt: new Date(),
        deletedBy: req.user.userId // from requireAdmin middleware
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 