import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db_config/angel_visitor.sqlite",
    synchronize: false,
    logging: false,
    entities: [__dirname + "/../models/*.ts"],
    migrations: [__dirname + "/../migrations/*.ts"],
    subscribers: [],
})
