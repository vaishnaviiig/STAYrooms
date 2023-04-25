const express = require('express');
const router = express.Router();
 const Booking = require("../model/booking")
 const moment = require('moment');
 const Room = require('../model/room')

router.post('/bookroom', async(req, res) =>{
const  
{ 
    room ,
    userid,
    todate,
    fromdate,
    totalamount,
    totaldays} =req.body

     try {
        const newbooking = new Booking ({
            room : room.name,
            roomid : room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId : '12345'
        })
        const booking = await newbooking.save()
        const roomtemp = await Room.findOne({_id: room._id})
        roomtemp.currentbookings.push({bookingid : booking._id , fromdate : moment(fromdate , 'DD-MM-YYYY'), todate :moment(todate , 'DD-MM-YYYY'), userid : userid,status :booking.status}),
       
        await roomtemp.save()

        res.send('Room Booked successfully')
     }
    catch(error){
     return res.status(400).json({error});
    }
});
module.exports = router