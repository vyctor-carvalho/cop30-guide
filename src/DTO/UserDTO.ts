import { IsNotEmpty, ValidateNested,  } from "class-validator"
import { Type } from "class-transformer"

import { UserLoginDataDTO } from "./wrappersDTO/UserLoginDataDTO"

export class UserDTO {

    @IsNotEmpty()
    name!: string;

    @ValidateNested()
    @Type(() => UserLoginDataDTO)
    userLoginDataDTO!: UserLoginDataDTO;

    role!: "angel" | "visitor";

    public email() {
        return this.userLoginDataDTO.email;
    }

    public password() {
        return this.userLoginDataDTO.password;
    }

}