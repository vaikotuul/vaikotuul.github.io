import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import controlPanelReducer from './controlPanelSlice';
import deviceListSliceReducer from './deviceListSlice';

// Import your reducers here (example: roomReducer)
// import roomReducer from '../features/room/roomSlice';

const store = configureStore({
  reducer: {
    devices: deviceReducer,
    controlPanel: controlPanelReducer,
    deviceList: deviceListSliceReducer,
  },
});

// Export the store
export default store;

// Export RootState and AppDispatch types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;