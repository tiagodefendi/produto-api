const express = require('express');
const dotenv = require('dotenv');
const productsRouter = require('./routes/produtos');
const productRouter = require('./routes/produto');
const dbClient = require('./database');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota de produtos
app.use('/produtos', productsRouter);
app.use('/produto', productRouter);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Fechar conexão com o banco ao desligar o servidor
const gracefulShutdown = async () => {
    try {
        await dbClient.end();
        console.log('Database connection closed');
        process.exit(0);
    } catch (err) {
        console.error('Error closing database connection', err);
        process.exit(1);
    }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
