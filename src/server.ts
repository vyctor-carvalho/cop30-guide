import express from "express";
import dotenv from 'dotenv';

import { AppDataSource } from "./db_config/AppDataSource"


dotenv.config();

const app = express();


export const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Bando de dados funcinando")
    })
    .catch((error) => {
        console.log(`mensage: ${error.get.mensage}`)
    })

export default app;
