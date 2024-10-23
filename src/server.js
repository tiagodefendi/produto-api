const express = require('express');
const dotenv = require('dotenv');
const productsRouter = require('./routes/products');
const dbClient = require('./database'); // Importando a configuração do banco de dados

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Usar o roteador de produtos
app.use('/products', productsRouter);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Encerrar a conexão do banco de dados ao sair do aplicativo
process.on('SIGINT', async () => {
    await dbClient.end();
    console.log('Database connection closed');
    process.exit(0);
});
