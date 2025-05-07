import { Router, Response } from "express";

import { EventController } from "../controllers/EventController";
import { CheckRole } from "../middlewares/CheckRole";
import { VerifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";

export const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.post("/", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    eventController.createEvent(req, res)
})
eventRoutes.get("/", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res: Response) => {
    eventController.getEvents(req, res)
})
eventRoutes.get("/:id", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res: Response) => {
    eventController.getEventById(req, res)
})
eventRoutes.put("/:id", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    eventController.putEvent(req, res)
})
eventRoutes.delete("/:id", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    eventController.deleteEvent(req, res)
})