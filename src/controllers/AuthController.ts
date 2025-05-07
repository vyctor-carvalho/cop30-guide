import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserService } from "../service/UserService";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../server";

export class AuthController {

    private userService = new UserService();

    async login(req: Request, res: Response) {
        
        const { email, password } = req.body;

        const user = await this.userService.findByEmail(email);

        if (user == null) return res.status(401).json({ 
            error: "Invalid email"
        });

        const machPassword = await bcrypt.compare(password, user.password());

        if (!machPassword) return res.status(401).json({
            error: "Invalid password"
        });

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            }, 
            JWT_SECRET
        )

        return res.json({
            message: "Login successfully",
            token
        });
    }

}
