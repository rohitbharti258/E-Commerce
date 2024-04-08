const express  = require('express');
const router = express.Router();
const User =require("../models/User");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register",async ( req , res) => {

     const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:cryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
     });

     try{
         const savedUser = await newUser.save();
         res.status(200).json(savedUser);
     }catch(err){
        res.status(500).json(err);
     }
})

// LOGIN

router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("wrong credentials");
        const hash = cryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const pass = hash.toString(cryptoJS.enc.Utf8);
        pass!== req.body.password && res.status(401).json("wrong credentials");
 
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_KEY,
        {expiresIn:"3d"})
        const {password,...others} = user._doc;
        res.status(200).json({...others,accessToken});
    }catch(err){
        res.status(401).json(err);
    }
})
module.exports = router;