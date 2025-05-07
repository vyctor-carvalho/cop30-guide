import 'reflect-metadata';

import app from "./server";
import { userRouter } from "./rotes/UserRotes";
import { eventRoutes } from "./rotes/EventRoutes"
import { authRotes } from "./rotes/AuthRoutes"

const port = 3000

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use("/users", userRouter);

app.use("/events", eventRoutes);

app.use("/login", authRotes);

app.listen(port, () => {
    console.log(`Server rodadndo na porta ${port}, acesso http://localhost:3000/`);
});


