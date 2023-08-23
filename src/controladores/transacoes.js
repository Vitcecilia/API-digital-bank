const bancodedados = require("../bancodedados");

const depositoBancario = (request, response) => {
    const { numeroConta, valor } = request.body;

    if (!numeroConta || !valor) {
        return response.status(400).json({ mensagem: `O número da conta e o valor são obrigatórios!` })
    }
    let contaExistente = bancodedados.contas.find((conta) => {
        return conta.numero === numeroConta
    })
    if (!contaExistente) {
        return response.status(404).json({ mensagem: `A conta bancaria precisa ser válida ` })
    }
    if (valor <= 0) {
        return response.status(400).json({ mensagem: "o valor é inválido" })
    }
    contaExistente.saldo += valor;

    const saldoDisponivel = {
        data: new Date(),
        numeroConta: numeroConta,
        saldo: contaExistente.saldo
    }
    bancodedados.depositos.push(saldoDisponivel)
    return response.status(200).json(saldoDisponivel)
}

const saqueBancario = (request, response) => {
    const { numeroConta, valor, senha } = request.body;

    if (!numeroConta || !valor || !senha) {
        return response.status(400).json({ mensagem: `O número da conta, valor e senha são obrigatórios!` })
    }
    let contaExistente = bancodedados.contas.find((conta) => {
        return conta.numero === numeroConta
    })
    if (!contaExistente) {
        return response.status(404).json({ mensagem: `A conta bancária não encontrada` })
    }
    if (contaExistente.usuario.senha !== senha) {
        return response.status(401).json({ mensagem: `A senha  é invalida!` })
    }
    if (valor <= 0) {
        return response.status(400).json({ mensagem: `O valor não pode ser menor que zero!` })
    }

    contaExistente.saldo -= valor;
  
    const saqueAtualizado = {
        data: new Date(),
        numeroConta: numeroConta,
        saldo: contaExistente.saldo
    }
    bancodedados.saques.push(saqueAtualizado)
    return response.status(200).json(saqueAtualizado);
}

const transferenciaBancaria = (request, response) => {
    //! Todas as validações são necessarias 
    const { numeroContaOrigem, numeroContaDest, valor, senha } = request.body;

    if (!numeroContaOrigem || !numeroContaDest || !valor || !senha) {
        return response.status(400).json({ mensagem: `Todos os requisitos são obrigatórios!` })
    }
    let contaExistente = bancodedados.contas.find((conta) => {
        return conta.numero === numeroContaOrigem
    });
    if (!contaExistente) {
        return response.status(404).json({ mensagem: `A conta de origem não foi encontrada` })
    }
    let contaDest = bancodedados.contas.find((conta) => {
        return conta.numero === numeroContaDest
    })
    if(!contaDest){
        return response.status(404).json({ mensagem: `A conta de destino não foi encontrada` })
    }
    if (contaExistente.usuario.senha !== senha) {
        return response.status(401).json({ mensagem: `A senha precisa ser válida` })
    }
    if (contaExistente.saldo <= 0) {
        return response.status(400).json({ mensagem: `Saldo insuficiente!` })
    }
    contaExistente.saldo -= valor
    contaDest.saldo += valor

    const transfRealizada = {
        data: new Date(),
        numeroContaOrigem,
        numeroContaDest,
        saldo: contaExistente.saldo
    }
    bancodedados.transferencias.push(transfRealizada)
    return response.status(200).json(transfRealizada)
}

module.exports = {
    depositoBancario,
    saqueBancario,
    transferenciaBancaria
}