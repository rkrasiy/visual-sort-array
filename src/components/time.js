import { useReducer, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const initialState = {
    isRunning: false,
    time: 0
}

function Time() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const idRef = useRef(0);

    const isRunning = useSelector( state => state.running);
    const currentSorted = useSelector( state => state.sorted);
    
    useEffect( () => {
        if(!state.isRunning){
            return;
        }

        idRef.current = setInterval(()=>dispatch({ type: "tick" }), 100);

        return () => {
            clearInterval(idRef.current);
            idRef.current = 0;
        }

    }, [state.isRunning, isRunning]);


    if(isRunning){
        state.isRunning = true
    }else if( currentSorted.length && !isRunning){
        state.isRunning = false;
    }else {
        state.isRunning = false;
        state.time = 0;
    }


    return (
        <>
            <span className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-slate-400 to-transparent">
                {msToTime(state.time)}s
            </span>
        </>
    )
}

function msToTime( time ) {
    const minuts = Math.floor(time / 600);
    const base = 60 * minuts;
    const seconds =  Math.floor((time / 10) - base)
    const milis = time % 10;


    let view = milis;
    if(seconds > 0)
        view = seconds + "." + view
    if(minuts > 0)
        view = minuts + "." + view
   
    return view
}

function reducer ( state, action ){
    switch (action.type) {
        case "start":
            return { ...state, isRunning: true };
        case "stop":
            return { ...state, isRunning: false };
        case "reset": 
            return { isRunning: false, time: 0 };
        case "tick":
            return { ...state, time: state.time + 1 };
        default:
            throw new Error(); 
    }
}

export default Time;