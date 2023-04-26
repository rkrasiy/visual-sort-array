import Time from "./components/time";
import { useState } from 'react';

import CheckButton from './components/check-button';

import { useSelector, useDispatch } from 'react-redux';
import { generate } from './reducers/array';
import { setRunning } from './reducers/running';
import { setCurrentSorted } from './reducers/sorted';

import bubbleSort from './algorithms/bubbleSort';
import mergeSort from './algorithms/mergeSort';
import heapSort from './algorithms/heapSort';
import quickSort from './algorithms/quickSort';
import Logo from "./components/logo";

function App() {
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
        else if(method === 'Bubble') bubbleSort(array, dispatch, 10)
        else if(method === 'Heap') heapSort(array, dispatch, 10)
        else if(method === 'Quick') quickSort(array, dispatch, 10)
    }

    const generateHandler = () => {
		if(isRunning) return;
		
		dispatch(generate())
		dispatch(setCurrentSorted([]));
    }

	const methodHandler = ( name )=>{
		if(isRunning) return;
		setMethod(name)
	}

    return (
       <div className="h-screen w-screen flex flex-col items-center justify-center">
	   		<div className="absolute top-0 left-0">
				<Logo />
			</div>
            <div className="container max-w-6xl mx-auto mb-2 flex flex-row items-end">
                <div className={`flex-1 ${isRunning && 'opacity-70 pointer-events-none cursor-not-allowed'}`}>
					<p className="text-2xl uppercase font-extrabold -tracking-wider text-slate-300">Sorting Algorithms</p>
                    {
                        [
                            "Merge", 
                            "Bubble",
                            "Heap",
                            "Quick"
                        ].map( btn => <CheckButton name={btn} key={btn} isChecked={method} onChange={()=>methodHandler(btn)}/>)
                    }
                </div>
				<Time />
			</div>
            <div className="container relative max-w-6xl mx-auto flex flex-row flex-nowrap justify-between items-end gap-px p-2 h-[70vh]">
                <div className='absolute left-2/4 top-0 -translate-x-2/4 w-full flex flex-col justify-center items-center'>
					<span className="self-start px-2 text-xs text-violet-600"> Elements: {array.length}</span>
                    { 
						!isRunning && !currentSorted.length
							? 	<button onClick={startSorting}
									className="rounded-md  px-4 py-2 uppercase hover:bg-violet-200 font-bold tracking-wider bg-violet-100 text-violet-600"
								>Start!</button>
								: !isRunning && currentSorted.length 
									? 	
										<button onClick={generateHandler} 
											className="rounded-md hover:bg-violet-200 px-4 py-2 uppercase font-bold tracking-wider bg-violet-100 text-violet-600"
										>Generate new array</button> 
									: null
					}
                </div>
                {
                    array.map((value, index) => {
                        const bg = currentSwappers.includes(index) ?
                                "bg-fuschia-300" : currentBubbleTwo.includes(index) ||
                                    currentQuickTwo.includes(index) || currentHeapThree.includes(index) ||
                                        currentMerge.includes(index) ?
                                            "bg-green-300" : pivot === index ?
                                                "bg-amber-300" : currentSorted.includes(index) ?
                                                    "bg-violet-300" : "bg-gray-300";
                        return (
                            <div className={`bar flex-grow inline-block min-w-[2px] ${bg}`}
                                key={index} 
                                style={{height: `${value}px`}}>
                            </div>
                        )
                    })
                }
            </div>
		</div>
	);
}

export default App;
