import { Router, Response } from "express";

import { EventController } from "../controllers/EventController";
import { CheckRole } from "../middlewares/CheckRole";
import { VerifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";

export const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.post("/", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: POST in /events")
    eventController.createEvent(req, res)
});
eventRoutes.get("/", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /events")
    eventController.getEvents(req, res)
});
eventRoutes.get("/:id", VerifyToken, CheckRole("admin", "angel", "visitor"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: GET in /events/:id")
    eventController.getEventById(req, res)
});
eventRoutes.put("/:id", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: PUT in /events/:id")
    eventController.putEvent(req, res)
});
eventRoutes.delete("/:id", VerifyToken, CheckRole("admin", "angel"), async (req: AuthenticatedRequest, res: Response) => {
    console.log("Method: DELETE in /events/:id")
    eventController.deleteEvent(req, res)
});