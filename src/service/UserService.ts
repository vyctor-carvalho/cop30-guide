import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { hash } from "bcrypt";

import { UserRepository } from "../repositories/UserRepository"
import { UserDTO } from "../DTO/UserDTO"
import { User } from '../models/User';
import { UserLoginData } from '../models/wrappers/UserLoginData';


const saltRounds = 10;

export class UserService {

    private userRepository = UserRepository;
    
    async createUser(userDTO: UserDTO): Promise<User | { errors: any[] }> {
        
        const errors = await validate(userDTO, { whitelist: true, forbidNonWhitelisted: true });
        const nestedErrors = await validate(userDTO.userLoginDataDTO);

        if (errors.length > 0 || nestedErrors.length > 0) {
            return { errors: [ ...errors, ...nestedErrors] }
        }

        const newUser = plainToInstance(User, {
            name: userDTO.name,
            role: userDTO.role,
            useeLoginData: plainToInstance(UserLoginData, {
                email: userDTO.userLoginDataDTO.email,
                password: await hash(userDTO.userLoginDataDTO.password!, saltRounds)
            })
        })

        return this.userRepository.create(newUser)

    }

    async findAllUsers() {
        return this.userRepository.find();
    }

    async getUserById(id: string): Promise<User | null>  {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) return null;
        
        return user;
    }

    async putUser(id: string, userDTO: UserDTO): Promise<User | { errors: any[] } | null > {

        const user = await this.userRepository.findOneBy({ id });

        if (!user) return null;

        const error = await validate(userDTO, { whitelist: true, forbidNonWhitelisted: true });
        const nestedErrors = await validate(userDTO.userLoginDataDTO);
        
        if (error.length > 0 || nestedErrors.length > 0) {
            return { errors: [ ...error, ...nestedErrors ] }
        }

        user.name = userDTO.name;
        user.role = userDTO.role;
        user.userLoginData.email = userDTO.userLoginDataDTO.email;
        user.userLoginData.password = await hash(userDTO.userLoginDataDTO.password!, saltRounds)

        return this.userRepository.save(user);

    }

    async deleteUser(id: string): Promise<boolean> {

        const user = await this.userRepository.findOneBy({ id })

        if (!user) return false;

        this.userRepository.delete(user)

        return true;

    }

}