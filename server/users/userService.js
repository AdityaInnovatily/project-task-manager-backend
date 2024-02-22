const userSchema = require("./userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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


module.exports.updateUser = async(req, res) =>{


}



