import 'reflect-metadata';

import app from "./server";
import { userRouter } from "./rotes/UserRotes"

const port = 3000

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Server rodadndo na porta ${port}, acesso http://localhost:3000/`);
});


