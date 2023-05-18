import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Kamra";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
//import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  /*function filterByDate(dates) {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
    console.log(dates[0].format("DD-MM-YYYY"));
    console.log(dates[1].format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (var booking of room.currentbookings) {
          if (
            !moment(
              moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) &&
            !moment(
              moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }}
      }
    }*/
    function filterByDate(dates) {
      setfromdate(dates[0].format("DD-MM-YYYY"));
      settodate(dates[1].format("DD-MM-YYYY"));
      console.log(dates[0].format("DD-MM-YYYY"));
      console.log(dates[1].format("DD-MM-YYYY"));
    
      //tempRooms
     var tempRooms = [];
    
      for (let room of duplicaterooms) {
        var availability = false;
    
        if (room.currentBookings.length > 0) {
          for ( const booking of room.currentBookings) {
            //check between or equal to dates
            if (
              ((moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              ) )) &&
              ((moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )))
            ) {
              
              if (
                (dates[0].format("DD-MM-YYYY") !== booking.fromdate) &&
                (dates[0].format("DD-MM-YYYY") !== booking.todate) &&
                (dates[1].format("DD-MM-YYYY") !== booking.fromdate) &&
                (dates[1].format("DD-MM-YYYY") !== booking.todate)
              ) {
                availability = true;
              }
            }
          }
        } else {
          availability = false;
        }
    
        if (availability === true) {
          tempRooms.push(room);
        }
      }
    
      setrooms(tempRooms);
    }
    useEffect(() => {
      trryy();
    }, []);

    const trryy = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          {loading ? (
            <h1>
              <Loader />
            </h1>
          ) : rooms.length > 1 ? (
            rooms.map((room) => {
              return (
                <div className="col-md-9 mt-2">
                  <Room room={room} key={room.id} fromdate={fromdate} todate={todate} />
                </div>
              );
            })
          ) : (
            <h1>
              <Error />
            </h1>
          )}
        </div>
      </div>
    );
  
}

export default Homescreen;
