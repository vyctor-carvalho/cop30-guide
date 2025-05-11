import { Router, Response } from "express";

import { PresenceController } from "../controllers/PresenceController";
import { VerifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";
import { CheckRole } from "../middlewares/CheckRole";

export const presenceRouter = Router();

const presenceController = new PresenceController();

presenceRouter.post("/", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    presenceController.createPresence(req, res);
});
presenceRouter.get("/", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    presenceController.getPresences(req, res);
});
presenceRouter.get("/FKs", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    presenceController.getPresenceByFKs(req, res);
});
presenceRouter.get("/event/:id", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res:Response) => {
    presenceController.getPresenceByEvent(req, res);
});
presenceRouter.put("/:id", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    presenceController.putPresence(req, res);
});
presenceRouter.delete("/:id", VerifyToken, CheckRole("admin"), async (req: AuthenticatedRequest, res: Response) => {
    presenceController.deletePresence(req, res);
});

