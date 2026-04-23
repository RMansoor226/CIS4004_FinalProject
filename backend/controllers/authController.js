const User = require('../models/User');

// POST /login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});

        // Check if username belongs to existing user
        if (!user) {
            return res.status(400).json({
                error : "Invalid username"
            });
        }

        // Check is password is correct
        if (user.password !== password) {
            return res.status(400).json({
                error : "Invalid password"
            });
        }

        res.json({
            message: "Successful login",
            user : {
                id : user._id,
                username : user.username,
                role : user.role
            }
        });

    }   catch (err) {
        res.status(500).json({
            error : err.message
        });
    }
}