 export function mergeSort(array) {
    const animations = [];
   
    if(array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxilaryArray,
    animations
){
    if(startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxilaryArray,
    animations
){
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while( i <= middleIdx && j <= endIdx){
        animations.push([i,j]);
        animations.push([i,j]);
        if(auxilaryArray[i] <= auxilaryArray[j]){
            animations.push([k, auxilaryArray[i]])
            mainArray[k++] = auxilaryArray[i++];
        }else{
            animations.push([k, auxilaryArray[j], j, auxilaryArray[i]])
            mainArray[k++] = auxilaryArray[j++];
        }
    }
    while( i<= middleIdx){
        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
    }
    while( j<= endIdx){
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
    }
}

export function bubbleSort(stateArray, updateArray) {
    let array = stateArray.slice(0),
        toDispatch = [],
        sorted = false,
        round = 0;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < array.length - 1 - round; i++) {
            toDispatch.push([i, i + 1]);
            if (array[i] > array[i + 1]) {
                toDispatch.push([i, i + 1, true]);
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                sorted = false;
                toDispatch.push(array.slice(0));
                toDispatch.push([]);
            }
        }
        toDispatch.push([true, array.length - 1 - round]);
        round++;
    }
    handleDispatch(toDispatch, array, updateArray);
    return array;
}

function handleDispatch(toDispatch, array, updateArray) {
    const arrayBars = document.getElementsByClassName("bar")
    
    const setCurrentSwappers = (arr)=>{
        const [ one, two, doChange = false ] = arr;
        // arrayBars[one].style.backgroundColor = "red";
        // arrayBars[two].style.backgroundColor = "red";
        if(doChange){
            // arrayBars[one].classList.add("sort-max");
            // arrayBars[two].classList.add("sort-min");
        }
        // arrayBars[one].style.height = "red" + "px";
        // arrayBars[two].style.height = "turquoise" + "px";
    }
    
    const setCurrentSorted = (val)=>{
       // console.log('setCurrentSorted', val)
    }

    const setCurrentBubbleTwo = ( arr )=>{
       // console.log('setCurrentBubbleTwo', arr)
        const [ one, two ] = arr;
        if(one && two){
            arrayBars[one].style.backgroundColor = "turquoise";
            arrayBars[two].style.backgroundColor = "turquoise";
        }
    }

    if (!toDispatch.length) {
        setCurrentBubbleTwo(array.map((num, index) => index))
        setTimeout(() => {
            setCurrentBubbleTwo([])
            setCurrentSorted(array.map((num, index) => index))
           //setRunning(false)
        }, 2);
        return;
    }

    let dispatchFunction = toDispatch[0].length > 3 
    ? updateArray 
    : toDispatch[0].length === 3 || toDispatch[0].length === 0 
    ? setCurrentSwappers 
    : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" 
    ? setCurrentSorted 
    : setCurrentBubbleTwo;

    //dispatch(dispatchFunction(toDispatch.shift()));
    dispatchFunction(toDispatch.shift())
    
    setTimeout(() => {
        handleDispatch(toDispatch, array, updateArray);
    }, 2);
}   
