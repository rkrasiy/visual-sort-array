import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const SET_CURRENT_QUICKTWO = createSlice({
    name: 'quick',
    initialState,
    reducers:{
        setCurrentQuickTwo : (state, { payload }) => {
            return payload;
        }
    }
})

export const { setCurrentQuickTwo } = SET_CURRENT_QUICKTWO.actions;

export default SET_CURRENT_QUICKTWO.reducer;
