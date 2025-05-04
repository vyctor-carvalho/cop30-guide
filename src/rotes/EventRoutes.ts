import { Router, Request, Response } from "express";
import { EventController } from "../controllers/EventController"

export const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.post("/", async (req: Request, res: Response) => {
    eventController.createEvent(req, res)
})
eventRoutes.get("/", async (req: Request, res: Response) => {
    eventController.getEvents(req, res)
})
eventRoutes.get("/:id", async (req: Request, res: Response) => {
    eventController.getEventById(req, res)
})
eventRoutes.put("/:id", async (req: Request, res: Response) => {
    eventController.putEvent(req, res)
})
eventRoutes.delete("/:id", async (req: Request, res: Response) => {
    eventController.deleteEvent(req, res)
})