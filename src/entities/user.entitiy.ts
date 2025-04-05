import "reflect-metadata";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Address } from "./address.entity";



@Entity({ name: "users" })
export class User {
    
    @PrimaryGeneratedColumn({type: "int", name: "id"})
    public id: number;

    @Column({type: "varchar", name: "name", length: 255})
    public name: string;

    @Column({type: "varchar", name: "email", length: 255, unique: true})
    public email: string;
    
    @Column({type: "varchar", name: "password", length: 255})
    public password: string;

    @ManyToMany(() => Role, (role) => role.users, {cascade: true, eager: true})
    @JoinTable({ name: "user_roles" , joinColumn: { name: "user_id" }, inverseJoinColumn: { name: "role_id" }})
    public roles: Array<Role>;

    @OneToMany(() => Address, (address) => address.user, {cascade: true, eager: true})
    public addresses: Array<Address>;

    @Column({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    public createdAt: Date;

    @Column({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    public updatedAt: Date;
    
    @Column({type: "timestamp", name: "deleted_at", nullable: true})
    public deletedAt: Date;

}