import { Column, Entity } from "typeorm";
import { IsNotEmpty, IsPostalCode } from "class-validator"

@Entity()
export class Location {

    @IsNotEmpty()
    @IsPostalCode("BR")
    @Column({ name: "postalCode", type: "varchar", length: 9 })
    postalCode!: string;

    @IsNotEmpty()
    @Column({ name: "numberHouse", type: "varchar", length: 8 })
    numberHouse!: string;

    @Column({name: "complement", type: "varchar", length: 50, nullable: true })
    complement?: string;

}

