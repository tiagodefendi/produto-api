const express = require('express');
const client = require('../database'); // Importando a configuração do banco de dados
const router = express.Router();

// route for all
router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products');
        res.status(200).json(result.rows); // Retorna os dados em formato JSON
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// exporting router
module.exports = router;
