import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Field } from '../../types';

interface FieldsState {
  fields: Field[];
  loading: boolean;
  error: string | null;
}

const initialState: FieldsState = {
  fields: [],
  loading: false,
  error: null,
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    setFields: (state, action: PayloadAction<Field[]>) => {
      state.fields = action.payload;
    },
    addField: (state, action: PayloadAction<Field>) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<Field>) => {
      const index = state.fields.findIndex(field => field.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = action.payload;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(field => field.id !== action.payload);
    },
  },
});

export const { setFields, addField, updateField, deleteField } = fieldsSlice.actions;
export default fieldsSlice.reducer;