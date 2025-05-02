import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Event } from "./Event"


@Entity("presence")
export class Presence {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, user => user.presences)
    @JoinColumn({ name: "user_id" })
    visitor!: User;

    @ManyToOne(() => Event, event => event.presences)
    @JoinColumn({ name: "event_id" })
    event!: Event;

    @Column({ name: "present", default: false })
    present!: boolean;

    @Column({ name: "date_present", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    datePresent!: Date;


}