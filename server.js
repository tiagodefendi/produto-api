const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurando pool de conexão com PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Testando a conexão com o banco
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro conectando ao banco de dados:', err.stack);
    }
    console.log('Conectado ao banco de dados!');
    release();
});

// Rota simples para testar o servidor
app.get('/', (req, res) => {
    res.send('Servidor rodando com Node.js, Express e PostgreSQL');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
