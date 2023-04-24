import { createSlice } from '@reduxjs/toolkit';

export const SET_SWAPPERS = createSlice({
    name: 'swappers',
    initialState: [],
    reducers:{
        setCurrentSwappers : (state, { payload }) => {
            if(payload.length){
                return state.concat(payload)
            }else   
                return []
        }

    }
})

export const { setCurrentSwappers  } = SET_SWAPPERS.actions;
export default SET_SWAPPERS.reducer;