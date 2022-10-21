const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     
},{timestamps:true})



const Room = mongoose.model('Room',roomSchema);

module.exports = Room;