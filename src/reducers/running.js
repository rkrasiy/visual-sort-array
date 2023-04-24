import { createSlice } from '@reduxjs/toolkit';


export const SET_RUNNING = createSlice({
    name: 'running',
    initialState: false,
    reducers:{
        setRunning: (state, { payload }) => {
            return payload;
        }
    }
})

export const { setRunning } = SET_RUNNING.actions;
export default SET_RUNNING.reducer;