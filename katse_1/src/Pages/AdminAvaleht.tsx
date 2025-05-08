import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/Logout';

export default function AdminAvaleht() {

  return (
    <>
      <header>
          <LogoutButton/>
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
