const express = require('express');
const dotenv = require('dotenv');
const productsRouter = require('./routes/products');
const dbClient = require('./database');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// products route
app.use('/products', productsRouter);

// run server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// end database connection when turn off server
process.on('SIGINT', async () => {
    await dbClient.end();
    console.log('Database connection closed');
    process.exit(0);
});
