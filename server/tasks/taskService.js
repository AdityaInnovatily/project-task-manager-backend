
const taskSchema = require("./taskSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');


module.exports.createTask = async (req, res) => {

  console.log("createTaks entry", req.body);
  
    const { title, priority, checklist, dueDate, status, userId } = req.body;
  
    const checkTaskTitle = await taskSchema.findOne({ title: title });

  
     try{
        const taskSubmit = await taskSchema.create({
            title: title,
            priority:priority,
            dueDate: dueDate,
            status: status,
            checklist: checklist,
            userId: userId
          });
      
          res.status(200).send(taskSubmit);
          
        }catch(error){
            res.status(500).send({ msg: error });
        }

    

      
  };


  module.exports.updateTask = async (req, res) => {


     // console.log("///////////////////////entry//////////////////////",req.body);
     const { taskId, title, priority, checklist, dueDate, status, userId } = req.body;
    
     console.log("taskId",req.body);
   
    //  const checkTaskTitle = await taskSchema.findOne({ id: !taskId, title: title });

    //  if (checkTaskTitle){
    //    return res.send({ msg: `oops!, ${title} already exist`});
    //  }

  try {
    
  let taskObjectId = new mongoose.Types.ObjectId(taskId);
   
    const taskSubmit = await taskSchema.updateOne(
      { _id: taskObjectId }, 
      {
        $set: 
          {
            title: title,
            priority:priority,
            dueDate: dueDate,
            status: status,
            checklist: checklist,
            userId: userId
          }
      },
    );

    const updatedTask = await taskSchema.findOne({_id: taskObjectId});

    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(500).send({ msg: error });
  }

  }

  
  module.exports.getTaskById = async (req, res) =>{
    console.log("req.params", req.params);
    let taskObjectId = new mongoose.Types.ObjectId(req.params.id);

    let taskList = await taskSchema.aggregate([
      {$match: {_id: taskObjectId}}
    ]);

    res.status(200).send(taskList);


  }

  module.exports.getTask = async (req, res) =>{
    console.log("req.params", req.params);

    let taskList = await taskSchema.aggregate([
      {$match: {userId: req.params.userId}}
    ]);

    res.status(200).send(taskList);


  }

  module.exports.updateTaskStatus = async (req, res)=>{

    const { taskId, status } = req.body;
   
    const taskSubmit = await taskSchema.updateOne(
      { _id: taskId }, 
      {
        $set: 
          {
            status:status
          }
      },
    );

    // console.log("udpad", taskSubmit);

    if(!taskSubmit?.modifiedCount){
      // res.status(200).send({msg:"Task updated"});
      res.status(500).send({msg:"Please, try again"});
    }else{
      res.status(200).send("Task Status Updated");
    }

  }


  module.exports.deleteTask = async (req, res) =>{
    
      console.log("req.params", req.params);
      let taskObjectId = new mongoose.Types.ObjectId(req.params.taskId); // Corrected parameter name
    
      try {
        const task = await taskSchema.deleteOne({ _id: taskObjectId });
        console.log(task); // Output: { ok: 1, n: 1 }
        res.status(200).json(task); // Send response
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error }); // Send error response
      }
    
  }


  module.exports.analytics  = ( async (req, res)=>{

    let taskList = await taskSchema.aggregate([
      {$match: {userId: req.params.userId}}
    ]);

    res.status(200).send(taskList);

  })
  