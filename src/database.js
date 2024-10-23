require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Configuração do cliente do banco de dados
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres'
});

// Função para criar o banco de dados se não existir
const createDatabaseIfNotExists = async () => {
    try {
        await client.connect(); // Conectar ao banco de dados antes de verificar

        const dbName = process.env.DB_DATABASE;
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database ${dbName} created successfully.`);
        } else {
            console.log(`Database ${dbName} already exists.`);
        }
    } catch (error) {
        console.error('Error checking or creating database:', error);
    }
};

// Função para executar scripts SQL
const runSQLScript = async (filename) => {
    try {
        const file_path = path.join(__dirname, 'sql', `${filename}.sql`);
        const sql = fs.readFileSync(file_path, 'utf-8');

        await client.query(sql);
        console.log(`Executed SQL script from ${file_path}`);
    } catch (error) {
        console.error('Error executing SQL script:', error);
    }
};

// Função principal para configurar o banco de dados
const setupDatabase = async () => {
    await createDatabaseIfNotExists(); // Certifique-se de que o banco de dados existe
    await runSQLScript('createTables'); // Criar tabelas
    await runSQLScript('seed'); // Popular tabelas
};

// Executar a configuração do banco de dados
setupDatabase().catch(console.error);

// Exportar o cliente
module.exports = client;
