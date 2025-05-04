import { Column } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator"

export class UserLoginData {

    @IsNotEmpty()
    @IsEmail()
    @Column({name: "email", type: "varchar", length: 50 })
    email!: string;

    @IsNotEmpty()
    @Column({ name: "password", type: "varchar", length: 100 })
    password!: string;

}