import { createSlice } from '@reduxjs/toolkit';


const initialState = null;

export const SET_PIVOT = createSlice({
    name: 'pivot',
    initialState,
    reducers:{
        setPivot  : (state, { payload }) => {
            return payload;
        }
    }
})

export const { setPivot  } = SET_PIVOT.actions;

export default SET_PIVOT.reducer;
