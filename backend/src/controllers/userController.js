// controllers/userController.js
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { carnetID, nombres, apellidos, correo, pass } = req.body;
        const newUser = new User(carnetID, nombres, apellidos, correo, pass);
        const userId = await newUser.save();
        res.status(201).json({ id: userId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.update(req.params.id, req.body);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.getByEmail(req.body.correo);
        if (user && user.pass === req.body.pass) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}
