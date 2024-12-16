import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from '..';

interface DecodedToken {
  userId?: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No authentication token provided",
        });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
        if (!decoded.userId) {
            return res.status(401).json({
                message: "Invalid token: No user ID found",
            });
        }

        // Extend the Request interface to include userId
        (req as Request & { userId?: string }).userId = decoded.userId;
        return next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token has expired",
            });
        }
        
        return res.status(403).json({
            message: "Invalid authentication token",
        });
    }
}