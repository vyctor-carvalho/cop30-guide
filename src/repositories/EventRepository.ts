import { AppDataSource } from "../db_config/AppDataSource"
import { Event } from "../models/Event"

export const EventRepository = AppDataSource.getRepository(Event);