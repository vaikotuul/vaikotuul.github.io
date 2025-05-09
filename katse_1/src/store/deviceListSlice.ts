import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Device = {
  id: string;
  name: string;
};

type DevicesState = {
  [roomId: string]: Device[];
};

const initialState: DevicesState = {
  'A-001': [
    { id: 'lights', name: 'Tuled' },
    { id: 'screen', name: 'Ekraan' },
    { id: 'projector', name: 'Projektor' },
  ],
  'A-002': [
    { id: 'lights', name: 'Tuled' },
    { id: 'screen', name: 'Ekraan' },
  ],
  'A-003': [
    { id: 'lights', name: 'Tuled' },
    { id: 'projector', name: 'Projektor' },
  ],
};

const deviceListSlice = createSlice({
  name: 'deviceList',
  initialState,
  reducers: {
    addDevice(state, action: PayloadAction<{ roomId: string; device: Device }>) {
      const { roomId, device } = action.payload;
      if (!state[roomId]) {
        state[roomId] = [];
      }
      state[roomId].push(device);
    },
    removeDevice(state, action: PayloadAction<{ roomId: string; deviceId: string }>) {
      const { roomId, deviceId } = action.payload;
      if (state[roomId]) {
        state[roomId] = state[roomId].filter((device) => device.id !== deviceId);
      }
    },
  },
});

export const { addDevice, removeDevice } = deviceListSlice.actions;
export default deviceListSlice.reducer;