import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { IsEmpty } from "class-validator"
import { Location } from "./wrappers/Location";
import { Presence } from "./Presence";
import { User } from "./User";

@Entity("event")
export class Event {

    @PrimaryGeneratedColumn("uuid")
    private id!: string;

    @IsEmpty()
    @Column({ name: "title", type: "varchar", length: 30 })
    title?: string;

    @Column({ name: "description", type: "varchar", length: 100, nullable: true })
    description?: string;

    @Column(() => Location, { prefix: false })
    location?: Location;

    @ManyToOne(() => User, user => user.event)
    @JoinColumn({ name: "angel_id" })
    angel?: User;

    @OneToMany(() => Presence, presence => presence.event)
    presences?: Presence[];

}