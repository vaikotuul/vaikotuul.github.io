import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminAvaleht() {
  return (
    <>
      <header>
        <Link to={"../"}>
          <button id="logOut">Logi välja</button>
        </Link>
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
