import { Router, Request, Response } from "express"

import { UserController } from "../controllers/UserController"
import { VerifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";
import { CheckRole } from "../middlewares/CheckRole";

export const userRouter = Router();

const userController = new UserController();

userRouter.post("/", async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: POST in /users")
    userController.createUser(req, res)
});
userRouter.post("/assign", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: POST in /users/assign")
    userController.assignVisitor(req, res)
});
userRouter.get("/", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /users")
    userController.getUsers(req, res)
});
userRouter.get("/:id", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /users/:id")
    userController.getUserById(req, res)
});
userRouter.get("/visitors/:id", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /users/visitors/:id")
    userController.getVisitorByAngel(req, res)
})
userRouter.put("/:id", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: PUT in /users/:id")
    userController.putUser(req, res)
});
userRouter.delete("/:id", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: DELETE in /users/:id")
    userController.deleteUser(req, res)
});