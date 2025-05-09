import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tagasi from '../components/Tagasi';
import LogoutButton from '../components/Logout';
import { useParams } from 'react-router-dom';
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

function RoomControl({ roomId, devices }: RoomControlProps) {
    const dispatch = useDispatch<AppDispatch>();
  
    // Fetch device states, positions, and sizes from the Redux store
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
  
    return (
      <div id="roomControl">
        <div id="roomName">{roomId}</div>
        <div id="controlPanel">
          {devices.map((device) => {
            // Get position and size for the current device
            const position = controlPanelPositions[device.id]?.position || { x: 0, y: 0 };
            const size = controlPanelSizes[device.id]?.size || { width: 320, height: 420 };
  
            return (
              <div
                key={device.id}
                className="deviceControl"
                style={{
                  position: 'absolute',
                  left: position.x,
                  top: position.y,
                  width: size.width,
                  height: size.height,
                }}
              >
                <span
                  className={deviceStates[device.id] ? 'indicator indicator-on' : 'indicator'}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    color: 'black',
                    fontSize: `${Math.min(size.width, size.height)*0.1}px`
                  }}
                >
                  {device.name}
                </span>
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
            );
          })}
        </div>
        <ToastContainer aria-label="Notification container" />
      </div>
    );
}

function RoomEdit({ roomId, devices }: RoomControlProps) {
    const dispatch = useDispatch<AppDispatch>();
    const controlPanelPositions = useSelector(
      (state: RootState) => state.controlPanel[roomId] || {}
    );
    const controlPanelSizes = useSelector(
      (state: RootState) => state.controlPanel[roomId] || {}
    );
  
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
        <div id="roomEdit">
          <div id="roomName">{roomId}</div>
          <div id="controlPanel" style={{border:"2px solid white"}}>
            {devices.map((device) => {
              const position = controlPanelPositions[device.id]?.position || { x: 0, y: 0 };
              const size = controlPanelSizes[device.id]?.size || { width: 320, height: 420 };
    
              return (
                <Rnd
                  key={device.id}
                  default={{
                    x: position.x,
                    y: position.y,
                    width: size.width,
                    height: size.height,
                  }}
                  bounds="parent"
                  onDragStop={(e, data) => {
                    handleDragStop(device.id, data.x, data.y);
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    handleResizeStop(device.id, ref.offsetWidth, ref.offsetHeight);
                  }}
                  enableResizing={true}
                  style={{
                    position: 'absolute',
                    border: '2px dashed #ccc',
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
                      className="indicator"
                      style={{
                        color: 'black',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: `${Math.min(size.width, size.height)*0.1}px`
                      }}
                    >
                      {device.name}
                    </span>
                    <button
                      className="controlButton"
                      style={{
                        width: '100%',
                        height: '30%',
                        cursor: 'not-allowed', // Change cursor to indicate disabled state
                        opacity: 0.5, // Optional: Make the button look disabled
                      }}
                      disabled // Disable the button
                    >
                      ON
                    </button>
                    <button
                      className="controlButton"
                      style={{
                        width: '100%',
                        height: '30%',
                        cursor: 'not-allowed', // Change cursor to indicate disabled state
                        opacity: 0.5, // Optional: Make the button look disabled
                      }}
                      disabled // Disable the button
                    >
                      OFF
                    </button>
                  </div>
                </Rnd>
              );
            })}
          </div>
        </div>
    );
}

type KujundusProps = {
    mode: 'control' | 'edit';
};

export function Kujundus({ mode }: KujundusProps) {
    const { room } = useParams<{ room: string }>(); // Extract roomId from URL parameters

    const devices = useSelector((state: RootState) => state.deviceList[room || 'default-room'] || [])

    return (
        <>
            <Tagasi />
            <div id="header">
                <h1>{mode === 'control' ? 'Seadmete juhtimine' : 'Kasutajaliidese redigeerimine'}</h1>
            </div>
            {mode === 'control' ? (
                <RoomControl roomId={room || 'default-room'} devices={devices} />
            ) : (
                <RoomEdit roomId={room || 'default-room'} devices={devices} />
            )}
        </>
    );
}