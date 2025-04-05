import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../entities/user.entitiy";
import { Role } from "../entities/role.entity";
import { Address } from "../entities/address.entity";


export const Datasource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: [Address, User, Role],
    migrations: [],
    subscribers: [],
})