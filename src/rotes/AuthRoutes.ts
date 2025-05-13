import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRotes = Router();

const authController = new AuthController();

authRotes.post("/", async (req: Request, res: Response) => {
    console.log("Method: POST in /login")
    authController.login(req, res)
});