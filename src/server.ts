import express from "express";

import { AppDataSource } from "./db_config/AppDataSource"

const app = express();

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Bando de dados funcinando")
    })
    .catch((error) => {
        console.log(`mensage: ${error.get.mensage}`)
    })

export default app;
