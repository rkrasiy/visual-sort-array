import {useEffect, useState} from 'react';
import Logo from '../components/logo';
import * as sortingAlgorithms from '../sortingAlgoritm/sortingAlgoritm';
import classes from "./sorting-visualizer.module.css";

function SortingVisualizer(){
    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength] = useState(100);
    const [animationSpeed_MS, setAnimationSpeed_MS] = useState(2000)

    useEffect(()=>{
       resetArray()
    },[arrayLength])

    const resetArray = () => {
        const newArray = [];
        for(let i = 0; i < arrayLength; i++){
            newArray.push(randomIntFromInteral(5, 650))
        }

        setArray(newArray)
    }

    const mergeSort = () =>{
        const animations = sortingAlgorithms.mergeSort(array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName(classes.bar);
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
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    arrayBars[barOneIdx].innerHTML = newHeight;
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
    const bubbleSort = () =>{
        console.log("bubbleSort");
        const animations = sortingAlgorithms.bubbleSort(array);
        console.log(animations)
    }

	const changeRangeHandler = (e)=>{
        let value = parseInt(e.target.value);
        let speed = 3

        if(value <= 20){
            speed = 3000
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

    return (
  
        <>
          <header className="App-header">
				<Logo />
				<input type="range" min="10" max="300" step="10" onChange={changeRangeHandler} value={arrayLength}/>
                <span>{array.length}</span>
                    <button onClick={mergeSort} className={classes.sortBtn}>merge Sort</button>
                    <button onClick={quickSort} className={classes.sortBtn}>quick Sort</button>
                    <button onClick={heapSort} className={classes.sortBtn}>heap Sort</button>
                    <button onClick={bubbleSort} className={classes.sortBtn}>bubble Sort</button>
			</header>
            <div className={classes.container}>
                {
                    array.map((value, idx)=><div className={classes.bar} key={idx} style={{height: `${value}px`}}>{value}</div>)
                }
            </div>
            <div className={classes.contdos}>
                {
                    array.map((value, idx)=><div key={idx} className={classes.bardos} style={{height: `20px`}}>{idx}</div>)
                }
            </div>
         <button onClick={resetArray} className={classes.btn}>Generate new Array</button>

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