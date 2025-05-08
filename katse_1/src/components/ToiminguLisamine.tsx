import React, { useState } from 'react';
import Tagasi from './Tagasi';

interface ToiminguLisaminePropTypes {
  onSave: (action: { time: string; room: string; device: string }) => void;
  onCancel: () => void;
}

function ToiminguLisamine({ onSave, onCancel }: ToiminguLisaminePropTypes) {
  const [timeType, setTimeType] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');

  const rooms = ['A-001', 'A-002', 'A-003'];
  const devices = ['Ekraan 1', 'Ekraan 2', 'Tuled', 'Projektor'];
  const days = ['E', 'T', 'K', 'N', 'R', 'L', 'P'];

  // Calculate min and max date limits
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear - 1}-01-01`; // Allow previous year
  const maxDate = `${currentYear + 100}-12-31`; // Allow up to 100 years in the future

  const handleTimeTypeSelect = (type: string) => {
    setTimeType(type);
    setShowTimePicker(true);
  };

  const handleTimeConfirm = () => {
    let formattedTime = '';
    
    if (timeType === 'ühekordne') {
      formattedTime = `Ühekordne ${date} ${time}`;
    } else if (timeType === 'iga nädal') {
      formattedTime = `Iga nädal ${day} ${time}`;
    } else if (timeType === 'iga päev') {
      formattedTime = `Iga päev ${time}`;
    }
    
    setSelectedTime(formattedTime);
    setShowTimePicker(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const dateObj = new Date(inputDate);
    
    // Check if date is valid and year is 4 digits
    if (
      !isNaN(dateObj.getTime()) && 
      dateObj.getFullYear() > 1000 && 
      dateObj.getFullYear() < 10000
    ) {
      setDate(inputDate);
    }
  };

  const handleSave = () => {
    if (selectedTime && selectedRoom && selectedDevice) {
      onSave({
        time: selectedTime,
        room: selectedRoom,
        device: selectedDevice
      });
    }
  };

  const isFormComplete = selectedTime && selectedRoom && selectedDevice;

  return (
    <div className="container">
      <header>
        <Tagasi />
        <h1>Toimingu lisamine</h1>
      </header>
      
      <div className="action-form">
        <div className="form-table-wrapper">
          <table className="action-table">
            <thead>
              <tr>
                <th className="col-time">Toimumisaeg</th>
                <th className="col-room">Ruum</th>
                <th className="col-device">Seade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-time">{selectedTime || '-'}</td>
                <td className="col-room">{selectedRoom || '-'}</td>
                <td className="col-device">{selectedDevice || '-'}</td>
              </tr>
            </tbody>
          </table>
          
          <div className="button-row">
            <div className="button-cell col-time">
              <button className="dropdown-button" data-type="time">
                Toimumisaeg
                <div className="dropdown-content">
                  <button onClick={() => handleTimeTypeSelect('ühekordne')}>Ühekordne</button>
                  <button onClick={() => handleTimeTypeSelect('iga nädal')}>Iga nädal</button>
                  <button onClick={() => handleTimeTypeSelect('iga päev')}>Iga päev</button>
                </div>
              </button>
            </div>
            
            <div className="button-cell col-room">
              <button className="dropdown-button" data-type="room">
                Ruum
                <div className="dropdown-content">
                  {rooms.map(room => (
                    <button key={room} onClick={() => setSelectedRoom(room)}>
                      {room}
                    </button>
                  ))}
                </div>
              </button>
            </div>
            
            <div className="button-cell col-device">
              <button className="dropdown-button" data-type="device">
                Seade
                <div className="dropdown-content">
                  {devices.map(device => (
                    <button key={device} onClick={() => setSelectedDevice(device)}>
                      {device}
                    </button>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showTimePicker && (
        <div className="time-picker-modal">
          <div className="time-picker-content">
            <h3>Vali aeg</h3>
            
            {timeType === 'ühekordne' && (
              <>
                <label>
                  Kuupäev:
                  <input 
                    type="date" 
                    value={date} 
                    onChange={handleDateChange} 
                    min={minDate}
                    max={maxDate}
                  />
                </label>
                <label>
                  Kellaaeg:
                  <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                  />
                </label>
              </>
            )}
            
            {timeType === 'iga nädal' && (
              <>
                <label>
                  Nädalapäev:
                  <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Vali päev</option>
                    {days.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Kellaaeg:
                  <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                  />
                </label>
              </>
            )}
            
            {timeType === 'iga päev' && (
              <label>
                Kellaaeg:
                <input 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
            )}
            
            <div className="modal-buttons">
              <button onClick={() => setShowTimePicker(false)}>Tühista</button>
              <button onClick={handleTimeConfirm}>Kinnita</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="form-actions">
        <button className="cancel-button" onClick={onCancel}>
          Tühista
        </button>
        {isFormComplete && (
          <button className="save-button" onClick={handleSave}>
            Salvesta toiming
          </button>
        )}
      </div>
    </div>
  );
}

export default ToiminguLisamine; 