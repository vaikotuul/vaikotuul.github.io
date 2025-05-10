import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomColors {
  controlPanelBackgroundColor: string;
  controlPanelColor: string;
  controlButtonColor: string;
  controlButtonBackgroundColor: string;
  headerBackgroundColor: string;
  headerColor: string;
}

type RoomColorsState = {
  [roomId: string]: RoomColors;
};

const initialState: RoomColorsState = {};

const roomColorsSlice = createSlice({
  name: 'roomColors',
  initialState,
  reducers: {
    setRoomColor(state, action: PayloadAction<{ roomId: string; key: keyof RoomColors; value: string }>) {
      const { roomId, key, value } = action.payload;
      if (!state[roomId]) {
        state[roomId] = {
          controlPanelBackgroundColor: '#ffffff',
          controlPanelColor: '#000000',
          controlButtonBackgroundColor: '#ffffff',
          controlButtonColor: '#000000',
          headerBackgroundColor: '#ffffff',
          headerColor: '#000000',
        };
      }
      state[roomId][key] = value;
    },
  },
});

export const { setRoomColor } = roomColorsSlice.actions;
export default roomColorsSlice.reducer;