import React from 'react'
import { useParams } from 'react-router-dom'
import Tagasi from '../components/Tagasi'

function SeadmeteJuhtimineRuum(){
    const {room} = useParams();
    return(
        <>
        <header><Tagasi/> <p>Seadmete juhtimine</p></header>
        </>
    )
}

export default SeadmeteJuhtimineRuum