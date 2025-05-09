import React, { useState, useMemo } from 'react';

interface ToiminguLisaminePropTypes {
  onSave: (action: { time: string; room: string; device: string; activity: string }) => void;
  onCancel: () => void;
}

// Defining the room to devices mapping
const roomDevices = {
  'A-001': ['Tuled', 'Ekraan', 'Projektor'],
  'A-002': ['Tuled', 'Ekraan'],
  'A-003': ['Tuled', 'Projektor']
};

function ToiminguLisamine({ onSave, onCancel }: ToiminguLisaminePropTypes) {
  const [timeType, setTimeType] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const rooms = ['A-001', 'A-002', 'A-003'];
  const activities = ['ON', 'OFF'];
  const workdays = ['E', 'T', 'K', 'N', 'R']; // for iga nädal

  // Get available devices based on selected room
  const availableDevices = useMemo(() => {
    if (!selectedRoom) return [];
    return roomDevices[selectedRoom as keyof typeof roomDevices] || [];
  }, [selectedRoom]);

  // Reset selected device when room changes
  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
    setSelectedDevice(null); // Clear the device selection when room changes
  };

  // Calculate min and max date limits
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear - 1}-01-01`; // Allow previous year
  const maxDate = `${currentYear + 100}-12-31`; // Allow up to 100 years in the future

  const handleTimeTypeSelect = (type: string) => {
    setTimeType(type);
    setShowTimePicker(true);
    // Reset selected days when changing time type
    if (type === 'iga nädal') {
      setSelectedDays([]);
    }
  };

  const handleTimeConfirm = () => {
    let formattedTime = '';
    
    if (timeType === 'ühekordne') {
      formattedTime = `Ühekordne ${date} ${time}`;
    } else if (timeType === 'iga nädal') {
      // Format days in order regardless of selection order
      const orderedDays = workdays.filter(day => selectedDays.includes(day));
      formattedTime = `Iga nädal ${orderedDays.join(', ')} ${time}`;
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

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleSave = () => {
    if (selectedTime && selectedRoom && selectedDevice && selectedActivity) {
      onSave({
        time: selectedTime,
        room: selectedRoom,
        device: selectedDevice,
        activity: selectedActivity
      });
    }
  };

  const isFormComplete = selectedTime && selectedRoom && selectedDevice && selectedActivity;
  const isWeekdaySelectionValid = timeType !== 'iga nädal' || (timeType === 'iga nädal' && selectedDays.length > 0);
  const isTimePickerComplete = 
    (timeType === 'ühekordne' && date && time) ||
    (timeType === 'iga nädal' && selectedDays.length > 0 && time) ||
    (timeType === 'iga päev' && time);

  return (
    <div className="container" style={{ paddingTop: 0 }}>
      <button className="back-button" onClick={onCancel} style={{ backgroundColor: '#f44336', color: 'white' }}>
        Tühista
      </button>
      <header>
        <h1>Toimingu lisamine</h1>
      </header>
      <div className="save-button-container">
        {isFormComplete && (
          <button className="save-button" onClick={handleSave} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            Salvesta toiming
          </button>
        )}
      </div>
      
      <div className="action-form">
        <div className="form-table-wrapper">
          <table className="action-table">
            <thead>
              <tr>
                <th className="col-time">Toimumisaeg</th>
                <th className="col-room">Ruum</th>
                <th className="col-device">Seade</th>
                <th className="col-activity">Tegevus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-time">{selectedTime || '-'}</td>
                <td className="col-room">{selectedRoom || '-'}</td>
                <td className="col-device">{selectedDevice || '-'}</td>
                <td className="col-activity">{selectedActivity || '-'}</td>
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
                  <button onClick={() => handleTimeTypeSelect('iga päev')}>Iga päev (E-R)</button>
                </div>
              </button>
            </div>
            
            <div className="button-cell col-room">
              <button className="dropdown-button" data-type="room">
                Ruum
                <div className="dropdown-content">
                  {rooms.map(room => (
                    <button key={room} onClick={() => handleRoomSelect(room)}>
                      {room}
                    </button>
                  ))}
                </div>
              </button>
            </div>
            
            <div className="button-cell col-device">
              <button className={`dropdown-button ${!selectedRoom ? 'disabled-dropdown' : ''}`} data-type="device">
                Seade
                <div className="dropdown-content">
                  {selectedRoom ? (
                    availableDevices.map(device => (
                      <button key={device} onClick={() => setSelectedDevice(device)}>
                        {device}
                      </button>
                    ))
                  ) : (
                    <button disabled>Vali esmalt ruum</button>
                  )}
                </div>
              </button>
            </div>
            
            <div className="button-cell col-activity">
              <button className="dropdown-button" data-type="activity">
                Tegevus
                <div className="dropdown-content">
                  {activities.map(activity => (
                    <button key={activity} onClick={() => setSelectedActivity(activity)}>
                      {activity}
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
                    style={{ width: '140px', minWidth: 'unset', fontSize: '1rem', padding: '4px' }}
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
                  Nädalapäevad:
                  <div className="weekday-checkboxes">
                    {workdays.map(day => (
                      <div key={day} className="weekday-checkbox">
                        <input
                          type="checkbox"
                          id={`day-${day}`}
                          checked={selectedDays.includes(day)}
                          onChange={() => handleDayToggle(day)}
                        />
                        <label htmlFor={`day-${day}`}>{day}</label>
                      </div>
                    ))}
                  </div>
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
              <button 
                onClick={handleTimeConfirm}
                disabled={!isTimePickerComplete}
              >
                Kinnita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToiminguLisamine; 