import { Router, Request, Response } from "express"
import { UserController } from "../controllers/UserController"

export const userRouter = Router();

const userController = new UserController();

userRouter.post("/", async (req: Request, res: Response) => {
    userController.createUser(req, res)
});
userRouter.get("/", async (req: Request, res: Response) => {
    userController.getUsers(req, res)
});
userRouter.get("/:id", async (req: Request, res: Response) => {
    userController.getUserById(req, res)
})
userRouter.put("/:id", async (req: Request, res: Response) => {
    userController.putUser(req, res)
})
userRouter.delete("/:id", async (req: Request, res: Response) => {
    userController.deleteUser(req, res)
})