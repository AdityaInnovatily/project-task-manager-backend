const {createTask, updateTask,getTaskById, getTask,
     updateTaskStatus, deleteTask, analytics, updateChecklist} = require("./taskService");

const jwt = require('jsonwebtoken');
const router = require("express").Router();


// const authentication = require("../users/userController");


const authentication = (req,res,next)=>{

     let token = req.headers['authorization'];
   
     let filter_token = token?.split(" ");
     console.log('filter_token;',filter_token);
     // console.log('req.header;',filter_token[1]);
   
     if(!token){
         return res.status(401).json({msg: 'Unauthorized'});
     }
   
     if(filter_token[1] == "undefined"){
          return res.status(401).json({msg: 'Please, login first!'});
     }

     jwt.verify(filter_token[1],process.env.SECRET_KEY, (err,user)=>{
         if(err){
             return res.status(403).json({msg: 'Token InCorrect !'});
         }
   
         
         req.user = user;
        
     next();
     console.log("////////////////authentication done///////////////");
     
     });
    
   }

router.post("/createTask", authentication, createTask);
router.post("/updateTask", authentication, updateTask);
router.get("/getTaskById/:id", authentication, getTaskById);
router.get("/getTaskByIdPublic/:id", getTaskById);
router.get("/getTaskList/:userId/:sortBy", authentication, getTask);
router.post("/updateTaskStatus", authentication, updateTaskStatus);
router.delete("/deleteTask/:taskId", authentication, deleteTask);
router.get('/analytics/:userId', authentication, analytics);
router.post('/updateChecklist', authentication, updateChecklist);
router.post('/updateChecklistPublic', updateChecklist);



module.exports = router;
