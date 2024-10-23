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

// route per id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// exporting router
module.exports = router;
