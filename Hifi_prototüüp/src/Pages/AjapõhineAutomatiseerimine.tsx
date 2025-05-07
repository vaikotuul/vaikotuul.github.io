import React from 'react'
import { Link } from 'react-router-dom'

function AjapõhineAutomatiseerimine() {
  return (
    <div>
        <Link to={'/admin'}>
            <button>Tagasi</button>
        </Link>
        <p>Ajapõhine automatiseerimine</p>
    </div>
  )
}

export default AjapõhineAutomatiseerimine