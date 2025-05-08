import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Tagasi from '../components/Tagasi'
import '../Kujundus.css'

export function Kujundus_A001(){
    const [lightsOn, setLightsOn] = useState(false);

    const handleLightsOn = () => setLightsOn(true);
    const handleLightsOff = () => setLightsOn(false); 

    return(
        <>
        <div id="controlPanel">
            <div id="lightsControl">
            <span
                className="lights-indicator"
                style={{ backgroundColor: lightsOn ? 'green' : 'gray' }}
            ></span>
                <button id="lightsOn" onClick={handleLightsOn}>
                    Tuled Sisse
                </button>
                <button id="lightsOff" onClick={handleLightsOff}>
                    Tuled Välja
                </button>
            </div>
            <div id="screenControl">
                <span className="screen-indicator"></span>
                <button id="screenOn">Ekraan Sisse</button>
                <button id="screenOff">Ekraan Välja</button>
            </div>
            <div id="projectorControl">
                <span className="projector-indicator"></span>
                <button id="projectorOn">Projektor Sisse</button>
                <button id="projectorOff">Projektor Välja</button>
            </div>
        </div>
        </>
    )
}

export function Kujundus_A002(){


    return(
        <>
        <Tagasi/>
        </>
    )
}

export function Kujundus_A003(){


    return(
        <>
        <Tagasi/>
        </>
    )
}
