import { useState } from 'react';

import RadioInput from '../components/radio-input';
import Time from '../components/time';

import { useSelector, useDispatch } from 'react-redux';
import { generate } from '../reducers/array';
import { setRunning } from '../reducers/running';
import { setCurrentSorted } from '../reducers/sorted';

import bubbleSort from '../algorithms/bubbleSort';
import mergeSort from '../algorithms/mergeSort';
import heapSort from '../algorithms/heapSort';
import quickSort from '../algorithms/quickSort';

function SortingVisualizer(){
    const array = useSelector(state => state.array);
    const isRunning = useSelector( state => state.running);
    const currentSwappers = useSelector( state => state.swappers);
    const currentHeapThree = useSelector( state => state.heap);
    const currentMerge = useSelector(state =>  state.merge);
    const currentQuickTwo = useSelector( state => state.quick);
    const currentBubbleTwo = useSelector( state => state.bubble);
    const pivot = useSelector( state => state.pivot );
    const currentSorted = useSelector( state => state.sorted);
    const dispatch = useDispatch();

    const [ method, setMethod ] = useState('Merge');

    const startSorting = () => {
        if(isRunning || currentSorted.length) return;
        dispatch(setRunning(true))
       
        if(method === 'Merge')  mergeSort(array, dispatch, 10)
        else if(method === 'Bubble') bubbleSort(array, dispatch, 2)
        else if(method === 'Heap') heapSort(array, dispatch, 10)
        else if(method === 'Quick') quickSort(array, dispatch, 10)
    }

    const generateHandler = () => {
        dispatch(generate())
        dispatch(setCurrentSorted([]));
    }

    return (
        <>
            <div className="container max-w-6xl mx-auto mb-2 flex flex-row items-center ">
                <div className='font-mono flex-1'>
                    Elements: {array.length}
                </div>
                    
                <div className='flex-1'>
                    {
                        [
                            "Merge", 
                            "Bubble",
                            "Heap",
                            "Quick"
                        ].map( btn => <RadioInput name={btn} key={btn} isChecked={method} onChange={()=>setMethod(btn)}/>)
                    }
                </div>
                <button onClick={generateHandler} className="px-4 py-2 font-mono bg-sky-500 rounded-md text-white">New Array</button>
			</div>
            <div className="container relative max-w-6xl mx-auto flex flex-row flex-nowrap border rounded-xl justify-between items-end gap-px p-2 h-[70vh]">
                <div className='absolute left-2/4 top-6 -translate-x-2/4 w-full flex flex-col justify-center items-center'>
                    <button 
                        onClick={startSorting}
                        className={` rounded-md px-4 py-2 font-mono ${isRunning || currentSorted.length ? 'bg-sky-200 cursor-not-allowed' : 'bg-sky-500'} text-white`}
                        > {
                            isRunning ? 'Running!':'Start!'
                        }
                    </button>
                    <Time timer={ 
                        isRunning ? 'start' : currentSorted.length && !isRunning ? 'stop' : 'reset'
                     }/>
                </div>
                {
                    array.map((value, index) => {
                        const bg = currentSwappers.includes(index) ?
                                "bg-red-400" : currentBubbleTwo.includes(index) ||
                                    currentQuickTwo.includes(index) || currentHeapThree.includes(index) ||
                                        currentMerge.includes(index) ?
                                            "bg-green-400" : pivot === index ?
                                                "bg-yellow-400" : currentSorted.includes(index) ?
                                                    "bg-violet-400" : "bg-sky-400";
                        return (
                            <div className={`bar flex-grow inline-block min-w-[2px] ${bg}`}
                                key={index} 
                                style={{height: `${value}px`}}>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

function randomIntFromInteral(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function arraysAreEqual(array1, array2){
    if(array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++){
        if(array1[i] !== array2[i]) return false;
    }
    return true;
}

export default SortingVisualizer