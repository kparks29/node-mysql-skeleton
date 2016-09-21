export default {
  createUser: `INSERT INTO users SET ?;`,
  getUserByEmail: `SELECT * FROM users WHERE email=?;`
}
