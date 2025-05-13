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
                message: `Invalid json` 
            }
        }

        const user = await this.userService.findUserById(presenceDTO.visitorId);

        const event = await this.eventService.findEventById(presenceDTO.eventId);

        if (!user) {
            throw { 
                status: 404,
                message: `User whith id ${presenceDTO.visitorId} not found` 
            }
        };

        if (!event) {
            throw { 
                status: 404,
                message: `Event whith id ${presenceDTO.eventId} not found`
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

    async findUPresenceByFKs(userId: string, eventId: string): Promise<Presence | null> {
        const presence = await this.presenceRepository.findOne({ 
            where: {
                visitor: {id: userId},
                event: {id: eventId}
            },
            relations: ["visitor", "event"]
        });
        return presence;
    } 

    async findPresenceByEvent(event_id: string): Promise<Presence[] | null> {

        const event = await this.eventService.findEventById(event_id);

        if (!event) {
            throw { 
                status: 404,
                message: `Event whith id ${event_id} not found`
            }
        };

        return await this.presenceRepository.find({ 
            where: { event },
            relations: ["event", "visitor"]
         });

    }

    async putPresence(presenceDTO: PresenceDTO): Promise<Presence | { errors: any[] }> {

        const error = await validate(presenceDTO, { whitelist: true, forbidNonWhitelisted: true });

        if (error.length > 0) {
            throw { 
                status: 400,
                message: `Invalid json` 
            }
        }

        const user = await this.userService.findUserById(presenceDTO.visitorId);

        if (!user) {
            throw { 
                status: 404,
                message: `User whith id ${presenceDTO.visitorId} not found`
            }
        };

        const event = await this.eventService.findEventById(presenceDTO.eventId);

        if (!event) {
            throw { 
                status: 404,
                message: `Event whith id ${presenceDTO.eventId} not found`
            }
        };

        const userId = user.id;
        const eventId = event.id;

        const presence = await this.presenceRepository.findOneBy({
            userId,
            eventId
        });

        if (!presence) {
            throw { 
                status: 404,
                message: `Presence not found or not exites`
            }
        }

        presence.present = presenceDTO.present;
        presence.datePresent = new Date();

        return await this.presenceRepository.save(presence);
    }

    async deletePresence(userId: string, eventId: string) {

        const presence = await this.presenceRepository.findOneBy({ 
            userId,
            eventId
        });

        console.log(presence)

        if (!presence) {
            throw { 
                status: 404,
                message: `Presence not found ou not existe`
            }
        };

        await this.presenceRepository.delete(presence);
    }

}