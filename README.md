

# API Banco Digital

Uma breve descrição sobre o que esse projeto faz e para quem ele é:
Esse Projeto esta sendo desenvolvido para aprimorar e aplicar todo conhecimento absorvido durante o segundo modulo do curso de back-end da instituição Cubos Academy. 

## 🚀 Começando

### 📄 Documentação da API 

A API do nosso Banco digital terá alguns funcionalidade essenciais como:

- Abrir uma conta bancária.
- Consultar sua conta com acesso permitido.
- Atualizar os dados da sua conta.
- Realizar depositos.
- Ralizar saques.
- Fazer Transações.
- Consultar saldo disponível.
- Emissão do extrato bancário.
- Cancelamento de uma conta.

segue alguns  instruções  que serão necessarias para permitir que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste do nosso banco digital.

## 📦 Instalação

instalar dependências

```bash
  npm install express 
  nodemon 
```

## ⌨️ Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run start
```

## ↺ Rotas

### Consultas e criação de contas bancárias

```
POST  /contas - Criação de uma conta bancária;
```
```
GET  /contas -  Listagem de conta bancária com verificação de senha;
```
```
PUT  /contas/:numeroId - Atualiza os dados da conta bancária;
```
```
DELETE  /contas/:numeroId - Excluir conta bancária;
```
```
GET  /contas/saldo - retorna o saldo disponível na conta bancaria;
```
```
GET  /contas/extrato - Lista todas as transações realizada da conta bancária;
```
### Transações de contas bancárias 

```
POST  /transações/depositar - Deposito de "dinheiro" em conta bancária;
```
```
POST  /transações/sacar - Realiza  saque de "dinheiro" de uma conta bancária;
```
```
POST  /transações/transferir - Realiza  transferência de "dinheiro" de uma conta bancária;
```

## ⚙️ Executando os testes da API

![vscode](./img/img_Vscode.gif)

![vscode](./img/img_Insominia.gif)


## 🛠️ Construído com ferramentas 

- Node js -  framework para API's
- npm express - Gerente de Dependência e biblioteca 
- visual studio code -  editor de código-fonte 
- Insominia - ferramenta de teste e depuração de APIs

## 📌 Aprendizados

 Nesse projeto aprendi a usar a aplicação de bibliotecas e pacotes  atrelados ao nodeJS, que me permitem desenvolver aplicações que auxiliam no desenvolvimento e construção de codígos, usando o servidor e o terminal como meio de realizar as aplicações. Foi desafiador desenvolver e se organizar de maneira padronizada sabendo exatamente a função e metodos adequados a serem usados.
 

## 📋Feedback

Se você tiver algum feedback, por favor nos deixe saber pode adicionar seus comentarios e susgestões no projeto.

## 🖇️ Contribuindo

Contribuições são sempre bem-vindas!

Por favor, siga as diretrises fundamentais desse projeto.

## ✒️Autores

Com muita dedicação e amor ❤️ 
- (https://github.com/Vitcecilia) 
