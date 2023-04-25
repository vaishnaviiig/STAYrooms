import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
function Bookingscreen({match}) {
  const [room, setrooms] = useState(true);
  const [loading, setloading] = useState(true);
  const[error, seterror]=useState(false);

   let {roomid} = useParams();
   let{fromdate}  = useParams();
   let{todate}  = useParams();
   const firstdate = moment(fromdate , 'DD-MM-YYYY')
   const lastdate = moment(todate , 'DD-MM-YYYY')
   
   const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1
  const [totalamount , settotalamount] = useState();

  const func =async() =>{
    try{
    setloading(true);
    
     const  data = (await axios.post('/api/rooms/getroombyid', {roomid})).data
     settotalamount(data.rentperday * totaldays)
     setrooms(data)
     setloading(false);
    }
    catch(error)
    {
    seterror(true)
    setloading(false)
    }  }
    useEffect( () => {
      func();
    },[]);
    
  

  const onToken =async(token) =>{
  console.log(token)
  const bookingDetails ={
    room,
    userid : JSON.parse(localStorage.getItem('currentUser'))._id,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token,
  }
  try {
   const  result = await axios.post('/api/bookings/bookroom', bookingDetails)
  }
  catch(error)
  {

  } 
}

useEffect( () => {
  onToken();
},[]);


  return (
    <div className="m-5">
     
      {loading ? ( <h1><Loader/></h1>) : (room  ?  (<div>

           <div className="row justify-content-center mt-5 ml-4 bos">
           
           <div className="col-md-5">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bbigimg" alt=""/>
            </div>

            <div className="col-md-5" ><b>
            <div style={{textAlign:'right'}}>
              <h1>Booking Details</h1>
              <hr/>
               <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
              <p>From Date : {fromdate}</p>
              <p>To Date :{todate}</p>
              <p>Max Count : {room.maxcount}</p>
              </div></b>
              <div style={{textAlign:'right'}}>
                <h1>Amount : </h1>
                <hr/>
                <b>
                <p> Total Days : {totaldays}</p>
                <p>Rent per day  : {room.rentperday}</p>
                <p> Total Amount : {totalamount}</p>
                </b>
            </div>
            <div style={{float: 'right'}}>
              
              <StripeCheckout
              amount={totalamount * 100}
                token={onToken}
                currency = 'INR'
                stripeKey="pk_test_51N0VxTSCYmjSMYQVRfiRTgH0YZNp6Fgz8Ol9mCszZqX787fNnrTql5BYbi0LpAOV57ZXe3d2V7xGkIpaGEOYj5YM00UQaqvdiv"
                >
              
              <button className="btn btn-primary" > Pay Now{" "}</button>
              </StripeCheckout>
            </div>
            </div>
             </div>
             </div>
          ) : <Error/>)
          }
    </div>
  );
}
export default Bookingscreen;