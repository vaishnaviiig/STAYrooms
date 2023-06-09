import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Register() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setloading] = useState()
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()
  

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      }
      try {
        setloading(true)
        const resultt = await axios.post('api/users/register', user).data
        setloading(false)
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
        
      } catch (error) {
        console.log(error);
        setsuccess(false)
        seterror(true)
      }
    } else {
      alert("Password is incorrect");
    }
  }



  return (
    <div>
      {loading && (<Loader loading={loading}/>)}
      {error && (<Error/>)}
     
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 ">
        {success && (<Success message="Registration Successful"/>)}
          <div className="bos">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3 x" onClick={register}>
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Register;
