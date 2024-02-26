const userSchema = require("./userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');


module.exports.registerUser = async (req, res) => {
  try {

    const { name, email, password} = req.body;

    if (!name || !email || !password ) {

      return res.send("Please, fill details completely");

    }
    else{

      const userDetails = await userSchema.findOne({ email: email });
      
      console.log(userDetails);
      if (userDetails) {
        res.send({msg:`${email} already exist`});
      } else {

          const hashedPassword = await bcrypt.hash(password, 10);
        
        let userResponse = await userSchema.create({
          name: name,
          email:email,
          password:hashedPassword
        });
    
        res.status(201).send({
          name:userResponse.name,
          email: userResponse.email, 
          createdAt: userResponse.createdAt,
          status:201
        });

      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error',error);
  }
};


module.exports.login = async (req, res) => {
  
    const { email, password } = req.body;
  
    const user = await userSchema.findOne({ email: email });
    console.log("user;",user);

    if (!user){
      return res.send({ msg: `oops!, ${email} does not exist`});
    }else{
   
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
      return res.send({ msg: "Incorrect Password"});
    }

    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '1d'});

    return res.send({token: token, userDetails: user});

  }
  
};


module.exports.updateUser = async (req, res) =>{
  
  const {userId, name, oldPassword, newPassword } = req.body;
console.log(req.body, userId);
  
  
  let userDetails = await userSchema.findOne({_id:userId});

  if(oldPassword && newPassword){

  let isPaswordMatched =  await bcrypt.compare(oldPassword, userDetails.password);

  if(!isPaswordMatched){
   return res.send({msg: "wrong password"});
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
 let userResponse = await userSchema.updateOne({_id:userId},{
    name: name,
    password:hashedNewPassword
  });

}

else{

  let userResponse = await userSchema.updateOne({_id:userId},{
    name: name
  });

}

let updatedUser = await userSchema.findOne({_id: userId});
  res.status(201).send(updatedUser);

}



