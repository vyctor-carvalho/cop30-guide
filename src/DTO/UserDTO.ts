import { IsEnum, IsNotEmpty, ValidateNested,  } from "class-validator"
import { Type } from "class-transformer"

import { UserLoginDataDTO } from "./wrappersDTO/UserLoginDataDTO"

enum UserRole {
    ANGEL = 'angel',
    VISITOR = 'visitor',
}
  

export class UserDTO {

    @IsNotEmpty()
    name!: string;

    @ValidateNested()
    @Type(() => UserLoginDataDTO)
    userLoginDataDTO!: UserLoginDataDTO;

    @IsEnum(UserRole)
    role!: "angel" | "visitor";

    public email() {
        return this.userLoginDataDTO.email;
    }

    public password() {
        return this.userLoginDataDTO.password;
    }

}