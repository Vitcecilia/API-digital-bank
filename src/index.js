const express = require("express");
const roteador = require("./roteador")
const app = express();

app.use(express.json());
app.use(roteador)

const porta = 3333;

app.listen(porta, () => {
    console.log(`O servidor esta batendo na porta: ${porta}`)
}); 