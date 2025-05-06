import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { EventService } from "../service/EventService";
import { EventDTO } from "../DTO/EventDTO"

export class EventController {

    private eventService = new EventService();

    async createEvent(req: Request, res: Response): Promise<Response> {

        try {
            const eventDTO = plainToInstance(EventDTO, req.body);

            await this.eventService.createEvent(eventDTO)

            return res.status(201).json({
                mensage: "Event created",
                data: eventDTO
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

        if (event == null) {
            return res.status(404).json({
                mensage: `Event whith id ${id} not found`
            })
        }

        return res.status(200).json(event);

    }

    async putEvent(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id;

            const eventDTO = req.body;

            const event = await this.eventService.putEvent(id, eventDTO);

            console.log(event);
            console.log(typeof(event));
    
            if (typeof event === "string" ) {
                return res.status(404).json({
                    mensage: `${event}`
                })
            }

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

            const isDeleted = this.eventService.deleteEvent(id)

            if (!isDeleted) {
                return res.status(404).json({
                    mensage: `Event whith id ${id} not found`
                })
            }

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