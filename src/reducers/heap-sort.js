import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const SET_CURRENT_HEAPTHREE = createSlice({
    name: 'heap',
    initialState,
    reducers:{
        setCurrentHeapThree : (state, { payload }) => {
            return payload;
        }
    }
})

export const { setCurrentHeapThree } = SET_CURRENT_HEAPTHREE.actions;

export default SET_CURRENT_HEAPTHREE.reducer;
