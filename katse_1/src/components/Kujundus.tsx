import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Tagasi from '../components/Tagasi'
import '../Kujundus.css'

export function Kujundus_A001(){
    const [lightsOn, setLightsOn] = useState(false);
    const [screenOn, setScreenOn] = useState(false);
    const [projectorOn, setProjectorOn] = useState(false);

    const handleLightsOn = () => {
        setLightsOn(true);
        
    }
    const handleLightsOff = () => setLightsOn(false); 

    const handleScreenOn = () => setScreenOn(true);
    const handleScreenOff = () => setScreenOn(false);
    
    const handleProjectorOn = () => setProjectorOn(true);
    const handleProjectorOff = () => setProjectorOn(false); 

    return(
        <>
        <div id="controlPanel">
            <div id="lightsControl">
            <span
                className={lightsOn ? 'indicator indicator-on' : "indicator" }
            ></span>
                <button id="lightsOn" onClick={handleLightsOn}>
                    Tuled Sisse
                </button>
                <button id="lightsOff" onClick={handleLightsOff}>
                    Tuled Välja
                </button>
            </div>
            <div id="screenControl">
                <span 
                    className={screenOn ? 'indicator indicator-on' : "indicator" }
                ></span>
                <button id="screenOn" onClick={handleScreenOn}>Ekraan Sisse</button>
                <button id="screenOff" onClick={handleScreenOff}>Ekraan Välja</button>
            </div>
            <div id="projectorControl">
                <span
                    className={projectorOn ? 'indicator indicator-on' : "indicator" }
                ></span>
                <button id="projectorOn" onClick={handleProjectorOn}>Projektor Sisse</button>
                <button id="projectorOff" onClick={handleProjectorOff}>Projektor Välja</button>
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
