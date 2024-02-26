const {createTask, updateTask,getTaskById, getTask, updateTaskStatus, deleteTask, analytics} = require("./taskService");
const router = require("express").Router();

router.post("/createTask", createTask);
router.post("/updateTask", updateTask);
router.get("/getTaskById/:id", getTaskById);
router.get("/getTaskList/:userId", getTask);
router.post("/updateTaskStatus", updateTaskStatus);
router.delete("/deleteTask/:taskId", deleteTask);
router.get('/analytics/:userId',analytics);



module.exports = router;
