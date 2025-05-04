import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

import { LocationDTO } from "../DTO/LocationDTO"

export class EventDTO {

    id!: string;

    @IsNotEmpty()
    title!: string;

    @IsOptional()
    description!: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LocationDTO)
    locationDTO!: LocationDTO;

    @IsNotEmpty()
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