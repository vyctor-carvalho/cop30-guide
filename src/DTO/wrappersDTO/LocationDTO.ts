import { IsNotEmpty, IsOptional, IsPostalCode } from "class-validator";


export class LocationDTO {

    @IsNotEmpty()
    @IsPostalCode("BR")
    postalCode!: string;

    @IsNotEmpty()
    numberHouse!: string;

    @IsOptional()
    complement?: string;
    
}