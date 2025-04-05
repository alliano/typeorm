import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitiy";

@Entity({ name: "roles" })
export class Role {

    @PrimaryGeneratedColumn({type: "int", name: "id"})
    public id: number;

    @Column({type: "varchar", name: "name", length: 255})
    public name: string;

    @Column({type: "text", name: "description"})
    public description: string;

    @Column({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    public updatedAt: Date;

    @Column({type: "timestamp", name: "deleted_at", nullable: true})
    deletedAt: Date;

    @ManyToMany(() => User, (user) => user.roles)
    @JoinColumn({ name: "user_id" })
    public users: Array<User>;

}