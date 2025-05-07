import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../server";

export interface AuthenticatedRequest extends Request{
    user?: any
}

export const VerifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ 
            message: "Missing or invalid token" 
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        
        const decodeToken = jwt.verify(token, JWT_SECRET);

        req.user = decodeToken;

        next();

    } catch {
        res.status(403).json({
            message: "Token is invalid or expired"
        });
        return;
    }

}