const {createTask, updateTask, getTask} = require("./taskService");
const router = require("express").Router();

router.post("/createTask", createTask);
router.post("/updateTask", updateTask);
router.get("/getTaskList/:userId", getTask);


module.exports = router;
