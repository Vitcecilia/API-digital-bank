let bancodedados = require("../bancodedados");
let numero = 1;

const listarContaBancaria = (request, response) => {
    const { senha_banco } = request.query;

    if (!senha_banco) {
        return response.status(401).json({ mensagem: `a senha não foi informada` })
    }

    if (senha_banco !== bancodedados.banco.senha) {
        return response.status(401).json({ menssagem: `A senha do banco informada é inválida!` });
    }

    return response.status(200).json(bancodedados.contas)
}

const criarContaBancaria = (request, response) => {
    const { nome, cpf, dataNasc, telefone, email, senha } = request.body;

    if (!nome || !cpf || !dataNasc || !telefone || !email || !senha) {
        return response.status(400).json({ mensagem: `Todos os requisitos são obrigatórios` });
    }
    const contaExistente = bancodedados.contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })
    if (contaExistente) {
        return response.status(400).json({ mensagem: `Já existe uma conta com o cpf informado!` });
    };
    const emailExistente = bancodedados.contas.find((conta) => {
        return conta.usuario.email === email
    })
    if (emailExistente) {
        return response.status(400).json({ mensagem: `Já existe uma conta com o email informado!` });
    };

    const novaConta = {
        numero: numero.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            dataNasc,
            telefone,
            email,
            senha
        }
    }
    numero++
    bancodedados.contas.push(novaConta)

    return response.status(201).json(novaConta);

}

const atualizarUsuarioDaConta = (request, response) => {
    //! na url será descrito numeroId que significa numero da conta 
    const { numeroId } = request.params;
    const { nome, cpf, dataNasc, telefone, email, senha } = request.body;

    if (!nome || !cpf || !dataNasc || !telefone || !email || !senha) {
        return response.status(400).json({ mensagem: `Todos os requisitos são obrigatórios` });
    }
    const contaExistente = bancodedados.contas.find((conta) => {
        return conta.numero === numeroId
    })
    if (!contaExistente) {
        return response.status(404).json({ mensagem: `O numero da conta não existe` })
    }
    if (cpf !== contaExistente.cpf) {
        const cpfvalido = bancodedados.contas.find((conta) => {
            return conta.cpf === cpf
        })
        if (cpfvalido) {
            return response.status(400).json({ mensagem: `Já existe uma conta com o cpf informado!` });
        }
    }
    if (email !== contaExistente.email) {
        const emailValido = bancodedados.contas.find((conta) => {
            return conta.email === email
        })
        if (emailValido) {
            return response.status(400).json({ mensagem: `Já existe uma conta com o email informado!` });
        }
    }

    //! fiz a atribuição dos valores de cada parametro a ser atualizado na conta bancaria.
    contaExistente.nome = nome;
    contaExistente.cpf = cpf;
    contaExistente.dataNasc = dataNasc;
    contaExistente.telefone = telefone;
    contaExistente.email = email;
    contaExistente.senha = senha;

    return response.status(204).json();
}

const deletarConta = (request, response) => {
    //! lembrar que o parametro é sempre oque é passado na rota não na url. 
    const { numeroId } = request.params;

    const numeroDaConta = bancodedados.contas.find((conta) => {
        return conta.numero === numeroId
    })
    if (!numeroDaConta) {
        return response.status(404).json({ mensagem: `O numero da conta não existe` });
    }
    if (!numeroDaConta.usuario.saldo <= 0) {
        return response.status(400).json({ mensagem: `A conta só pode ser removida se o saldo for zero!` })
    }
    //! cancelamento da conta bancária
    bancodedados.contas = bancodedados.contas.filter((conta) => {
        return conta.numero !== numeroId
    });
    return response.status(200).json();
}

const saldoDaConta = (request, response) => {
    const { numero, senha } = request.query;

    if (!numero || !senha) {
        return response.status(404).json({ mensagem: `O numero da conta e a senha são obrigatórios` })
    }
    let contaExistente = bancodedados.contas.find((conta) => {
        return conta.numero === numero
    })
    if (!contaExistente) {
        return response.status(404).json({ mensagem: `O numero da conta é inválido` })
    }
    if (contaExistente.usuario.senha !== senha){
        return response.status(401).json({ mensagem: `A senha precisa ser válida` })
    }
    const verSaldo = {
        saldo: contaExistente.saldo
    }
    return response.status(200).json(verSaldo)
}

const extratoBancario = (request, response) => {
    const { numero, senha } = request.query;

    if (!numero || !senha) {
        return response.status(404).json({ mensagem: `O numero da conta e a senha são Obrigatórios` })
    }
    const contaExistente = bancodedados.contas.find((conta) => {
        return conta.numero === numero
    })
    if (!contaExistente) {
        return response.status(404).json({ mensagem: `O numero da conta é inválido` })
    }
    const senhaValida = bancodedados.contas.find((senhaConta) => {
        return senhaConta.senha === senha
    })
    if (!senhaValida) {
        return response.status(401).json({ mensagem: `A senha precisa ser válida` })
    }
    const saquesRealizados = bancodedados.saques.filter((saque) => {
        return saque.numeroConta === numero
    })
    if (!saquesRealizados) {
        return response.status(404).json({ mensagem: `Conta bancária não encontada!` })
    }
    const depositoRealizados = bancodedados.saques.filter((deposito) => {
        return deposito.numeroConta === numero
    })
    if (!depositoRealizados) {
        return response.status(404).json({ mensagem: `Conta bancária não encontada!` })
    }
    const transfRealizados = bancodedados.transferencias.filter((transf) => {
        return transf.numeroContaOrigem === numero
    })
    if (!transfRealizados) {
        return response.status(404).json({ mensagem: `Conta bancária não encontada!` })
    }

    const extratoDaConta = {
        saques: saquesRealizados,
        depositoRealizados,
        transfRealizados
    }
    return response.status(200).json(extratoDaConta)
}

module.exports = {
    listarContaBancaria,
    criarContaBancaria,
    atualizarUsuarioDaConta,
    deletarConta,
    saldoDaConta,
    extratoBancario,
}