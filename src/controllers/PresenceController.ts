import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { PresenceDTO } from "../DTO/PresenceDTO";
import { PresenceService } from "../service/PresenceService";
import { EventService } from "../service/EventService"

export class PresenceController {

    private presenceService = new PresenceService();

    private eventService = new EventService();

    async createPresence(req: Request, res: Response): Promise<Response> {
        try {
            const presenceDTO = plainToInstance(PresenceDTO, req.body);

            const presence = await this.presenceService.createPResence(presenceDTO);

            if (typeof presence === "string") {
                return res.status(404).json({ message: presence });
            }

            if ('errors' in presence) {
                return res.status(400).json({ errors: presence.errors });
            }

            return res.status(201).json({
                message: "Presence created",
                data: presence
            });

        } catch (err: any) {
            return res.status(err.status || 500).json({
                message: err.message,
                error: err
            });
        }
    }

    async getPresences(req: Request, res: Response): Promise<Response> {
        const presences = await this.presenceService.findAllPresences();

        if (presences.length === 0) {
            return res.status(200).json({ message: "Presences list is empty" });
        }

        return res.status(200).json(presences);
    }

    async getPresenceById(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const presence = await this.presenceService.findUPresenceById(id);

        if (!presence) {
            return res.status(404).json({ message: `Presence with id ${id} not found` });
        }

        return res.status(200).json(presence);
    }

    async getPresenceByEvent(req: Request, res: Response): Promise<Response> {

        const event_id = req.params.id;

        const presence = await this.presenceService.findPresenceByEvent(event_id);

        if (presence == null) {
            return res.status(404).json({
                mensage: `Event whith id ${event_id} not found`
            })
        }

        return res.status(200).json(presence);
    }

    async putPresence(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const presenceDTO = plainToInstance(PresenceDTO, req.body);

            const presence = await this.presenceService.putPresence(id, presenceDTO);

            if (typeof presence === "string") {
                return res.status(404).json({ message: presence });
            }

            if ('errors' in presence) {
                return res.status(400).json({ errors: presence.errors });
            }

            return res.status(200).json({
                message: "Presence updated",
                data: presence
            });

        } catch (err: any) {
            return res.status(err.status || 500).json({
                message: err.message,
                error: err
            });
        }
    }

    async deletePresence(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;

            const presence = await this.presenceService.deletePresence(id);

            if (!presence) {
                return res.status(404).json({ message: `Presence with id ${id} not found` });
            }

            return res.status(200).json({ message: "Presence deleted" });

        } catch (err: any) {
            return res.status(err.status || 500).json({
                message: err.message,
                error: err
            });
        }
    }
}
