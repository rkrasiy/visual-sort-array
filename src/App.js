import { useEffect, useState } from "react";
import Logo from "./components/logo";
import Item from "./components/item";
import { fillArray } from "./utils"
import classes from "./app.module.css"

function App() {
	const [ listLength, setListLength ] = useState(10)
	const [ list, setList] = useState(fillArray(listLength));

	useEffect(()=>{

	})
	
	const updateArrayHandler = ()=>{
		setList(fillArray(listLength))
	}
	const changeRangeHandler = (e)=>{
		setListLength(e.target.value);
		setList(fillArray(listLength))
	}

	const startHandler = ()=>{
		//Add setInterval
		//every second sort one element
	}

	console.log(listLength)
	return (
		<div className="App">
			<header className="App-header">
				<Logo />
				<button onClick={updateArrayHandler}>New Array</button>
				
				<input type="range" min="5" max="150" onChange={changeRangeHandler} value={listLength} />

				<button onClick={startHandler}>Start</button>
			</header>
			<main>
				<div className={classes.wrapper}>
					{
						list.map( el => (
							<Item key={el} value={el} />
						))
					}	
				</div>
				
			</main>
		</div>
	);
}

export default App;
