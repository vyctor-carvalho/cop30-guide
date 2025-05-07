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
                mensage: "Invali json"
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

    async putUser(id: string, userDTO: UserDTO): Promise<User | { errors: any[] } | null > {

        const error = await validate(userDTO, { whitelist: true, forbidNonWhitelisted: true });
        const nestedErrors = await validate(userDTO.userLoginDataDTO);
        
        if (error.length > 0 || nestedErrors.length > 0) {
            throw { 
                status: 400,
                mensage: "Invali json"
            }
        }

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw { 
                status: 404,
                mensage: `User whith id ${id} not found` 
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
                mensage: `User whith id ${id} not found` 
            }
        };

        await this.userRepository.delete(id)

    }

}