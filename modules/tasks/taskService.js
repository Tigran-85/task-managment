const BaseService = require("../../services/BaseService.js");
const { Task: taskModel } = require("../../models");
const ApiError = require("../../exceptions/apiErrors.js");
const {
  RESPONSE_MESSAGES,
  ERROR_MESSAGES,
  VALIDATION_ERROR_MESSAGES,
} = require("../../common/validationMessage.js");
const { where } = require("sequelize");

class TaskService extends BaseService {
  constructor() {
    super();
  }

  async createTask(req, res, next) {
    try {
      const { title, description } = req.body;
      const userId = req.user.id;

      if (!title || !description) {
        throw ApiError.BadRequest(VALIDATION_ERROR_MESSAGES.REQUIRED);
      }

      const task =  await taskModel.create({
        userId,
        title,
        description
      })

      return this.response({
        message: RESPONSE_MESSAGES.CREATED,
        data: {
          id: task,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const userId = req.user.id;

      const tasks = await taskModel.findAll({
        where: {
          userId
        }
      });

      return this.response({
        data: {
          tasks,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const task = await taskModel.findOne({
        where: {
          id,
          userId
        }
      });

      if (!task) {
        throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      return this.response({
        data: {
          task,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const userId = req.user.id;

      const task = await taskModel.findOne({
        where: {
          id,
          userId
        }
      });

      if (!task) {
        throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      task.title = title;
      task.description = description;

      await task.save()

      return this.response({
        message: RESPONSE_MESSAGES.UPDATED,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTaskStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;

      const task = await taskModel.findOne({
        where: {
          id,
          userId
        }
      });

      if (!task) {
        throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      if (task.status === status) {
        throw ApiError.BadRequest(`status already ${status}`);
      }

      task.status = status;
      await task.save();

      return this.response({
        message: RESPONSE_MESSAGES.UPDATED,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const task = await taskModel.findOne({
        where: {
          id,
          userId
        }
      });

      if (!task) {
        throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
      }

      await task.destroy();

      return this.response({
        message: RESPONSE_MESSAGES.DELETED,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskService();
