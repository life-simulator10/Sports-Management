import jwt from "jsonwebtoken";
import { User } from '../Models/User.js';

export const Authenticated = async (req, res, next) => {
    const token = req.header("Auth");

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Login Required" }); // Send a 401 Unauthorized status
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "!@#$()*", { algorithms: ['HS256'] });
        const id = decoded.userId;

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" }); // Send a 404 Not Found status
        }

        // Attach user to request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle verification errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid Token" }); // Token verification failed
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" }); // Token expired
        } else {
            console.error('Token verification error:', error);
            return res.status(500).json({ message: "Internal Server Error" }); // Handle other errors
        }
    }
};
