import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';

import { UserDTO } from "../DTO/UserDTO"
import { UserService } from "../service/UserService"
import { threadId } from 'worker_threads';

export class UserController {

    private userService = new UserService();

    async createUser(req: Request, res: Response): Promise<Response> {
        
        try{
            const userDTO = plainToInstance(UserDTO, req.body)
            const user = await this.userService.createUser(userDTO);
            return res.status(201).json({
                mensage: "User created",
                data: userDTO
            })
        } catch ( errors: any ) {
            return res.status(errors.status || 500).json({
                mensage: errors.mensage,
                error: errors.error
            })
        }

    }

    async getUsers(req: Request, res: Response): Promise<Response> {

        const users = await this.userService.findAllUsers();

        if (users.length == 0) {
            return res.status(200).json({
                mensage: "Users is empty"
            })
        }

        return res.status(200).json(users);
    }

    async getUserById(req: Request, res: Response): Promise<Response> {

        const id = req.params.id;

        const user = await this.userService.getUserById(id);

        if (user == null) {
            return res.status(404).json({
                mensage: `User whith id ${id} not found`
            })
        }

        return res.status(200).json(user);
        
    }

    async putUser(req: Request, res: Response) {
        
        try {
            const id = req.params.id;

            const userDTO = plainToInstance(UserDTO, req.body);
    
            const user = await this.userService.putUser(id, userDTO);
    
            if (user == null) {
                return res.status(404).json({
                    mensage: `User whith id ${id} not found`
                })
            }
    
            return res.status(200).json({
                mensage: "User updated",
                data: userDTO
            })
            
        } catch ( errors: any ) {
            return res.status(errors.status || 500).json({
                mensage: errors.mensage,
                error: errors.error
            })
        }

    }

    async deleteUser(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id;

            const isDeleted = this.userService.deleteUser(id)
    
            if (!isDeleted) {
                return res.status(404).json({
                    mensage: `User whith id ${id} not found`
                })
            }
    
            return res.status(200).json({
                mensage: "User deleted"
            })

        } catch ( errors: any ) {
            return res.status(errors.status || 500).json({
                mensage: errors.mensage,
                error: errors.error
            })
        }

    }

}