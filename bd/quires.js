const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function newMessage(title, message, user) {
    console.log(user);
  await pool.query("INSERT INTO messages (title, message, author_id) VALUES ($1, $2, $3)", [title, message, user.id]);
  return "Success";
}

async function findUserByUsername(username) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

async function createUser(username, password) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
  return "Success";
}

async function addClubMember(user) {
  await pool.query("INSERT INTO statuses (id, club) VALUES ($1, TRUE)", [user.id]);
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