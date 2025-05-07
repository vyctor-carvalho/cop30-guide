import { Router, Request, Response } from "express"

import { UserController } from "../controllers/UserController"
import { VerifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";
import { CheckRole } from "../middlewares/CheckRole";

export const userRouter = Router();

const userController = new UserController();

userRouter.post("/", async (req: AuthenticatedRequest, res: Response) => {
    userController.createUser(req, res)
});
userRouter.get("/", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    userController.getUsers(req, res)
});
userRouter.get("/:id", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    userController.getUserById(req, res)
})
userRouter.put("/:id", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res: Response) => {
    userController.putUser(req, res)
})
userRouter.delete("/:id", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    userController.deleteUser(req, res)
})