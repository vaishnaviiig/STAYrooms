const mongoose = require("mongoose");
var mongoURL = 'mongodb+srv://vg9381:gupta@cluster0.cz4ev62.mongodb.net/mern-STAYroom'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});

var connection = mongoose.connection
connection.on('error', ()=>{
    console.log("Connection failed");
})
connection.on('connected', ()=>{
    console.log(" MongoDB Connection Successful");
})

module.exports = mongoose;