import express from "express";
import { AppDataSource } from "./db_config/data-source"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page");
})

AppDataSource.initialize()
    .then(() => {
        console.log("Bando de dados funcinando")
    })
    .catch((error) => {
        console.log(`mensage: ${error.get.mensage}`)
    })

export default app;
