import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tagasi from '../components/Tagasi';
import '../Kujundus.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setDeviceState } from '../store/deviceSlice';
import { setPosition, setSize } from '../store/controlPanelSlice';
import { Rnd } from 'react-rnd';

type Device = {
    id: string;
    name: string;
};

type RoomControlProps = {
    roomId: string;
    devices: Device[];
};

type DragItem = {
    type: string;
    id: string;
    deviceId: string;
  };

function RoomControl({ roomId, devices }: RoomControlProps) {
    const dispatch = useDispatch<AppDispatch>();
    const deviceStates = useSelector((state: RootState) => state.devices[roomId] || {});
    const controlPanelPositions = useSelector(
        (state: RootState) => state.controlPanel[roomId] || {}
    );
    const controlPanelSizes = useSelector(
        (state: RootState) => state.controlPanel[roomId] || {}
    );

    const handleDeviceToggle = (deviceId: string, deviceName: string, turnOn: boolean) => {
        if (deviceStates[deviceId] !== turnOn) {
        dispatch(setDeviceState({ roomId, deviceId, state: turnOn }));
        toast[turnOn ? 'success' : 'info'](`${deviceName} turned ${turnOn ? 'ON' : 'OFF'} in ${roomId}`);
        }
    };

    const handleDragStop = (deviceId: string, x: number, y: number) => {
        dispatch(
            setPosition({
                roomId,
                deviceId,
                position: { x, y },
            })
        );
    };

    const handleResizeStop = (deviceId: string, width: number, height: number) => {
        dispatch(
            setSize({
                roomId,
                deviceId,
                size: { width, height },
            })
        );
    };

    return (
        <>
            <div id="roomName">{roomId}</div>
            <div id="controlPanel">
                {devices.map((device) => (
                <Rnd
                    key={device.id}
                    default={{
                        x: controlPanelPositions[device.id]?.position.x || 0,
                        y: controlPanelPositions[device.id]?.position.y || 0,
                        width: controlPanelSizes[device.id]?.size.width || 320,
                        height: controlPanelSizes[device.id]?.size.height || 420,
                    }}
                    bounds="parent"
                    onDragStop={(e, data) => {
                        handleDragStop(device.id, data.x, data.y)}
                    }
                    onResizeStop={(e, direction, ref, delta, position) => {
                        handleResizeStop(device.id, ref.offsetWidth, ref.offsetHeight);
                    }}
                    enableResizing={true}
                    style={{
                        position: 'absolute',
                        border: '1px solid #ccc',
                        padding: '10px',
                        cursor: 'move',
                    }}
                >
                <div
                    className="deviceControl"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <span
                        className={deviceStates[device.id] ? 'indicator indicator-on' : 'indicator'}
                        style={{
                            color: 'black',
                            width: 100,
                            height: 100,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >{device.name}</span>
                    <button
                        onClick={() => handleDeviceToggle(device.id, device.name, true)}
                        className="controlButton"
                        style={{
                            width: '100%',
                            height: '30%',
                        }}
                    >
                        ON
                    </button>
                    <button
                        onClick={() => handleDeviceToggle(device.id, device.name, false)}
                        className="controlButton"
                        style={{
                            width: '100%',
                            height: '30%',
                        }}
                    >
                        OFF
                    </button>
                </div>
            </Rnd>
            ))}
            </div>
            <ToastContainer aria-label="Notification container" />
        </>
    )
}

export function Kujundus_A001() {
    const devices = [
        { id: 'lights', name: 'Tuled' },
        { id: 'screen', name: 'Ekraan' },
        { id: 'projector', name: 'Projektor' },
    ];
    return (
        <>
        <div id="header">
            <h1>Seadmete juhtimine</h1>
        </div>
        <RoomControl roomId="A-001" devices={devices} />
        </>
    );
}

export function Kujundus_A002() {
    const devices = [
        { id: 'lights', name: 'Tuled' },
        { id: 'screen', name: 'Ekraan' },
    ];
    return (
        <>
        <div id="header">
            <h1>Seadmete juhtimine</h1>
        </div>
        <RoomControl roomId="A-002" devices={devices} />
        </>
    );
}

export function Kujundus_A003() {
    const devices = [
        { id: 'lights', name: 'Tuled' },
        { id: 'projector', name: 'Projektor' },
    ];
    return (
        <>
        <div id="header">
            <h1>Seadmete juhtimine</h1>
        </div>
        <RoomControl roomId="A-003" devices={devices} />
        </>
    );
}