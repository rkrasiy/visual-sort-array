import { useEffect, useState } from "react";
import Logo from "./components/logo";
import Item from "./components/item";
import { fillArray, useBubbleAlgoritm } from "./utils"
import classes from "./app.module.css"
import { ArrayVisualizing } from "./components/array-visualizing";
import Canvas from "./components/canvas";

function App() {
	const [ listLength, setListLength ] = useState(20)
	const [ count, setCount ] = useState(0);
	const [ round, setRound ] = useState(0);
	const [ active, setActive ] = useState(0);
	const [ list, setList] = useState(fillArray(listLength));

	const updateArrayHandler = ()=>{
		setList(fillArray(listLength))
	}
	const changeRangeHandler = (e)=>{
		let value = parseInt(e.target.value)
		setListLength(value);
		setList(fillArray(listLength))
	}


	let timer;
	
	const startHandler = ()=>{
		let index = 0
		let counter = count;
		let controller = false;
		let run = 0
		timer = setInterval(()=>{
			//if(!controller){
				//if(controller) clearInterval(timer)
				
				
				let copyList = [...list]	
				let a = index
				let b = index + 1 >= list.length - 1 ? list.length - 1 : index + 1;
				//console.log(index, copyList[a] , copyList[b])
				
				try{
					if(copyList[a].number > copyList[b].number){
						//console.log(counter, true)
						const max = copyList[a].number;
						const min =  copyList[b].number;
						copyList[a].number = min;
						copyList[b].number = max;
						copyList[b].moved = true;
						copyList[a].moved = false;
						setList([...copyList]);
						controller = false
					
					}
				}catch(e){
					console.log(e)
					console.log("Index: ", index)
					console.log(copyList[a] , copyList[b])
					console.log("Length", listLength)
					console.log("real Length :", list.length);
					console.log("Pos: ", a, b);
					console.log(list)
					clearInterval(timer)
				}
				index++
				counter++
				setActive(index)
				setCount(counter)
				if(index >=  list.length - 1) {
					index = 0;
					run++;
					setRound(run)
					if(controller){
				
						clearInterval(timer)
					}
					controller = true
				}
			//}
			
			
		}, 10)
	}

	const stopInterval = () =>{
		console.log("end sorting")
		clearInterval(timer)
		timer = null
	}

	const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#ddd';
        ctx.beginPath();
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
        ctx.fill();
    }
	//console.log(list)
	return (
		<div className="App">
			<header className="App-header">
				<Logo />
				<button onClick={updateArrayHandler}>New Array</button>
				
				<input type="range" min="5" max="150" onChange={changeRangeHandler} value={listLength} />

				<button onClick={startHandler}>Start</button>
				<button onClick={stopInterval}>stop</button>
			</header>
			<main>
				<p>Array length: {list.length}</p>
				<p>operations:{count}</p>
				<p>runs:{round}</p>
				<Canvas draw={draw}/>
				{/* <ArrayVisualizing items={list}	active={active}/> */}
			</main>
		</div>
	);
}

export default App;
