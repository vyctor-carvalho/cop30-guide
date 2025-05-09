import { IsNotEmpty, IsUUID } from "class-validator";

export class PresenceFKs{

    @IsNotEmpty()
    @IsUUID()
    userId!: string;
    
    @IsNotEmpty()
    @IsUUID()
    eventId!: string
}