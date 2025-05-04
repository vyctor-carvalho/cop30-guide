import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { IsNotEmpty } from "class-validator"
import { UserLoginData } from "./wrappers/UserLoginData"
import { Presence } from "./Presence";
import { Event } from "./Event"
 

@Entity("user")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @IsNotEmpty()
    @Column({name: "name", type: "varchar", length: 50 })
    name!: string;

    @Column(() => UserLoginData, { prefix: false })
    userLoginData!: UserLoginData;

    @Column({ name: "role", type: "varchar", length: 8, default: "visitor" })
    role!: "admin" | "angel" | "visitor";

    @OneToMany(() => Event, event => event.angel)
    event?: Event[];

    @OneToMany(() => Presence, presence => presence.visitor)
    presences?: Presence[];

}