import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from './slices/fieldsSlice';
import cropsReducer from './slices/cropsSlice';
import staffReducer from './slices/staffSlice';
import vehiclesReducer from './slices/vehiclesSlice';
import equipmentReducer from './slices/equipmentSlice';
import logsReducer from './slices/logsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
    crops: cropsReducer,
    staff: staffReducer,
    vehicles: vehiclesReducer,
    equipment: equipmentReducer,
    logs: logsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;