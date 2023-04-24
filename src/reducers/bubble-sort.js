import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const SET_CURRENT_BUBBLETWO = createSlice({
    name: 'bubble',
    initialState,
    reducers:{
        setCurrentBubbleTwo: (state, { payload }) => {
            return payload;
        }
    }
})

export const { setCurrentBubbleTwo } = SET_CURRENT_BUBBLETWO.actions;

export default SET_CURRENT_BUBBLETWO.reducer;
