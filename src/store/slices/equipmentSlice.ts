import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Equipment } from '../../types';

interface EquipmentState {
  equipment: Equipment[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string | null;
    type: string | null;
  };
}

const initialState: EquipmentState = {
  equipment: [],
  loading: false,
  error: null,
  filters: {
    status: null,
    type: null,
  },
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipment: (state, action: PayloadAction<Equipment[]>) => {
      state.equipment = action.payload;
    },
    addEquipment: (state, action: PayloadAction<Equipment>) => {
      state.equipment.push(action.payload);
    },
    updateEquipment: (state, action: PayloadAction<Equipment>) => {
      const index = state.equipment.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.equipment[index] = action.payload;
      }
    },
    deleteEquipment: (state, action: PayloadAction<string>) => {
      state.equipment = state.equipment.filter(e => e.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<EquipmentState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setEquipment, addEquipment, updateEquipment, deleteEquipment, setFilters } = equipmentSlice.actions;
export default equipmentSlice.reducer;