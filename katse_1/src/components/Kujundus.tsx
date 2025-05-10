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
import { setRoomColor } from '../store/roomColorsSlice';
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

type ChangeColorProps = {
  roomId: string; // Ensure roomId is always a string
};

function Toolbar({ roomId }: { roomId: string }){

  return(
    <>
      <AddDeviceButton roomId={roomId || 'default-room'}/>
      <ChangeControlPanel roomId={roomId || 'default-room'}/>
      <ChangeHeader roomId={roomId || 'default-room'} />
    </>
  )
}

function ChangeControlPanel({ roomId }: ChangeColorProps) {
  const dispatch = useDispatch();

  const handleColorChange = (key, value: string) => {
    console.log('roomId in ChangeControlPanel:', roomId);
    dispatch(setRoomColor({ roomId, key, value }));
  };

  return(
    <div className='toolbar-item-container'>
      <div className='toolbar-item'>
        <p>Muuda kontroll-paneeli taustavärvi</p>
        <input 
          type="color" 
          id="controlPanelBackgroundColor" 
          onChange={(e) => handleColorChange('controlPanelBackgroundColor', e.target.value)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda kontroll-paneeli teksti värvi</p>
        <input 
          type="color" 
          id="controlPanelColor" 
          onChange={(e) => handleColorChange('controlPanelColor', e.target.value)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda nuppude taustavärvi</p>
        <input 
          type="color"
          id="controlButtonBackgroundColor" 
          onChange={(e) => handleColorChange('controlButtonBackgroundColor', e.target.value)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda nuppude teksti värvi</p>
        <input 
          type="color"
          id="controlButtonColor" 
          onChange={(e) => handleColorChange('controlButtonColor', e.target.value)}
        />
      </div>
    </div>
  )
}

function ChangeHeader({ roomId }: ChangeColorProps) {
  const dispatch = useDispatch();

  const handleColorChange = (key, value: string) => {
    console.log('roomId in ChangeHeader:', roomId);
    dispatch(setRoomColor({ roomId, key, value }));
  };

  return(
    <div className='toolbar-item-container'>
      <div className='toolbar-item'>
        <p>Muuda päise taustavärvi</p>
        <input 
          type="color"
          id="headerBackgroundColor"
          onChange={(e) => handleColorChange('headerBackgroundColor', e.target.value)}
        />
      </div>
      <div className='toolbar-item'>
        <p>Muuda päise teksti värvi</p>
        <input 
          type="color"
          id="headerBackgroundColor" 
          onChange={(e) => handleColorChange('headerColor', e.target.value)}
        />
      </div>
    </div>
  )
}

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
            fontSize: '20pt',
            fontFamily: 'var(--font-family)',
          }}
        >
          Lisa seade
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
    const colors = useSelector((state: RootState) => state.roomColors[roomId] || {});

    useEffect(() => {
      // Update CSS variables dynamically
      document.documentElement.style.setProperty(
        '--control-panel-background-color',
        colors.controlPanelBackgroundColor || 'white'
      );
      document.documentElement.style.setProperty(
        '--control-panel-color',
        colors.controlPanelColor || 'black'
      );
      document.documentElement.style.setProperty(
        '--control-button-background-color',
        colors.controlButtonBackgroundColor || 'white'
      );
      document.documentElement.style.setProperty(
        '--control-button-color',
        colors.controlButtonColor || 'black'
      );
      document.documentElement.style.setProperty(
        '--header-background-color',
        colors.headerBackgroundColor || 'white'
      );
      document.documentElement.style.setProperty(
        '--header-color',
        colors.headerColor || 'black'
      );
    }, [colors]); // Re-run when colors change

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
    const colors = useSelector((state: RootState) => state.roomColors[roomId] || {});


    useEffect(() => {
      // Update CSS variables dynamically
      document.documentElement.style.setProperty(
        '--control-panel-background-color',
        colors.controlPanelBackgroundColor || 'white'
      );
      document.documentElement.style.setProperty(
        '--control-panel-color',
        colors.controlPanelColor || 'black'
      );
      document.documentElement.style.setProperty(
        '--control-button-background-color',
        colors.controlButtonBackgroundColor || 'white'
      );
      document.documentElement.style.setProperty(
        '--control-button-color',
        colors.controlButtonColor || 'black'
      );
      document.documentElement.style.setProperty(
        '--header-background-color',
        colors.headerBackgroundColor || 'white'
      );
      document.documentElement.style.setProperty(
        '--header-color',
        colors.headerColor || 'black'
      );
    }, [colors]); // Re-run when colors change

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
          </div>
          <div 
            id="toolbar"
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Toolbar roomId={roomId || 'default-room'}/>
          </div>
          <div 
            id="controlPanel" 
            style={{
              border:"2px solid white",
              backgroundColor: colors.controlPanelBackgroundColor,
              color: colors.controlPanelColor,
            }}
          >
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
                        color: colors.controlPanelColor,
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
                        backgroundColor: colors.controlButtonBackgroundColor,
                        color: colors.controlButtonColor,
                        width: '100%',
                        height: '30%',
                        cursor: 'not-allowed', // Change cursor to indicate disabled state
                      }}
                      disabled // Disable the button
                    >
                      ON
                    </button>
                    <button
                      className="controlButton"
                      style={{
                        backgroundColor: colors.controlButtonBackgroundColor,
                        color: colors.controlButtonColor,
                        width: '100%',
                        height: '30%',
                        cursor: 'not-allowed', // Change cursor to indicate disabled state
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
    const roomId = room || 'default-room';

    const devices = useSelector((state: RootState) => state.deviceList[roomId || 'default-room'] || [])
    const colors = useSelector((state: RootState) => state.roomColors[roomId || 'default-room'] || {});

    return (
        <>
            <div 
              id="header"
              style={{
                backgroundColor: colors.headerBackgroundColor,
                color: colors.headerColor,
              }}
            >
                <Tagasi />
                <h1>{mode === 'control' ? 'Seadmete juhtimine' : 'Kasutajaliidese redigeerimine'}</h1>
            </div>
            {mode === 'control' ? (
                <>
                  <RoomControl roomId={roomId || 'default-room'} devices={devices} />
                  <ToastContainer aria-label="Notification container" />
                </>
            ) : (
                <>
                  <RoomEdit roomId={roomId || 'default-room'} devices={devices} />
                  <ToastContainer aria-label="Notification container" />
                </>
            )}
        </>
    );
}

export function KujundusUser() {
  const { room } = useParams<{ room: string }>(); // Extract roomId from URL parameters
  const roomId = room || 'default-room';

  const devices = useSelector((state: RootState) => state.deviceList[roomId || 'default-room'] || []);
  const colors = useSelector((state: RootState) => state.roomColors[roomId || 'default-room'] || {});

  return (
    <>
      <div
        id="header"
        style={{
          backgroundColor: colors.headerBackgroundColor,
          color: colors.headerColor,
        }}
      >
        <LogoutButton />
        <h1>Seadmete Juhtimine</h1>
      </div>
      <RoomControl roomId={roomId || 'default-room'} devices={devices} />
      <ToastContainer aria-label="Notification container" />
    </>
  );
}