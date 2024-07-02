const TaskController = require("./taskController.js");
const taskController = new TaskController();

// validators
const TaskValidation = require("../../common/validation/TaskValidation.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");

const { Router } = require("express");

const router = Router();

router.use(authMiddleware);

router.get("/", taskController.getTasks);

router.post("/create", taskController.createTask);

router.get("/:id", taskController.getTaskById);

router.put("/update/:id", taskController.updateTask);

router.put(
  "/update/status/:id",
  TaskValidation,
  taskController.updateTaskStatus
);

router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
