import "reflect-metadata";
import { DataSource } from "typeorm";

import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../confg/ExpoEnv";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: false,
    entities: [__dirname + "/../models/*.ts"],
    migrations: [__dirname + "/../migrations/*.ts"],
    subscribers: [],
})
