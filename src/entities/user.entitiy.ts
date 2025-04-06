import "reflect-metadata";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Address } from "./address.entity";
import { BaseEntity } from "./base.entity";



@Entity({ name: "users" })
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    public id: number;

    @Column({type: "varchar", name: "name", length: 255})
    public name: string;

    @Column({type: "varchar", name: "email", length: 255, unique: true})
    public email: string;
    
    @Column({type: "varchar", name: "password", length: 255})
    public password: string;

    @ManyToMany(() => Role, (role) => role.users, { eager: true})
    @JoinTable({ name: "user_roles" , joinColumn: { name: "user_id" }, inverseJoinColumn: { name: "role_id" }})
    public roles: Array<Role>;

    @OneToMany(() => Address, (address) => address.user, {cascade: true, eager: true})
    public addresses: Array<Address>;

}