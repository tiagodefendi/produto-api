DO $$
BEGIN
    -- Verifica se a tabela products está vazia
    IF NOT EXISTS (SELECT 1 FROM products) THEN
        -- Insere os produtos na tabela
        INSERT INTO products (description, price, quantity, date) VALUES
        ('Maçã', 999.99, 2, '2024-10-23'),
        ('Batata', 1.99, 33, '2024-10-11'),
        ('Bornia', 0.01, 1, '2024-09-12');
    END IF;
END $$;
