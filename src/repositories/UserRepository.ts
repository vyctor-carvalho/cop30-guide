import { AppDataSource } from "../db_config/AppDataSource"
import { User } from "../models/User"

export const UserRepository = AppDataSource.getRepository(User);