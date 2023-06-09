
import React from "react";
import HashLoader from "react-spinners/HashLoader";
function Loader({loading}) {
 
  
      return (
      <div className= {{paddingTop:'150px' ,paddingLeft:'50px'}}>
      <div className="sweet-loading ">
      
<div className="aww">
      <HashLoader 
        color='#000000'
        loading={loading}
        cssOverride=''
        size={80}
       
      />
      </div>
    </div></div>
    
  );
}

export default Loader;
