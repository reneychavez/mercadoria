﻿# mercadoria

Documentação para um projeto em JavaScript que utiliza o framework Node.js para o backend e MySQL como banco de dados. O projeto faz uso de algumas dependências, incluindo Express, Cors, Body-parser e Dotenv para gerenciar variáveis de ambiente.

Requisitos:

Node.js
NPM (Node Package Manager)
MySQL Server

Dependências do Projeto:

Express: Framework web para Node.js que fornece um conjunto de recursos para aplicativos web e APIs.
Cors: Middleware para Express que permite requisições entre diferentes origens.
Body-parser: Middleware para Express que analisa os corpos das requisições HTTP.
Dotenv: Módulo para carregar variáveis de ambiente a partir de um arquivo .env.

Configuração do Ambiente:

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

Instale o MySQL Server e crie um banco de dados para o projeto.

Clone o repositório do projeto ou crie um novo diretório para o projeto.

No diretório do projeto, execute npm init -y para inicializar um novo projeto Node.js.

Instale as dependências do projeto executando npm install express cors body-parser dotenv mysql.

Caso queira que seu servidor reinicie automaticamente após cada atualização, você pode estar usando a dependência Nodemon.

Crie um arquivo .env para armazenar as variáveis de ambiente necessárias, como as credenciais do banco de dados.

Estrutura do Projeto:

projeto-node-mysql/
│
├── node_modules/        # Pasta contendo as dependências do projeto
│
├── server.js             # Arquivo principal do servidor Node.js
│
├── .env                 # Arquivo de configuração de variáveis de ambiente
│
├── package.json         # Arquivo de manifesto do projeto Node.js
│
└── README.md            # Arquivo de documentação do projeto

Uso do Projeto:

Configure as variáveis de ambiente necessárias no arquivo .env, como as credenciais do banco de dados.

Execute o servidor Node.js com o comando node start.

O servidor estará acessível em http://localhost:8083/api/mercado, ou em outra porta especificada no arquivo .env.

O projeto pode ser acessado e testado utilizando ferramentas como Postman ou REST Test Test.

Exemplo de Codigo:

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mysql = require('mysql');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do servidor Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL - Caso opte por não criar o arquivo .ENV
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Rotas do servidor
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Node.js com MySQL!');
});

// Iniciar o servidor
const port = process.env.PORT || 8083;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
