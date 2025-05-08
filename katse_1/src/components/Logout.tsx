import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {

const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/")
}


  return (
    <button id='logOut' 
        className='back-button' 
        onClick={handleLogout}>
            Logi välja
    </button>
  )
}

export default LogoutButton