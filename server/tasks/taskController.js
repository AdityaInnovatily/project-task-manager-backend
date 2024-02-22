const {createTask, updateTask} = require("./taskService");
const router = require("express").Router();

router.post("/createTask", createTask);
router.post("/updateTask", updateTask);


module.exports = router;
