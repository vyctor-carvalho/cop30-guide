import 'reflect-metadata';

import app from "./server";

const port = 3000

app.listen(port, () => {
    console.log(`Server rodadndo na porta ${port}, acesso http://localhost:3000/`);
});

