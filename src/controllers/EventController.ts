import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { EventService } from "../service/EventService";
import { EventDTO } from "../DTO/EventDTO"

export class EventController {

    private eventService = new EventService();

    async createEvent(req: Request, res: Response): Promise<Response> {

        try {
            const eventDTO = plainToInstance(EventDTO, req.body);

            const event = await this.eventService.createEvent(eventDTO);

            return res.status(201).json({
                mensage: "Event created",
                data: event
            })

        } catch (errors: any) {
            return res.status(errors.status || 500).json({
                mensage: errors.mensage,
                error: errors.error
            })
        }

    }

    async getEvents(req: Request, res: Response): Promise<Response> {
        const events = await this.eventService.findAllEvents();

        console.log(events)

        if (events.length == 0) {
            return res.status(200).json({
                mensage: "Events is empty"
            })
        }

        return res.status(200).json(events);
    }

    async getEventById(req: Request, res: Response): Promise<Response> {
        
        const id = req.params.id;

        const event = await this.eventService.findEventById(id);

        if (!event) {
            return res.status(404).json({
                mensage: `Event whith id ${id} not found`
            })
        }

        return res.status(200).json(event);

    }

    async putEvent(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id;

            const eventDTO = plainToInstance(EventDTO, req.body);

            const event = await this.eventService.putEvent(id, eventDTO);

            return res.status(200).json({
                mensage: "Event updated",
                data: eventDTO
            })

        } catch (errors: any) {
            return res.status(errors.status || 500).json({
                mensage: errors.mensage,
                error: errors.error
            })
        }

    }

    async deleteEvent(req: Request, res: Response): Promise<Response> {
        
        try {
            const id = req.params.id;

            await this.eventService.deleteEvent(id)

            return res.status(200).json({
                mensage: "Event deleted"
            })

        } catch (errors: any) {
            return res.status(errors.status || 500).json({
                mensage: errors.mensage,
                error: errors.error
            })
        }

    }


}