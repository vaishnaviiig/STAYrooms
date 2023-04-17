import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
function Room({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    
      <div className="row bos">
        <div className="col-md-5">
          <img src={room.imageurls[0]} className="smalling" />
        </div>
        <div className="col-md-7 text-left">
          <h1>{room.name}</h1>
          <b>
            {" "}
            <p>Max Count : {room.maxcount}</p>
            <p>Phone No : {room.phonenumber}</p>
            <p>Type : {room.type}</p>
            <div style={{ float: "right" }}>
              <Link to={`/book/${room._id}`}>
                <Button className="btn btn-primary">Book Now</Button>
              </Link>
              <Button className="btn btn-primary" onClick={handleShow}>
                View details
              </Button>
            </div>
          </b>
        
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
        <b>  <Modal.Title>{room.name}</Modal.Title></b>
        </Modal.Header>
        <Modal.Body>

          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
