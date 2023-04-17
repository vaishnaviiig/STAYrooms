
import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
function Loader({loading}) {
 //let [loading, setLoading] = useState(true);
  
      return (
      <div className={{marginTop:'150px'}}>
      <div className="sweet-loading ">
      

      <HashLoader 
        color='#000000'
        loading={loading}
        cssOverride=''
        size={80}
       
      />
    </div></div>
    
  );
}

export default Loader;
