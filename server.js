const express = require('express');
const db = require('./database'); // importa a conexão com o banco
const app = express();

app.use(express.json());

// Exemplo de uma rota que usa o banco de dados
app.get('/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
