import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DeviceState = {
  [roomId: string]: {
    [deviceId: string]: boolean;
  };
};

const initialState: DeviceState = {};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDeviceState(
      state,
      action: PayloadAction<{
        roomId: string;
        deviceId: string;
        state: boolean;
      }>
    ) {
      const { roomId, deviceId, state: deviceState } = action.payload;
      if (!state[roomId]) {
        state[roomId] = {};
      }
      state[roomId][deviceId] = deviceState;
    },
  },
});

export const { setDeviceState } = deviceSlice.actions;
export default deviceSlice.reducer;