import { IsEmail, IsNotEmpty } from "class-validator"

export class UserLoginDataDTO {

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

}