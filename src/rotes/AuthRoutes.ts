import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRotes = Router();

const authController = new AuthController();

authRotes.post("/", async (req: Request, res: Response) => {
    authController.login(req, res)
});