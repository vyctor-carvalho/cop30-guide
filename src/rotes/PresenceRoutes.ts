import { Router, Response } from "express";

import { PresenceController } from "../controllers/PresenceController";
import { VerifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";
import { CheckRole } from "../middlewares/CheckRole";

export const presenceRouter = Router();

const presenceController = new PresenceController();

presenceRouter.post("/", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: POST in /presence")
    presenceController.createPresence(req, res);
});
presenceRouter.get("/", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /presence")
    presenceController.getPresences(req, res);
});
presenceRouter.get("/FKs", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /presence/FKs")
    presenceController.getPresenceByFKs(req, res);
});
presenceRouter.get("/event/:id", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res:Response) => {
    console.log("Method: GET in /presence/event/:id")
    presenceController.getPresenceByEvent(req, res);
});
presenceRouter.put("/", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: PUT in /presence")
    presenceController.putPresence(req, res);
});
presenceRouter.delete("/", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: DELETE in /presence/del")
    presenceController.deletePresence(req, res);
});

