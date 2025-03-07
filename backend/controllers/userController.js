const User = require("../model/user.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


exports.signin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 4) {
            return res.status(400).json({ message: "Username should contain at least 4 characters" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be at least 6 characters long" });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input fields
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username },
            "raguladr", 
            { expiresIn: "2d" }
        );

        return res.status(200).json({
            id: existingUser._id,
            message: "Login successful",
            token,
            user: { username: existingUser.username, email: existingUser.email }
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};
    


