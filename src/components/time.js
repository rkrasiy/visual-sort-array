import { useReducer, useEffect, useRef } from "react";

const initialState = {
    isRunning: false,
    time: 0
}

function Time({timer}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const idRef = useRef(0);

    useEffect( () => {
        if(!state.isRunning){
            return;
        }

        idRef.current = setInterval(()=>dispatch({ type: "tick" }), 1);

        return () => {
            clearInterval(idRef.current);
            idRef.current = 0;
        }

    }, [state.isRunning]);

    if(timer === 'start'){
        state.isRunning = true
    }else if(timer === 'stop'){
        state.isRunning = false;
    }else if(timer === 'reset'){
        state.isRunning = false;
        state.time = 0;
    }


    return (
        <div className="font-mono text-center">
            {msToTime(state.time)}

        </div>
    )
}

function msToTime(s) {
  let ms = s % 258;
  s = (s - ms) / 258;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;

  let mm = mins < 10 ? '0' + mins : mins;
  let ss = secs < 10 ? '0' + secs : secs;
  return mm  + ':' + ss + '.' + ms;
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