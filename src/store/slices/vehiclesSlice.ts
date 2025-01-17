import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from '../../types';

interface VehiclesState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string | null;
    type: string | null;
  };
}

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null,
  filters: {
    status: null,
    type: null,
  },
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload);
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
    },
    deleteVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<VehiclesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setVehicles, addVehicle, updateVehicle, deleteVehicle, setFilters } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;