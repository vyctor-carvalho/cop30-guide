import { Request, Response } from "express";
import { validate as validateUUID } from "uuid";
import { plainToInstance } from "class-transformer";

import { PresenceDTO } from "../DTO/PresenceDTO";
import { PresenceFKs } from "../DTO/wrappersDTO/PresenceFKs"
import { PresenceService } from "../service/PresenceService";

export class PresenceController {

    private presenceService = new PresenceService();

    async createPresence(req: Request, res: Response): Promise<Response> {
        try {
            const presenceDTO = plainToInstance(PresenceDTO, req.body);

            const presence = await this.presenceService.createPResence(presenceDTO);

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
            return res.status(200).json({
                message: "Presences is empty" 
            });
        }

        return res.status(200).json(presences);
    }

    async getPresenceByFKs(req: Request, res: Response): Promise<Response> {
        const presenceFKs = plainToInstance(PresenceFKs, req.body);

        const presence = await this.presenceService.findUPresenceByFKs(presenceFKs.userId, presenceFKs.eventId);

        if (!presence) {
            return res.status(404).json({ 
                message: `Presence with this FKs not found` 
            });
        }

        return res.status(200).json(presence);
    }

    async getPresenceByEvent(req: Request, res: Response): Promise<Response> {

        const event_id = req.params.id;

        if (!validateUUID(event_id)) {
            return res.status(400).json({
                message: "Invalid UUID format"
            })
        }

        const presence = await this.presenceService.findPresenceByEvent(event_id);

        if (presence == null) {
            return res.status(404).json({
                message: `Event whith id ${event_id} not found`
            })
        }

        return res.status(200).json(
        presence.map(p => ({
            eventTitle: p.event.title,
            visitorName: p.visitor.name,
            presence: p.present
        })));
    }

    async putPresence(req: Request, res: Response): Promise<Response> {
        try {

            const presenceDTO = plainToInstance(PresenceDTO, req.body);

            const presence = await this.presenceService.putPresence(presenceDTO);

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
            const presenceFKs = plainToInstance(PresenceFKs, req.body);

            await this.presenceService.deletePresence(presenceFKs.userId, presenceFKs.eventId);

            return res.status(200).json({ 
                message: "Presence deleted"
            });

        } catch (err: any) {
            return res.status(err.status || 500).json({
                message: err.message,
                error: err
            });
        }
    }
}
