import React from 'react'
import { useParams } from 'react-router-dom'
import Tagasi from '../components/Tagasi'
import { Kujundus } from '../components/Kujundus';

function SeadmeteJuhtimineRuum() {
  const { roomId } = useParams<{ roomId: string }>();

  return <Kujundus mode="control" />;
}

export default SeadmeteJuhtimineRuum;