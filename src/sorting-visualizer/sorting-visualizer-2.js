import { useEffect, useState } from 'react';
import Logo from '../components/logo';
import * as sortingAlgorithms from '../sortingAlgoritm/sortingAlgoritm';

function SortingVisualizer2(){
    const [ array, setArray ] = useState([]);
    const [ arrayLength, setArrayLength ] = useState(200);
    const [ animationSpeed_MS, setAnimationSpeed_MS ] = useState(3)
    const [ isSorted, setIsSorted ] = useState(false);
    const [ method, setMethod ] = useState( "Merge" );
    const [ isRunning, setIsRunning ] = useState(false);

    // const [ controller, setController ] = useState({
    //     isSorted: false,
    //     isRunning: false,
    //     isFinished: false,
    //     method: "mergeSort"
    // })

    useEffect(()=>{
       resetArray()
    },[ arrayLength ])
   

    const resetArray = () => {
      //  if(isRunning ) return;
        const newArray = [];
        for(let i = 0; i < arrayLength; i++){
            newArray.push(randomIntFromInteral(5, 650))
        }

        setIsSorted(false);
        setArray(newArray)
    }

    const selectMethodHandler = ( foo ) => {
      //  if(isRunning) return;
        setMethod(foo)
    }

    const startHandler = () => {
        //if(isRunning) return;

        //setIsRunning(true)
        if(method === "Merge"){
            mergeSortMethod(array);
        }
        else if(method === "Bubble") 
            sortingAlgorithms.bubbleSort(array, (newArr)=>setArray(newArr));
    }

    const mergeSortMethod = (arr) => {
        const animations = sortingAlgorithms.mergeSort(arr);
    
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName("bar")
            const isColorChange = i % 3 !== 2;
          
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(()=>{
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * animationSpeed_MS)
            }else{
                setTimeout(()=>{
                    const [barOneIdx, newHeight, barTwoIdx, oldHeight] = animations[i];
    
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if(barTwoIdx){
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        barTwoStyle.height = `${oldHeight}px`;
                    }
           
                }, i * animationSpeed_MS)
            }
            if(i ===  animations.length - 1){
                setTimeout(()=>{
                   setIsSorted(true)
                  // setIsRunning(false)
                }, i * animationSpeed_MS)
            }
        }
    }

	const changeRangeHandler = (e)=>{
       // if(isRunning) return;
        let value = parseInt(e.target.value);
        let speed = 3

        if(value <= 20){
            speed = 30
        }else if(value <= 50){
            speed = 15
        }else if(value <= 100){
            speed = 12
        }else if(value < 150){
            speed = 9
        }else if(value < 200){
            speed = 6
        }else if(value <= 250){
            speed = 3
        }

        setAnimationSpeed_MS(speed)
        setArrayLength(value)
	}

    return (
        <>
            <header>
                <Logo />
                <section>
                    <div>
                        <h4>Array length</h4>
                        <input type="range" min="10" max="300" step="10" onChange={changeRangeHandler} value={arrayLength}/>
                        <span>{array.length}</span>
                    </div>
                    <div>
                        <h4>Methods</h4>
                        {
                            [
                                "Merge",
                                "Bubble"
                            ].map( item => (
                                 <button key={item}
                                    onClick={() => selectMethodHandler(item)} 
                                    className={`btn sortBtn ${item === method ? "active" : ""} ${isRunning ? "disabled" : ""}`}>
                                        {item}
                                    </button>
                            ))
                        }
                    </div>
                    <div>
                        <h4>New Array</h4>
                        <button onClick={resetArray} className={`btn ${isRunning ? "disabled" : ""}`}>Generate</button>
                    </div>
                </section>
			</header>

            <button onClick={startHandler} className={`btn btn-run ${isRunning || isSorted ? "disabled" : ""}`}>START</button>
            
            <div className="container">
                {
                    array.map((value, idx)=>(
                        <div className={`bar ${isSorted ? "sorted" : ""}`} 
                            key={idx} 
                            style={
                                { height: `${value}px` }
                            }></div>
                    ))
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

export default SortingVisualizer2