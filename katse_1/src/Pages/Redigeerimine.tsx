import React from 'react'
import { Link } from 'react-router-dom'
import Tagasi from '../components/Tagasi'

function Redigeerimine() {
  const ruumid = ["A-001", "A-002", "A-003"]
  return (
    <>
        <Tagasi />
        <div id="roomSelection">
        {ruumid.map(ruum => (
          <Link
            to={`/admin/seadmete-juhtimine/${ruum}`}
            key={ruum}
          >
            <button className='room-button'>{ruum}</button>
          </Link>
        ))}
        </div>
    </>
  )
}

export default Redigeerimine