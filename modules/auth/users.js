const DatabaseConnector = require("../../config/db_connection.js");
const databaseConnector = new DatabaseConnector();

class UsersManager {
  constructor() {
    this.DBPool = databaseConnector.createDBPool();
  }

  checkDBPool() {
    if (this.DBPool.state === "disconnected") {
      this.DBPool = databaseConnector.createDBPool();
    }
  }

  queryBuilder(query, ...params) {
    return new Promise((resolve, reject) => {
      this.checkDBPool();
      this.DBPool.query(query, [...params], async (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }

  findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    return this.queryBuilder(query, email);
  }

  findById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    return this.queryBuilder(query, id);
  }

  createUser(firstName, lastName, email, password) {
    const query = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
    return this.queryBuilder(query, firstName, lastName, email, password);
  }
}

module.exports = UsersManager;
