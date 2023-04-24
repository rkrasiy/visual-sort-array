import { createSlice } from '@reduxjs/toolkit';


const initialState = generateArray();

export const SET_ARRAY = createSlice({
    name: 'array',
    initialState,
    reducers:{
        generate: state => {
            const arr =  generateArray()
            return [
                ...arr
            ]
        },
        setArray : (state, { payload }) => {
            return payload;
        }
    }
})

export const { generate, setArray  } = SET_ARRAY.actions;

export default SET_ARRAY.reducer;

function generateArray () {
    const newArr = [];
    for(let i = 0; i < 100; i++){
        const number = Math.floor(Math.random() * (500 - 5 + 1) + 5)
        newArr.push(number)
    }
    return newArr
}