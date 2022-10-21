const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const userRoute = require('./routes/userRoutes')
const connectDB = require("./config/db")
const path = require('path')
require('dotenv').config()
connectDB();
var corsOptions = {
    origin: 'https://greatchat.uc.r.appspot.com/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const app = express();
var whitelist = ['http://localhost:3000',"https://greatchat.uc.r.appspot.com/"]
app.use(cors());
app.use(express.json());
// Connect to mongoose database
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});


const port = process.env.PORT || 3001;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/auth/', userRoute);
app.use(express.static("public"));
app.get("*", (req, res) =>
  res.sendFile("./public/index.html", { root: __dirname })
);
const httpserver= app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = socket(httpserver,{cors:["http://localhost:3000","https://greatchat.uc.r.appspot.com/"]});
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

io.on("connection", (socket) => {

//socket.id = "1";

    console.log(socket.id);

    
        socket.on("send-message",(message,room,profile)=>{
          console.log(message,room)
          if(room===""){
            socket.broadcast.emit('recieve-message',message,profile);
          }else {
            socket.to(room).emit('recieve-message',message,profile);
          }
          
        })
        socket.on('join-room',room=>{
          console.log("joined "+ room)
          socket.join(room)
        })
    
    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })

  });