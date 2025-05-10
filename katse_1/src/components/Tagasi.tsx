import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Tagasi(){
  const navigate = useNavigate();
  
  useEffect(() => {
        document.documentElement.style.setProperty(
          '--header-background-color',
          'var(--default-header-background-color)'
        );
        document.documentElement.style.setProperty(
          '--header-color',
          'var(--default-header-color)'
        );
        document.documentElement.style.setProperty(
          '--control-button-background-color',
          'var(--default-button-background-color)'
        );
        document.documentElement.style.setProperty(
          '--control-button-color',
          'var(--default-button-color)'
        );
        document.documentElement.style.setProperty(
          '--control-panel-color',
          'var(--default-button-color)'
        );
        document.documentElement.style.setProperty(
          '--control-panel-background-color',
          'var(--default-control-panel-background-color)'
        );
  }, []);

    
  return(
    <>
      <button className='back-button' onClick={()=>{
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