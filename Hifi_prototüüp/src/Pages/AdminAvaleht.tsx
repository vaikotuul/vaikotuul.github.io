import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminAvaleht() {
  return (
    <div>
        <div className='buttonContainer'>
        <Link to={'/admin/seadmete-juhtimine'}>
            <button>Seadete juhtimine</button>
        </Link>
        <button>Ajapõhine automatiseerimine</button>
        <button>Kasutajaliidese redigeerimine</button>
        </div>
    </div>
  )
}
