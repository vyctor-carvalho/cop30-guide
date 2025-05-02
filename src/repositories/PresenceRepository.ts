import { AppDataSource } from "../db_config/AppDataSource"
import { Presence } from "../models/Presence"

export const PresenceRepository = AppDataSource.getRepository(Presence);