
const taskSchema = require("./taskSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');


module.exports.createTask = async (req, res) => {
  
    const { title, priority, checklist, dueDate, status, userId } = req.body;
  
    const checkTaskTitle = await taskSchema.findOne({ title: title });

    if (checkTaskTitle){
      return res.send({ msg: `oops!, ${title} already exist`});
    }else{
   
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

    }

      
  };


  module.exports.updateTask = async (req, res) => {


     // console.log("///////////////////////entry//////////////////////",req.body);
     const { taskId, title, priority, checklist, dueDate, status, userId } = req.body;
  
   
     const checkTaskTitle = await taskSchema.findOne({ title: title });

     if (checkTaskTitle){
       return res.send({ msg: `oops!, ${title} already exist`});
     }

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


  module.exports.getTask = async (req, res) =>{

    let taskList = await this.taskSchema.aggregate([
      {$match: {userId: req.params.userId}}
    ]);

    res.status(200).send(taskList);


  }