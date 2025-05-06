import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator";

import { LocationDTO } from "../DTO/LocationDTO"

export class EventDTO {

    @IsNotEmpty()
    title!: string;

    @IsOptional()
    description!: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LocationDTO)
    locationDTO!: LocationDTO;

    @IsNotEmpty()
    @IsUUID()
    idAngel!: string;

    public postalCode() {
        return this.locationDTO.postalCode;
    }

    public numberHouse() {
        return this.locationDTO.numberHouse;
    }

    public complement() {
        return this.locationDTO.complement;
    }

}