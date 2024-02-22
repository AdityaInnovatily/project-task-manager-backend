const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required:true
    }
  },
  {
    timestamps: true,
    id: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
