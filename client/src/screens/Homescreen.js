import React, { useState, useEffect } from "react"
import axios from "axios";
import Room from "../components/Kamra"
import Loader from "../components/Loader";
import Error from "../components/Error";
function Homescreen() {
  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState()
  const [error, seterror] = useState()
  
  useEffect(() => {
    trryy();
  }, []);
    const trryy =async() => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
  return (
    <div className="container">
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


