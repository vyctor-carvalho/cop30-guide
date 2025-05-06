import { validate } from "class-validator";

import { EventRepository } from "../repositories/EventRepository";
import { Event } from "../models/Event"
import { EventDTO } from "../DTO/EventDTO";
import { UserService } from "./UserService";

export class EventService {

    private eventRepository = EventRepository;

    private userService = new UserService();

    async createEvent (eventDTO: EventDTO): Promise<Event | { errors: any[] } | null> {
        
        const error = await validate(eventDTO, { whitelist: true, forbidNonWhitelisted: true })
        const nastedErrors = await validate(eventDTO.locationDTO)

        if (error.length > 0 || nastedErrors.length > 0) {
            return { errors: [ ...error, ...nastedErrors ] }
        }
        
        const angel = await this.userService.findUserById(eventDTO.idAngel)

        if (angel == null) {
            return null
        }

        const newEvent = this.eventRepository.create({
            title: eventDTO.title,
            description: eventDTO.description,
            angel: angel,
            location: {
                postalCode: eventDTO.postalCode(),
                numberHouse: eventDTO.numberHouse(),
                complement: eventDTO.complement()
            }
        });

        await this.eventRepository.save(newEvent);

        return newEvent;

    }

    async findAllEvents(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async findEventById(id: string): Promise<Event | null> {
        const event = await this.eventRepository.findOneBy({ id });
        return event
    }

    async putEvent(id: string, eventDTO: EventDTO): Promise<Event | { errors: any[] } | string> {

        const event = await this.eventRepository.findOneBy({ id })
        if (!event) return `Event whith id ${id} not found`;

        const error = await validate(eventDTO, { whitelist: true, forbidNonWhitelisted: true });
        const nastedErrors = await validate(eventDTO.locationDTO);

        const angel = await this.userService.findUserById(eventDTO.idAngel);

        if (angel == null) return `User whith id ${eventDTO.idAngel} not found`;

        if (error.length > 0 || nastedErrors.length > 0) {
            return { errors: [ ...error, ...nastedErrors ] }
        }

        event.title = eventDTO.title;
        event.description = eventDTO.description;
        event.angel = angel;
        event.location.complement = eventDTO.complement();
        event.location.numberHouse = eventDTO.numberHouse();
        event.location.postalCode = eventDTO.postalCode();

        return this.eventRepository.save(event);

    }
    
    async deleteEvent(id: string): Promise<boolean> {

        const event = await this.eventRepository.findOneBy({ id })

        if (!event) return false;

        await this.eventRepository.delete(event);

        return true;

    }

}