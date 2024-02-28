const { registerUser, login, updateUser } = require("./userService");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = require("express").Router();


const authentication = (req,res,next)=>{

    let token = req.headers['authorization'];
  
    let filter_token = token?.split(" ");
    // console.log('req.header;',req.headers);
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

router.post('/register',registerUser);
router.post('/login',login);
router.post('/updateUser', authentication, updateUser);


module.exports = router;