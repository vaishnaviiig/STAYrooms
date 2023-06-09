import React from 'react'
import {Link} from 'react-router-dom'
function Landingscreens() {
  return (
    <div className='row landing justify-content-center'>
        <div className="col-md-9 my-auto text-center" style={{borderRight:'8px solid white'}}>
            <h2 style ={{fontSize: '150px'}}>STAYrooms</h2>
            <h1> Athithi Devo Bhava!!</h1>
            <Link to='/home'>
                <button className='btn landingbtn'>Get started</button>
            </Link>
        </div>
      
    </div>
  )
}

export default Landingscreens
