const mongoose = require("mongoose");

const connect = async() => {
   try{
    await mongoose.connect('mongodb://localhost:27017');
   }
   catch(error){
    throw error;
   }
}


module.exports = connect;