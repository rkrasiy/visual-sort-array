import { createSlice } from '@reduxjs/toolkit';

export const SET_SORTED = createSlice({
    name: 'sorted',
    initialState: [],
    reducers:{
        setCurrentSorted: (state, { payload }) => {
            if(payload.length){
                return state.concat(payload)
            }else   
                return []
        }

    }
})

export const { setCurrentSorted } = SET_SORTED.actions;
export default SET_SORTED.reducer;