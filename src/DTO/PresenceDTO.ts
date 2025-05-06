import { IsNotEmpty, IsUUID  } from "class-validator"

import { User } from "../models/User";
import { Event } from "../models/Event"


export class PresenceDTO {

    @IsNotEmpty()
    @IsUUID()
    visitorId!: string;

    @IsNotEmpty()
    @IsUUID()
    eventId!: string;

    @IsNotEmpty()
    present!: boolean;
    
}