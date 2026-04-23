const User = require('../models/User');

// GET /users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success : true,
            data : users
        });
    }   catch (err) {
        res.status(500).json({
            success : false,
            error : err.message
        });
    }
};

// POST /users
exports.createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = await User.create({ username, password, role });
        res.status(201).json({
            success : true,
            data : newUser
        });
    }   catch (err) {
        res.status(400).json({
            success : false,
            error : err.message
        });
    }
};