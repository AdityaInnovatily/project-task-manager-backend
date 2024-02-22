const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors());          // allow to cors 
app.use(express.json());  // this is parse the json req of apis.

const userController = require("./server/users/userController");


mongoose.connect(process.env.DATABASE_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DATABASE_NAME
  // strictQuery: false
})
.then(() => {
  console.log("DB Connection Successful");
})
.catch((err) => {
  console.log("errror:",err.message);
});


app.use("/user",userController);

app.get('/', async(req,res)=>{

  res.send(`Welcome to Task Manager`);
});


app.listen(process.env.PORT, function () {
  console.log(`Express server listening on ${process.env.PORT}`);
});

module.exports = app;
