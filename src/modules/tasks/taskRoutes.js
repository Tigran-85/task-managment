import TaskController from "./taskController.js";
const taskController = new TaskController();

// validators
import TaskValidation from "../../common/validation/TaskValidation.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

import { Router } from "express";
const router = Router();

router.use(authMiddleware);

router.get(
    '/',
    taskController
      .getTasks
);

router.post(
    '/create',
    taskController
      .createTask
);

router.get(
    '/:id',
    taskController
      .getTaskById
);

router.put(
    '/update/:id',
    taskController
      .updateTask
);

router.put(
  '/update/status/:id',
  TaskValidation,
  taskController
    .updateTaskStatus
);

router.delete(
    '/delete/:id',
    taskController
      .deleteTask
);


export default router;