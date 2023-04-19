import React, { useState, useEffect } from "react"
import axios from "axios";
import Room from "../components/Kamra"
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from 'antd';
import 'antd/dist/reset.css'; 
import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)
  

 

function filterByDate(dates) {
  console.log((dates[0].format('DD-MM-YYYY') ))
  console.log((dates[1].format('DD-MM-YYYY') ))
}
  useEffect(() => {
    trryy();
  } , []);

    const trryy =async() => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error)
        setloading(false);
      }
    }
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
         
        <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>
       
     <div className="row justify-content-center mt-5"> 
        {loading ? (
          <h1><Loader/></h1>) : rooms.length>1 ? (
            rooms.map((room)  => {
              return <div className="col-md-9 mt-2">
                <Room room={room}/>
             </div>
            }) 
        ) : (<h1><Error/></h1>
          )}
      </div>
    </div>
  )
}

export default Homescreen;


