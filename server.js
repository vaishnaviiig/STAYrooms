const Room = require('./model/room')
const User = require('./model/user')
const express = require("express");
const app = express();
const dbConfig = require("./db");
const roomroutes = require("./routes/roomroutes");
const usersroutes = require("./routes/usersroutes");
const bookingsRoute = require('./routes/bookingsRoute')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
 app.use(express.json())
 app.use('/api/rooms', roomroutes)
 app.use('/api/users', usersroutes)
 app.use('/api/bookings', bookingsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port"));