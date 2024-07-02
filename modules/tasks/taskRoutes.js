const TaskController = require("./taskController.js");
const taskController = new TaskController();

// validators
const taskValidation = require("../../common/validation/taskValidation.js");
const taskStatusValidation = require("../../common/validation/taskStatusValidation.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const { Router } = require("express");

const router = Router();

router.use(authMiddleware);

router.get("/", taskController.getTasks);

router.post("/create", 
  taskValidation,
  taskController.createTask);

router.get("/:id", taskController.getTaskById);

router.put("/update/:id", 
  taskValidation,
  taskController.updateTask);

router.put(
  "/update/status/:id",
  taskStatusValidation,
  taskController.updateTaskStatus
);

router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
