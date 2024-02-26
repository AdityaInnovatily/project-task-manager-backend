const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      description: ["highPriority", "moderatePriority", "lowPriority"]
    },
    dueDate: {
      type: String,
      // required:true
    },
    status:{
      type: String,
      required:true,
      default: "todo",
      description:["backlog","todo", "inProgress", "done"]
    },
    checklist:{
        type: [{
            task:{type:String},
            isChecked: {type:Boolean, default: false},
        }],
        required:true
    },
    userId:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
    id: true,
  }
);


module.exports = mongoose.model("Tasks", TaskSchema);
