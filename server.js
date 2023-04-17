const Room = require('./model/room')
const User = require('./model/user')
const express = require("express");
const app = express();
const dbConfig = require("./db");
const roomroutes = require("./routes/roomroutes");
const usersroutes = require("./routes/usersroutes");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
 app.use(express.json())
 app.use('/api/rooms', roomroutes)
 app.use('/api/users', usersroutes)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port"));