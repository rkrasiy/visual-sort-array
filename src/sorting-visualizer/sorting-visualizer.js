import {useEffect, useState} from 'react';
import Logo from '../components/logo';
import * as sortingAlgorithms from '../sortingAlgoritm/sortingAlgoritm';

function SortingVisualizer(){
    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength] = useState(100);
    const [animationSpeed_MS, setAnimationSpeed_MS] = useState(3)
    const [isSorted, setIsSorted] = useState(false);

    useEffect(()=>{
       resetArray()
    },[arrayLength])

    const resetArray = () => {
       const newArray = [];
        for(let i = 0; i < arrayLength; i++){
            newArray.push(randomIntFromInteral(5, 650))
        }

        setIsSorted(false);
        setArray(newArray)
    }

    const mergeSort = () =>{
        const animations = sortingAlgorithms.mergeSort(array);
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
                },i * animationSpeed_MS)
            }else{
                setTimeout(()=>{
                    const [barOneIdx, newHeight, barTwoIdx, oldHeight] = animations[i];
                    console.log(animations[i])
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if(barTwoIdx){
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        barTwoStyle.height = `${oldHeight}px`;
                    }
                    //arrayBars[barOneIdx].innerHTML = newHeight;
                }, i * animationSpeed_MS)
            }
            if(i ===  animations.length - 1){
                setTimeout(()=>{
                   setIsSorted(true)
                }, i * animationSpeed_MS)
            }
        }
    }

    const quickSort = () =>{
        console.log("quickSort")
    }
    const heapSort = () =>{
        console.log("heapSort")
    }
    // const bubbleSort = () =>{
    //     console.log("bubbleSort");
    //     const animations = sortingAlgorithms.bubbleSort(array);
    //     console.log(animations);
    //     let round = 2;
    //      for(let i = 0; i < animations.length; i++){
    //         const arrayBars = document.getElementsByClassName("bar")
    //        // const isColorChange = i % 3 !== 2;
          
    //         if(animations[i].length > 0) {
    //             if(animations[i].length <= 3){
    //                 const [barOneIdx, barTwoIdx] = animations[i];
    //                 if(typeof barOneIdx === "boolean") {
    //                     setTimeout(()=>{
    //                         arrayBars[barTwoIdx].style.backgroundColor = "pink"
    //                     },i * animationSpeed_MS)
    //                 }else{
    //                   //  console.log(animations[i])
    //                     const barOneStyle = arrayBars[barOneIdx].style;
    //                     const barTwoStyle = arrayBars[barTwoIdx].style;
                      
    //                     setTimeout(()=>{
    //                         barOneStyle.backgroundColor = "turquoise";
    //                         barTwoStyle.backgroundColor = "turquoise";
    //                     },i * animationSpeed_MS)
                       
    //                 }
    //             }else{                  
    //                 setTimeout(()=>{
    //                     const [barOneIdx, barTwoIdx ] = animations[i - 1];
    //                     const valueMin = animations[i][barOneIdx];//98
    //                     const valueMax = animations[i][barTwoIdx];//99
    //                  //   console.log(valueMax, valueMin,  animations[i - 1],  animations[i])
    //                     const barOneStyle = arrayBars[barOneIdx].style;
    //                     const barTwoStyle = arrayBars[barTwoIdx].style;
                      
    //                     barOneStyle.height = valueMin + "px";
    //                     barTwoStyle.height = valueMax + "px";
    //                     barOneStyle.backgroundColor = "turquoise";
    //                     barTwoStyle.backgroundColor = "red";
    //                 },i * animationSpeed_MS)
    //             }
    //         }
    //     }
        
    // }
    const bubbleSort = () => {
        const animations = sortingAlgorithms.bubbleSort(array, (newArr)=>setArray(newArr));
       // console.log(animations)
    }

	const changeRangeHandler = (e)=>{
        let value = parseInt(e.target.value);
        let speed = 3

        if(value <= 20){
            speed = 300
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
        //resetArray()
	}
    const classes = isSorted ? "sorted bar" : "bar"
    return (
  
        <>
          <header className="App-header">
				<Logo />
				<input type="range" min="10" max="300" step="10" onChange={changeRangeHandler} value={arrayLength}/>
                <span>{array.length}</span>
                    <button onClick={mergeSort} className="sortBtn">merge Sort</button>
                    <button onClick={quickSort} className="sortBtn">quick Sort</button>
                    <button onClick={heapSort} className="sortBtn">heap Sort</button>
                    <button onClick={bubbleSort} className="sortBtn">bubble Sort</button>
			</header>
            <div className="container">
                {
                    array.map((value, idx)=><div className={classes} key={idx} style={{height: `${value}px`}}>{value}</div>)
                }
            </div>
         <button onClick={resetArray} className="btn">Generate new Array</button>

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