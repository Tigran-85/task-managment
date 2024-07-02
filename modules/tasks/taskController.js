const taskService = require("./taskService.js");

class TaskController {

  constructor() {
  }

  async createTask(req, res, next) {
    const data = await taskService.createTask(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async getTasks(req, res, next) {
    const data = await taskService.getTasks(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async getTaskById(req, res, next) {
    const data = await taskService.getTaskById(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async updateTask(req, res, next) {
    const data = await taskService.updateTask(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async updateTaskStatus(req, res, next) {
    const data = await taskService.updateTaskStatus(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async deleteTask(req, res, next) {
    const data = await taskService.deleteTask(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

}

module.exports = TaskController;