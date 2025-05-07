import { Response, NextFunction} from "express";
import { AuthenticatedRequest } from "./verifyToken";

export const CheckRole = (...allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "Access denied: insufficient permissions" });
            return;
        }

        next();
    };
};
