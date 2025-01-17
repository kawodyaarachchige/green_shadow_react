import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Staff } from '../../types';

interface StaffState {
  staff: Staff[];
  loading: boolean;
  error: string | null;
  filters: {
    role: string | null;
    fieldId: string | null;
  };
}

const initialState: StaffState = {
  staff: [],
  loading: false,
  error: null,
  filters: {
    role: null,
    fieldId: null,
  },
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<Staff[]>) => {
      state.staff = action.payload;
    },
    addStaff: (state, action: PayloadAction<Staff>) => {
      state.staff.push(action.payload);
    },
    updateStaff: (state, action: PayloadAction<Staff>) => {
      const index = state.staff.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.staff[index] = action.payload;
      }
    },
    deleteStaff: (state, action: PayloadAction<string>) => {
      state.staff = state.staff.filter(s => s.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<StaffState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setStaff, addStaff, updateStaff, deleteStaff, setFilters } = staffSlice.actions;
export default staffSlice.reducer;