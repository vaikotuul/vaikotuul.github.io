import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function AdminAvaleht() {

  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/")
}

  return (
    <>
      <header>
          <button id="logOut" className="back-button" onClick={handleLogout}>Logi välja</button>
      </header>
      <div className='buttonContainer'>
      <Link to={'/admin/seadmete-juhtimine'}>
        <button>Seadete juhtimine</button>
      </Link>
      <Link to={'/admin/automatiseerimine'}>
        <button>Ajapõhine automatiseerimine</button>
      </Link>
      <Link to={'/admin/redigeerimine'}>
        <button>Kasutajaliidese redigeerimine</button>
      </Link>
      </div>
    </>
  )
}
