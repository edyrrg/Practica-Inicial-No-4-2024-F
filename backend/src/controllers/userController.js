const User = require('../models/User');

exports.getAllUsers = async (_req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ error: 'Invalid id' });
        }
        const user = await User.getById(parsedId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error retrieving user' });
    }
};

exports.findUserByCarnet = async (req, res) => {
    try {
        const { carnet_id } = req.body;
        console.log(carnet_id);
        if (!carnet_id) {
            return res.status(400).json({ error: 'Missing carnet_id' });
        }
        const parsedCarnetId = parseInt(carnet_id);
        const user = await User.findByCarnet(parsedCarnetId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving user' });
    }
}

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
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        if (!req.body.carnetID || !req.body.nombres || !req.body.apellidos || !req.body.correo) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const msg = await User.update(id, req.body);
        res.status(200).json({ ...msg });
    } catch (error) {
        if (error.message === 'User not found or no changes made') {
            return res.status(404).json({ error: error.message });
        }
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
        const { carnet_id, pass } = req.body;
        if (!carnet_id || !pass) {
            return res.status(400).json({ error: 'Missing email or password' });
        }
        const parsed_carnet_id = parseInt(carnet_id);
        const user = await User.findByCarnet(parsed_carnet_id);
        if (user && user.contraseña === pass) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { carnet_id, correo, new_pass } = req.body;
        if (!carnet_id || !correo || !new_pass) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const parsed_carnet_id = parseInt(carnet_id);
        const msg = await User.resetPassword(parsed_carnet_id, correo, new_pass);
        
        res.status(200).json({ ...msg });
    } catch (error) {
        if (error.message === 'User not found and password not updated') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error reset password' });
    }
}
