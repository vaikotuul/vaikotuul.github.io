import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


function Tagasi(){
    const navigate = useNavigate();

    return(
        <>
          <button onClick={()=>{
             if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/'); // fallback route
              }
           }}>
            Tagasi
            </button>
        </>
    )
}

export default Tagasi