
import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
function Loader() {
 let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
    
        
      
     return (
      <div className={{marginTop:'150px'}}>
      <div className="sweet-loading ">
      

      <HashLoader class
        color='#000000'
        loading={loading}
        cssOverride=''
        size={80}
       
      />
    </div></div>
    
  )
}

export default Loader
