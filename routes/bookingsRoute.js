const express = require("express");
const router = express.Router();
const Booking = require("../model/booking");
const moment = require("moment");
const Room = require("../model/room");
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")
('sk_test_51NGJVMSCuia6BPqTRqCaP7fTJKddfYy0PIudi1Rp8DDasS7y0WK0rK7yt7TywRLhguCT8oWfUo4Mej8NckfGuFZb00QjNilTEc');
router.post("/bookroom", async (req, res) => {
  const { room, userid, todate, fromdate, totalamount, totaldays, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })
     
    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "INR",
        receipt_email: token.email,
      },
      {
        idempotencykey: uuidv4()
      }
    )

    if (payment) {
      
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate: moment(fromdate, "DD-MM-YYYY"),
          todate: moment(todate, "DD-MM-YYYY"),
          totalamount,
          totaldays,
          transactionId: "12345",
        });
        const booking = await newbooking.save();
        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate: moment(fromdate, "DD-MM-YYYY"),
          todate: moment(todate, "DD-MM-YYYY"),
          userid: userid,
          status: booking.status,
        });
          await roomtemp.save();
         res.send("Room Booked successfully");
        
   
   }
  res.send("Payment Successfull, Your room is booked.");

}
catch (error) {
  return res.status(400).json({ error });}
});
module.exports = router;
