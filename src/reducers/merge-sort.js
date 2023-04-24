import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const SET_MERGE = createSlice({
    name: 'merge',
    initialState,
    reducers:{
        setCurrentMerge: (state, { payload }) => {
            return payload;
        }
    }
})

export const { setCurrentMerge } = SET_MERGE.actions;

export default SET_MERGE.reducer;
