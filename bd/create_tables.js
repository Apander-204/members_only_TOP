const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  author_id INTEGER
);

CREATE TABLE IF NOT EXISTS statuses (
  id INTEGER,
  club BOOLEAN DEFAULT FALSE,
  admin BOOLEAN DEFAULT FALSE
);
`

async function createTables() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT)
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

createTables();