import { Request, Response } from 'express';
import { validate as validateUUID } from "uuid";
import { plainToInstance } from 'class-transformer';

import { UserDTO } from "../DTO/UserDTO";
import { UserService } from "../service/UserService";

export class UserController {

    private userService = new UserService();

    async createUser(req: Request, res: Response): Promise<Response> {
        
        try{
            const userDTO = plainToInstance(UserDTO, req.body)

            const newUser = await this.userService.createUser(userDTO);
            
            return res.status(201).json({
                message: "User created",
                data: newUser
            })
        
        } catch ( errors: any ) {
            return res.status(errors.status || 500).json({
                message: errors.message,
                error: errors.error
            })
        }

    }

    async getUsers(req: Request, res: Response): Promise<Response> {

        const users = await this.userService.findAllUsers();

        if (users.length == 0) {
            return res.status(200).json({
                message: "Users is empty"
            })
        }

        return res.status(200).json(users);
    }

    async getUserById(req: Request, res: Response): Promise<Response> {

        const id = req.params.id;

        if (!validateUUID(id)) {
            return res.status(400).json({
                message: "Invalid UUID format"
            })
        }

        const user = await this.userService.findUserById(id);

        if (user == null) {
            return res.status(404).json({
                message: `User whith id ${id} not found`
            })
        }

        return res.status(200).json(user);
        
    }

    async getVisitorByAngel(req: Request, res: Response) {
        const angelId = req.params.id;
    
        if (!validateUUID(angelId)) {
            return res.status(400).json({
                message: "Invalid UUID format from angelId"
            });
        }
    
        const angel = await this.userService.findUserById(angelId);
    
        if (!angel) {
            return res.status(404).json({
                message: `Angel with id ${angelId} not found`
            });
        }
    
        if (angel.role != "angel" && angel.role != "admin") {
            return res.status(404).json({
                message: `Is not a angel`
            });
        }

        const visitors = await this.userService.findVisitorByAngel(angelId);
    
        if (!visitors || visitors.length === 0) {
            return res.status(404).json({
                message: `Angel without visitors`
            });
        }
    
        return res.status(200).json({
            angel: angel.name,
            visitors: visitors.map(v => v.name)
        });
    }
    

    async assignVisitor(req: Request, res: Response): Promise<Response> {

        const { angelId, visitorId } = req.body;

        console.log("Chegou aqui!")

        if (!validateUUID(angelId)) {
            return res.status(400).json({
                message: "Invalid UUID format from angelId"
            })
        }

        if (!validateUUID(visitorId)) {
            res.status(400).json({
                message: "Invalid UUID format from visitorId"
            })
        }

        try {
            const updateVisitor = await this.userService.assignVisitorToAngel(angelId, visitorId);

            return res.status(200).json({
                message: "Visitor assigned",
                data: updateVisitor
            })

        } catch (errors: any) {
            return res.status(errors.status || 500).json({
                message: errors.message,
                error: errors.error
            })
        }

    }

    async putUser(req: Request, res: Response): Promise<Response> {
        
        try {
            const id = req.params.id;

            if (!validateUUID(id)) {
                return res.status(400).json({
                    message: "Invalid UUID format"
                })
            }

            const userDTO = plainToInstance(UserDTO, req.body);
    
            const user = await this.userService.putUser(id, userDTO);
    
            if (!user) {
                return res.status(404).json({
                    message: `User whith id ${id} not found`
                })
            }
    
            return res.status(200).json({
                message: "User updated",
                data: userDTO
            })
            
        } catch ( errors: any ) {
            return res.status(errors.status || 500).json({
                message: errors.message,
                error: errors.error
            })
        }

    }

    async deleteUser(req: Request, res: Response): Promise<Response> {

        try {
            const id = req.params.id;

            if (!validateUUID(id)) {
                return res.status(400).json({
                    message: "Invalid UUID format"
                })
            }

            await this.userService.deleteUser(id)
    
            return res.status(200).json({
                message: "User deleted"
            })

        } catch ( errors: any ) {
            return res.status(errors.status || 500).json({
                message: errors.message,
                error: errors.error
            })
        }

    }

}