import { Router, Request, Response } from "express";
import { PresenceController } from "../controllers/PresenceController";

export const presenceRouter = Router();

const presenceController = new PresenceController();

presenceRouter.post("/", async (req: Request, res: Response) => {
    presenceController.createPresence(req, res);
});
presenceRouter.get("/", async (req: Request, res: Response) => {
    presenceController.getPresences(req, res);
});
presenceRouter.get("/:id", async (req: Request, res: Response) => {
    presenceController.getPresenceById(req, res);
});
presenceRouter.put("/:id", async (req: Request, res: Response) => {
    presenceController.putPresence(req, res);
});
presenceRouter.delete("/:id", async (req: Request, res: Response) => {
    presenceController.deletePresence(req, res);
});
