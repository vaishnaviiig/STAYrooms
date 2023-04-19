import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
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
const totalamount = totaldays* room.rentperday;
  const funck =async() =>{
    try {
      
      setloading(true);
      const dataa = (await axios.post("/api/rooms/getroombyid",{roomid})).data;
      setrooms(dataa);
      setloading(false);
      
    } 
    catch (error) {
      
     
     setloading(false);
      seterror(true);
    }
  }
  useEffect( () => {
    funck();
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
               <p>Name : </p>
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
              <button className="btn btn-primary">Pay Now</button>
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