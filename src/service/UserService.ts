import { validate } from 'class-validator';
import { hash } from "bcrypt";

import { UserRepository } from "../repositories/UserRepository"
import { UserDTO } from "../DTO/UserDTO"
import { User } from '../models/User';


const saltRounds = 10;

export class UserService {

    private userRepository = UserRepository;
    
    async createUser(userDTO: UserDTO): Promise<User | { errors: any[] }> {
        
        const errors = await validate(userDTO, { whitelist: true, forbidNonWhitelisted: true });
        const nestedErrors = await validate(userDTO.userLoginDataDTO);

        if (errors.length > 0 || nestedErrors.length > 0) {
            throw { 
                status: 400,
                message: "Invali json"
            }
        }

        const newUser = this.userRepository.create({
            name: userDTO.name,
            role: userDTO.role,
            userLoginData: {
                email: userDTO.email(),
                password: await hash(userDTO.password(), saltRounds)
            }
        })

        await this.userRepository.save(newUser);

        return newUser;

    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id: string): Promise<User | null>  {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({
            userLoginData: {
                email: email
            }
        })
    }

    async findVisitorByAngel(angelId: string): Promise<User[] | null> {
        return await this.userRepository.find({
            where: { 
                angel: { id: angelId },
                role: "visitor" 
            },
            relations: ["angel"]
        })
    }

    async putUser(id: string, userDTO: UserDTO): Promise<User | { errors: any[] } | null > {

        const error = await validate(userDTO, { whitelist: true, forbidNonWhitelisted: true });
        const nestedErrors = await validate(userDTO.userLoginDataDTO);
        
        if (error.length > 0 || nestedErrors.length > 0) {
            throw { 
                status: 400,
                message: "Invali json"
            }
        }

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw { 
                status: 404,
                message: `User whith id ${id} not found` 
            }
        };

        user.name = userDTO.name;
        user.role = userDTO.role;
        user.userLoginData.email = userDTO.email();
        user.userLoginData.password = await hash(userDTO.password(), saltRounds)

        return this.userRepository.save(user);

    }

    async deleteUser(id: string) {

        const user = await this.userRepository.findOneBy({ id })

        if (user == null) {
            throw { 
                status: 404,
                message: `User whith id ${id} not found` 
            }
        };

        await this.userRepository.delete(id)

    }

    async assignVisitorToAngel(angelId: string, visitorId: string): Promise<User | { errors: any[] }> {
        
        const angel = await this.userRepository.findOneBy({ id: angelId });

        if (!angel || angel.role !== "angel") {
            throw {
                status: 404,
                message: "Angel not found or invalid role"
            }
        }

        const visitor = await this.userRepository.findOneBy({ id: visitorId });

        if (!visitor || visitor.role !== "visitor") {
            throw {
                status: 404,
                message: "Visitor not found or invalid role"
            }
        }

        const visitorCount = await this.userRepository.count({
            where: {
                angel: { id: angelId },
                role: "visitor"
            }
        })

        if (visitorCount >= 3) {
            throw {
                status: 400,
                message: "Angel already had 3 visitors"
            }
        }

        visitor.angel = angel;

        return await this.userRepository.save(visitor);

    }

}