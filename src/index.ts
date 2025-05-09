import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from "cors"

import app from "./server";
import { SYSTEM_API_PORT } from "./confg/ExpoEnv"
import { userRouter } from "./rotes/UserRotes";
import { eventRoutes } from "./rotes/EventRoutes";
import { authRotes } from "./rotes/AuthRoutes";
import { presenceRouter } from "./rotes/PresenceRoutes"
import { errorsHandler } from './errors/ErrorTratament';

const port = SYSTEM_API_PORT;

app.listen(port, () => {
    console.log(`Server rodadndo na porta ${port}, acesso http://localhost:${port}/`);
});

app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use("/users", userRouter);

app.use("/events", eventRoutes);

app.use("/presence", presenceRouter);

app.use("/login", authRotes);

app.use(errorsHandler);



