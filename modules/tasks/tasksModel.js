const DatabaseConnector = require("../../config/db_connection.js");
const databaseConnector = new DatabaseConnector();

class TasksManager {
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

  getTasks(userId) {
    const query = `SELECT * FROM tasks WHERE userId = ?`;
    return this.queryBuilder(query, userId);
  }

  createTask(userId, title, description) {
    const query = `INSERT INTO tasks (userId, title, description) VALUES (?, ?, ?)`;
    return this.queryBuilder(query, userId, title, description);
  }

  getTaskById(id, userId) {
    const query = `SELECT * FROM tasks WHERE id = ? AND userId = ?`;
    return this.queryBuilder(query, id, userId);
  }

  updateTask(id, title, description, userId) {
    const query = `UPDATE tasks SET title = ?, description = ? WHERE id = ? AND userId = ?`;
    return this.queryBuilder(query, title, description, id, userId);
  }

  updateTaskStatus(id, status, userId) {
    const query = `UPDATE tasks SET status = ? WHERE id = ? AND userId = ?`;
    return this.queryBuilder(query, status, id, userId);
  }

  deleteTask(id, userId) {
    const query = `DELETE FROM tasks WHERE id = ? AND userId = ?`;
    return this.queryBuilder(query, id, userId);
  }
}

module.exports = TasksManager;
