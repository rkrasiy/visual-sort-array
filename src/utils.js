import {useEffect} from "react"


function getRandomInt(min = 10, max = 500) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillArray(num){
    return Array.from({length: num}, (_, i) => {
        let num = getRandomInt();
        let id = "id" + Math.random().toString(16).slice(2)
        return {id: id, moved: false, number: num}
    });
}

function useBubbleAlgoritm(props){
    console.log("start sorting")
    

    useEffect(() => {
        let isSorted;
        let start = 0;
        let start2 = 0;
		const interval = setInterval(() => {
            let copyList = props.arr
            start++
            let next = copyList[start + 1] || copyList.length;
            if(copyList[start] > copyList[next]){
                let value = copyList[start];
                copyList[next] = value;
                props.updateArr(copyList)
                console.log(copyList)
            }

		}, 1000);

        if(isSorted) clearInterval(interval)

		return () => clearInterval(interval);
	}, []);

    
    //Add setInterval
    //every second sort one element
}

export {
    getRandomInt,
    fillArray,
    useBubbleAlgoritm
}