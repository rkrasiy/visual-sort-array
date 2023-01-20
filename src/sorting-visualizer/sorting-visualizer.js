import {useEffect, useState} from 'react';
import Logo from '../components/logo';
import * as sortingAlgorithms from '../sortingAlgoritm/sortingAlgoritm';

function SortingVisualizer(){
    const [array, setArray] = useState([]);
    const [arrayLength, setArrayLength] = useState(100);
    const [animationSpeed_MS, setAnimationSpeed_MS] = useState(3)
    const [isSorted, setIsSorted] = useState(false);
    const [ isRunning, setIsRunning] = useState(false);

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
                   // console.log(animations[i])
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

    const bubbleSort = () => {
        const animations = sortingAlgorithms.bubbleSort(array, (newArr)=>setArray(newArr));
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
                                { name: "Merge", func: mergeSort }, 
                                { name: "Buble", func: bubbleSort }
                            ].map( btn => (
                                <button 
                                    key = { btn.name } 
                                    onClick = { btn.func } 
                                    className = "btn sortBtn">
                                        { btn.name }
                                    </button>
                            ))
                        }
                    </div>
                    <div>
                        <h4>New Array</h4>
                        <button onClick={resetArray} className="btn green">Generate</button>
                    </div>
                </section>
			</header>
            <div className="container">
                {
                    array.map((value, idx)=><div className={classes} key={idx} style={{height: `${value}px`}}></div>)
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