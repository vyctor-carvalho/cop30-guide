import { validate } from "class-validator"

import { Presence } from "models/Presence"
import { PresenceRepository } from "../repositories/PresenceRepository"
import { PresenceDTO } from "../DTO/PresenceDTO"
import { UserService } from "../service/UserService"
import { EventService } from "../service/EventService"

export class PresenceService {

    private presenceRepository = PresenceRepository;

    private userService = new UserService();

    private eventService = new EventService();

    async createPResence(presenceDTO: PresenceDTO): Promise<Presence | { errors: any[] }> {

        const errors = await validate(presenceDTO, { whitelist: true, forbidNonWhitelisted: true })

        if (errors.length > 0) {
            throw { 
                status: 400,
                mensage: `Invalid json` 
            }
        }

        const user = await this.userService.findUserById(presenceDTO.visitorId);

        const event = await this.eventService.findEventById(presenceDTO.eventId);

        if (!user) {
            throw { 
                status: 404,
                mensage: `User whith id ${presenceDTO.visitorId} not found` 
            }
        };

        if (!event) {
            throw { 
                status: 404,
                mensage: `Event whith id ${presenceDTO.eventId} not found`
            }
        }

        const newPresence = this.presenceRepository.create({
            visitor: user,
            event: event,
            present: presenceDTO.present,
            datePresent: new Date()

        });

        await this.presenceRepository.save(newPresence);

        return newPresence;

    }

    async findAllPresences(): Promise<Presence[]> {
        return this.presenceRepository.find();
    }

    async findUPresenceById(id: string): Promise<Presence | null> {
        const presence = await this.presenceRepository.findOneBy({ id });
        return presence;
    } 

    async findPresenceByEvent(event_id: string): Promise<Presence | Presence[] | null> {

        const event = await this.eventService.findEventById(event_id);

        if (!event) {
            throw { 
                status: 404,
                mensage: `Event whith id ${event_id} not found`
            }
        };

        return await this.presenceRepository.findOneBy({ event });

    }

    async putPresence(id: string, presenceDTO: PresenceDTO): Promise<Presence | { errors: any[] }> {

        const error = await validate(presenceDTO, { whitelist: true, forbidNonWhitelisted: true });

        if (error.length > 0) {
            throw { 
                status: 400,
                mensage: `Invalid json` 
            }
        }

        const user = await this.userService.findUserById(presenceDTO.visitorId);

        const event = await this.eventService.findEventById(presenceDTO.eventId);

        const presence = await this.presenceRepository.findOneBy({ id });

        if (!presence) {
            throw { 
                status: 404,
                mensage: `Presence whith id ${id} not found`
            }
        };

        if (!user) {
            throw { 
                status: 404,
                mensage: `User whith id ${presenceDTO.visitorId} not found`
            }
        };

        if (!event) {
            throw { 
                status: 404,
                mensage: `Event whith id ${presenceDTO.eventId} not found`
            }
        };

        presence.present = presenceDTO.present;
        presence.visitor = user;
        presence.event = event;

        return presence;
    }

    async deletePresence(id: string) {

        const presence = await this.presenceRepository.findOneBy({ id });

        if (!presence) {
            throw { 
                status: 404,
                mensage: `Presence whith id ${id} not found`
            }
        };

        await this.presenceRepository.delete(id);

    }

}