import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";

import { LocationDTO } from "./wrappersDTO/LocationDTO"

export class EventDTO {

    @IsNotEmpty()
    title!: string;

    @IsOptional()
    description!: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LocationDTO)
    location!: LocationDTO;

    @IsNotEmpty()
    @IsUUID()
    idAngel!: string;

    public postalCode() {
        return this.location.postalCode;
    }

    public numberHouse() {
        return this.location.numberHouse;
    }

    public complement() {
        return this.location.complement;
    }

}