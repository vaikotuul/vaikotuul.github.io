import React from 'react'
import { Link } from 'react-router-dom'

function Redigeerimine() {
  return (
    <div>
        <Link to={'/admin'}>
            <button>Tagasi</button>
        </Link>
        <p>Siin saab muuta kasutajaliidest</p>
    </div>
  )
}

export default Redigeerimine