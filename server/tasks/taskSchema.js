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
      required: true
    },
    dueDate: {
      type: String,
      required:true
    },
    status:{
      type: String,
      required:true,
      default: "ToDo"
    },
    checklist:{
        type: [{
            task:{type:String},
            isChecked: {type:Boolean, default: false},
        }]
    }
  },
  {
    timestamps: true,
    id: true,
  }
);


module.exports = mongoose.model("Tasks", TaskSchema);
