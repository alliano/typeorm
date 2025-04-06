import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitiy";
import { BaseEntity } from "./base.entity";

@Entity({ name: "roles" })
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn({type: "int", name: "id"})
    public id: number;

    @Column({type: "varchar", name: "name", length: 255})
    public name: string;

    @Column({type: "text", name: "description"})
    public description: string;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinColumn({ name: "user_id" })
    public users: Array<User>;

}