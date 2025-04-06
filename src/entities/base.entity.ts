import { Column, DeleteDateColumn } from "typeorm";

export abstract class BaseEntity {

    @Column({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    public createdAt: Date;

    @Column({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    public updatedAt: Date;
    
    @DeleteDateColumn({type: "timestamp", name: "deleted_at", nullable: true})
    public deletedAt: Date;
}