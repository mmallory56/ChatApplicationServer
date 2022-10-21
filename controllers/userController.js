const expressAsyncHandler = require("express-async-handler");
const User =require("../models/userModel.js");
const generateToken = require("../utils/generateToken")
 const loginUser = expressAsyncHandler(async(req,res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user, user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("invalid email or password");
    }
})
const registerUser = expressAsyncHandler(async(req,res)=>{
  console.log(req.body)
    const { name, email, password } = req.body;
     
    const userExist = await User.findOne({ email });
  
    if (userExist) {
      res.status(400);
      throw new Error("user already exist");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
})


module.exports ={loginUser,registerUser}