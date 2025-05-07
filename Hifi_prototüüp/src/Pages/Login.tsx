import React from 'react'
import {Link} from 'react-router-dom'
import "../Login.css"

function Login() {

  return (
    <div className='login-form'>
        <input type="text" placeholder="Kasutajanimi"></input>
        <input type="text" placeholder="Parool"></input>
        <Link to={"/admin"}>
        <button>Logi sisse</button>
        </Link>
    </div>
  )
}

export default Login