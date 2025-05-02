import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { IsEmpty } from "class-validator"
import { UserLoginData } from "./wrappers/UserLoginData"
import { Presence } from "./Presence";
import { Event } from "./Event"
 

@Entity("user")
export class User{

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @IsEmpty()
    @Column({name: "name", type: "varchar", length: 50 })
    name!: string;

    @Column(() => UserLoginData, { prefix: false })
    userLogindata!: UserLoginData;

    @IsEmpty()
    @Column({ name: "role", type: "varchar", length: 8 })
    role!: "admin" | "angel" | "visitor";

    @OneToMany(() => Event, event => event.angel)
    event?: Event[];

    @OneToMany(() => Presence, presence => presence.visitor)
    presences?: Presence[];

}