const pool = require('./pool');
require('dotenv').config();

const schema = process.env.SCHEMA_NAME;

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT * FROM ${schema}.messages`);
  return rows;
}

async function getAllUsers() {
  const { rows } = await pool.query(`SELECT * FROM ${schema}.users`);
  return rows;
}

async function newMessage(title, message, user) {
    console.log(user);
  await pool.query(`INSERT INTO ${schema}.messages (title, message, author_id) VALUES ($1, $2, $3)`, [title, message, user.id]);
  return "Success";
}

async function findUserByUsername(username) {
  const result = await pool.query(`SELECT * FROM ${schema}.users WHERE username = $1`, [username]);
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(`SELECT * FROM ${schema}.users WHERE id = $1`, [id]);
  return result.rows[0];
}

async function createUser(username, password) {
  await pool.query(`INSERT INTO ${schema}.users (username, password) VALUES ($1, $2)`, [username, password]);
  return "Success";
}

async function addClubMember(user) {
  await pool.query(`INSERT INTO ${schema}.statuses (id, club) VALUES ($1, TRUE)`, [user.id]);
  return "Success";
}

module.exports = {
    getAllMessages,
    newMessage,
    findUserById,
    findUserByUsername,
    createUser,
    getAllUsers,
    addClubMember
};