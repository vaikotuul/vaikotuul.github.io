import React from 'react'
import { useParams } from 'react-router-dom'
import Tagasi from '../components/Tagasi'
import { Kujundus } from '../components/Kujundus'
import LogoutButton from '../components/Logout'


function UserSeadmeteJuhtimine(){

    return(
        <>
        <LogoutButton/>
        <Kujundus mode="control"/>
        </>
    )
}

export default UserSeadmeteJuhtimine