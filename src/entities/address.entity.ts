import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitiy";
import { BaseEntity } from "./base.entity";

@Entity({ name: "addresses" })
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    public id: number;
    
    @Column({ type: "varchar", name: "street", length: 255 })
    public street: string;

    @Column({ type: "varchar", name: "city", length: 255 })
    public city: string;

    @Column({ type: "varchar", name: "state", length: 255 })
    public state: string;

    @Column({ type: "varchar", name: "country", length: 255 })
    public country: string;

    @Column({ type: "varchar", name: "zip_code", length: 10 })
    public zipCode: string;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    public user: User;

}