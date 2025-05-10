import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tagasi from '../components/Tagasi';
import LogoutButton from '../components/Logout';
import { useParams } from 'react-router-dom';
import '../Kujundus.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setDeviceState } from '../store/deviceStateSlice';
import { setPosition, setSize } from '../store/controlPanelSlice';
import { addDevice, removeDevice } from '../store/deviceListSlice';
import { Rnd } from 'react-rnd';
import Modal from 'react-modal';

type Device = {
    id: string;
    name: string;
};

type RoomControlProps = {
    roomId: string;
    devices: Device[];
};

Modal.setAppElement('#root'); // Required for accessibility

function AddDeviceButton({ roomId }: { roomId: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deviceName, setDeviceName] = useState('');
    const dispatch = useDispatch();
    const modalRef = React.useRef<HTMLDivElement>(null); // Ref for the modal
    const addButtonRef = React.useRef<HTMLButtonElement>(null); // Ref for the "Add Device" button
  
    const handleAddDevice = () => {
      if (!deviceName.trim()) {
        toast.error('Device name cannot be empty!');
        return;
      }
  
      const newDevice = {
        id: `device-${Date.now()}`,
        name: deviceName.trim(),
      };
  
      dispatch(addDevice({ roomId, device: newDevice }));
      toast.success(`Device "${deviceName}" added successfully!`);
      setDeviceName(''); // Clear the input
      setIsModalOpen(false); // Close the modal
    };
  
    // Manage focus when the modal opens and closes
    useEffect(() => {
      if (isModalOpen) {
        // Move focus to the modal when it opens
        modalRef.current?.focus();
      } else {
        // Return focus to the "Add Device" button when the modal closes
        addButtonRef.current?.focus();
      }
    }, [isModalOpen]);
  
    return (
      <>
        <button
          ref={addButtonRef}
          onClick={() => setIsModalOpen(true)}
          className="add-device-button"
          style={{
            position: 'fixed',
            left: '180px',
            top: '15px',
            fontSize: '20pt',
            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
          }}
        >
          Add Device
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Add Device"
          className="modal"
          overlayClassName="overlay"
          ariaHideApp={true} // Ensure aria-hidden is applied correctly
        >
          <div ref={modalRef} tabIndex={-1}>
            <h2>Add New Device</h2>
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Enter device name"
            />
            <button onClick={handleAddDevice}>Add</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      </>
    );
  }

function RoomControl({ roomId, devices }: RoomControlProps) {
    const dispatch = useDispatch<AppDispatch>();
  
    // Fetch device states, positions, and sizes from the Redux store
    const deviceStates = useSelector((state: RootState) => state.deviceState[roomId] || {});
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

    const handleDeleteDevice = (deviceId: string, deviceName: string) => {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${deviceName}"?`
      );
    
      if (confirmDelete) {
        dispatch(removeDevice({ roomId, deviceId }));
        toast.success(`Device "${deviceName}" removed successfully!`);
      } else {
        toast.info(`Deletion of device "${deviceName}" was canceled.`);
      }
    };
  
    return (
        <div id="roomEdit">
          <div id="roomName">
            <span>{roomId}</span>
            <AddDeviceButton roomId={roomId || 'default-room'}/>
          </div>
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
                  bounds="#controlPanel"
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
                    {/* Delete Button */}
                    <button
                      className="delete-device-button"
                      onClick={() => handleDeleteDevice(device.id, device.name)}
                      style={{
                        position: 'absolute',
                        top: '-54px', // Position above the Rnd container
                        right: '0', // Align to the right edge of the Rnd container
                        zIndex: 10, // Ensure it stays above the Rnd container
                      }}
                    >
                      🗑
                    </button>

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

export function KujundusAdmin({ mode }: KujundusProps) {
    const { room } = useParams<{ room: string }>(); // Extract roomId from URL parameters

    const devices = useSelector((state: RootState) => state.deviceList[room || 'default-room'] || [])

    return (
        <>
            <div id="header">
                <Tagasi />
                <h1>{mode === 'control' ? 'Seadmete juhtimine' : 'Kasutajaliidese redigeerimine'}</h1>
            </div>
            {mode === 'control' ? (
                <>
                  <RoomControl roomId={room || 'default-room'} devices={devices} />
                  <ToastContainer aria-label="Notification container" />
                </>
            ) : (
                <>
                  <RoomEdit roomId={room || 'default-room'} devices={devices} />
                  <ToastContainer aria-label="Notification container" />
                </>
            )}
        </>
    );
}

export function KujundusUser() {
  const { room } = useParams<{ room: string}>();

  const devices = useSelector((state: RootState) => state.deviceList[room || 'default-room'] || [])

  return(
    <>
      <div id="header">
        <LogoutButton />
        <h1>Seadmete Juhtimine</h1>
      </div>
      <RoomControl roomId={room || 'default-room'} devices={devices} />
      <ToastContainer aria-label="Notification container" />
    </>
  )
}