require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// setting client database
const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres'
});

// create database if it not exists yet
const createDatabaseIfNotExists = async () => {
    try {
        await client.connect(); // connecting database

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

// run sql scripts
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

// configuring setup to database
const setupDatabase = async () => {
    await createDatabaseIfNotExists();
    await runSQLScript('createTables'); // createTables
    await runSQLScript('seed'); // population database
};

// setup
setupDatabase().catch(console.error);

// export client of database
module.exports = client;
