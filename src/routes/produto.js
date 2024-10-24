const express = require('express');
const client = require('../database'); // Importando a configuração do banco de dados
const router = express.Router();

// route to add product
router.post('/', async (req, res) => {
    const { description, price, quantity, date } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO products (description, price, quantity, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [description, price, quantity, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to get a product using id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to update a product using id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, price, quantity, date } = req.body;

    try {
        const result = await client.query(
            'UPDATE products SET description = $1, price = $2, quantity = $3, date = $4 WHERE id = $5 RETURNING *',
            [description, price, quantity, date, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// route to remove product using id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product removed', product: result.rows[0] });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// exporting router
module.exports = router;
