import React from 'react'
import { useParams } from 'react-router-dom'
import Tagasi from '../components/Tagasi'
import { Kujundus } from '../components/Kujundus';

function RedigeerimineRuum() {
  const { roomId } = useParams<{ roomId: string }>();

  return <Kujundus mode="edit" />;
}

export default RedigeerimineRuum;