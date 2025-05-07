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

        if (user == null) return res.status(401).json({ error: 'Credenciais inválidas' });

        const machPassword = await bcrypt.compare(password, user.password());

        if (!machPassword) return res.status(401).json({ error: 'Credenciais inválidas' });

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            }, 
            JWT_SECRET
        )

        return res.json({
            message: 'Login realizado com sucesso',
            token
        });
    }

}
