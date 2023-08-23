const express = require("express");
const { listarContaBancaria, criarContaBancaria, atualizarUsuarioDaConta, deletarConta, saldoDaConta, extratoBancario } = require("./controladores/contas");
const { depositoBancario, saqueBancario, transferenciaBancaria } = require("./controladores/transacoes");

const rotas = express();

// contas listadas com verificação de senha
rotas.get("/contas", listarContaBancaria);
// nova conta bancaria
rotas.post("/contas", criarContaBancaria);
// atualizar os dados da conta 
rotas.put("/contas/:numeroId/usuario", atualizarUsuarioDaConta);
// excluir conta bancaria após passar nos requisitos
rotas.delete("/contas/:numeroId", deletarConta);
// fazer deposito na conta por meio de transferencia 
rotas.post("/transacoes/depositar", depositoBancario);
// fazer um saque da conta 
rotas.post("/transacoes/sacar", saqueBancario);
// transferencia de dinheiro de uma conta para outra
rotas.post("/transacoes/transferir", transferenciaBancaria);
// retornar o saldo disponivel na conta 
rotas.get("/contas/saldo", saldoDaConta);
// listar todas as transações da conta 
rotas.get("/contas/extrato", extratoBancario);

module.exports = rotas;
