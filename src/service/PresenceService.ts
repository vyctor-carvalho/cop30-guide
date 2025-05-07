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

    async createPResence(presenceDTO: PresenceDTO): Promise<Presence | { errors: any[] } | string> {

        const errors = await validate(presenceDTO, { whitelist: true, forbidNonWhitelisted: true })

        if (errors.length > 0) {
            return { errors: [ ...errors ] }
        }

        const user = await this.userService.findUserById(presenceDTO.visitorId);

        const event = await this.eventService.findEventById(presenceDTO.eventId);

        if (user ==  null) return "User not fund";

        if (event == null) return "Event not found";

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

    async putPresence(id: string, presenceDTO: PresenceDTO): Promise<Presence | { errors: any[] } | string> {

        const presence = await this.presenceRepository.findOneBy({ id });

        if (presence == null) return "Presence not found";

        const error = await validate(presenceDTO, { whitelist: true, forbidNonWhitelisted: true });

        if (error.length < 0) {
            return { errors: [ ...error ] }
        }

        const user = await this.userService.findUserById(presenceDTO.visitorId);

        const event = await this.eventService.findEventById(presenceDTO.eventId);

        if (user ==  null) return "User not fund";

        if (event == null) return "Event not found";

        presence.present = presenceDTO.present;
        presence.visitor = user;
        presence.event = event;

        return presence;
    }

    async deletePresence(id: string): Promise<boolean> {

        const presence = await this.presenceRepository.findOneBy({ id });

        if (presence == null) return false;

        await this.presenceRepository.delete(presence);

        return true;

    }

    async findPresenceByEvent(event_id: string): Promise<Presence | Presence[] | null> {

        const event = await this.eventService.findEventById(event_id);

        if (event == null) return null;

        return await this.presenceRepository.findOneBy({ event });

    }

}