import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ControlPanelPosition = {
  roomId: string;
  deviceId: string;
  position: { x: number; y: number };
};

type ControlPanelState = {
  [roomId: string]: {
    [deviceId: string]: { x: number; y: number };
  };
};

const initialState: ControlPanelState = {};

const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState,
  reducers: {
    setPosition(
      state,
      action: PayloadAction<ControlPanelPosition>
    ) {
      const { roomId, deviceId, position } = action.payload;
      if (!state[roomId]) {
        state[roomId] = {};
      }
      state[roomId][deviceId] = position;
    },
  },
});

export const { setPosition } = controlPanelSlice.actions;
export default controlPanelSlice.reducer;