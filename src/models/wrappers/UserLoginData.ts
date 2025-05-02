import { Column } from "typeorm";
import { IsEmail, IsEmpty } from "class-validator"

export class UserLoginData {

    @IsEmpty()
    @IsEmail()
    @Column({name: "email", type: "varchar", length: 50 })
    email?: string;

    @IsEmpty()
    @Column({ name: "password", type: "varchar", length: 100 })
    password?: string;

}