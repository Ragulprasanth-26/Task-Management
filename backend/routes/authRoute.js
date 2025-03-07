const jwt = require("jsonwebtoken")
const authenticateToken =(req,res,next)=>{
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), "raguladr"); // Replace with process.env.JWT_SECRET
        req.user = decoded; // Attach decoded user info to request object

        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = {authenticateToken}
