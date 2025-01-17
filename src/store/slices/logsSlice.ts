import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log } from '../../types';

interface LogsState {
  logs: Log[];
  loading: boolean;
  error: string | null;
  filters: {
    type: string | null;
    fieldId: string | null;
    startDate: string | null;
    endDate: string | null;
  };
}

const initialState: LogsState = {
  logs: [],
  loading: false,
  error: null,
  filters: {
    type: null,
    fieldId: null,
    startDate: null,
    endDate: null,
  },
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<Log[]>) => {
      state.logs = action.payload;
    },
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload);
    },
    updateLog: (state, action: PayloadAction<Log>) => {
      const index = state.logs.findIndex(log => log.id === action.payload.id);
      if (index !== -1) {
        state.logs[index] = action.payload;
      }
    },
    deleteLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter(log => log.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<LogsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setLogs, addLog, updateLog, deleteLog, setFilters } = logsSlice.actions;
export default logsSlice.reducer;