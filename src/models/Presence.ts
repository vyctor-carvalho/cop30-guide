import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./User";
import { Event } from "./Event"
import { IsDateString, IsNotEmpty } from "class-validator";


@Entity("presence")
export class Presence {

    @PrimaryColumn("uuid", { name: "user_id" })
    userId!: string;
  
    @PrimaryColumn("uuid", { name: "event_id" })
    eventId!: string;
  
    @ManyToOne(() => User, user => user.presences)
    @JoinColumn({ name: "user_id" })
    visitor!: User;

    @ManyToOne(() => Event, event => event.presences)
    @JoinColumn({ name: "event_id" })
    event!: Event;

    @Column({ name: "present", default: false })
    present!: boolean;

    @Column({ 
        name: "date_present",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP" 
    })
    datePresent!: Date;

}