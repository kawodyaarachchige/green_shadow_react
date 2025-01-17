import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Crop } from '../../types';

interface CropsState {
  crops: Crop[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string | null;
    fieldId: string | null;
  };
}

const initialState: CropsState = {
  crops: [],
  loading: false,
  error: null,
  filters: {
    status: null,
    fieldId: null,
  },
};

const cropsSlice = createSlice({
  name: 'crops',
  initialState,
  reducers: {
    setCrops: (state, action: PayloadAction<Crop[]>) => {
      state.crops = action.payload;
    },
    addCrop: (state, action: PayloadAction<Crop>) => {
      state.crops.push(action.payload);
    },
    updateCrop: (state, action: PayloadAction<Crop>) => {
      const index = state.crops.findIndex(crop => crop.id === action.payload.id);
      if (index !== -1) {
        state.crops[index] = action.payload;
      }
    },
    deleteCrop: (state, action: PayloadAction<string>) => {
      state.crops = state.crops.filter(crop => crop.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<CropsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setCrops, addCrop, updateCrop, deleteCrop, setFilters } = cropsSlice.actions;
export default cropsSlice.reducer;