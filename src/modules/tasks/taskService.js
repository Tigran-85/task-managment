import BaseService from "../../services/BaseService.js";
import TaskManager from "./tasksModel.js";
const taskManager= new TaskManager();

import ApiError from "../../exceptions/apiErrors.js";
import { RESPONSE_MESSAGES, ERROR_MESSAGES, VALIDATION_ERROR_MESSAGES } from "../../common/validationMessage.js";

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

            const task = await taskManager.createTask(userId, title, description);

            return this.response({
                message: RESPONSE_MESSAGES.CREATED,
                data: {
                    id: task.insertId
                }
            })
            
        } catch (error) {
            next(error);
        }
    }

    async getTasks(req, res, next) {
        try {
            const userId = req.user.id;

            const tasks = await taskManager.getTasks(userId);

            return this.response({
                data: {
                    tasks
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async getTaskById(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const task = await taskManager.getTaskById(id, userId);

            if (!task.length) {
                throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
            }

            return this.response({
                data: {
                    task
                },
            })
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const userId = req.user.id;

            const task = await taskManager.updateTask(id, title, description, userId);

            if (task.affectedRows === 0) {
                throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
            }

            return this.response({
                message: RESPONSE_MESSAGES.UPDATED,
            })
            
        } catch (error) {
            next(error);
        }
    }

    async updateTaskStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const userId = req.user.id;

            const statusCheck = await taskManager.getTaskById(id, userId);

            if (!statusCheck.length) {
                throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
            }

            if (statusCheck[0].status === status) {
                throw ApiError.BadRequest(`status already ${status}`)
            }

            const task = await taskManager.updateTaskStatus(id, status, userId);

            return this.response({
                message: RESPONSE_MESSAGES.UPDATED,
            })
            
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const task = await taskManager.deleteTask(id, userId);

            if (task.affectedRows === 0) {
                throw ApiError.BadRequest(ERROR_MESSAGES.TASK_NOT_FOUND);
            }

            return this.response({
                message: RESPONSE_MESSAGES.DELETED
            })
        } catch (error) {
            next(error);
        }
    }

}    

export default new TaskService();