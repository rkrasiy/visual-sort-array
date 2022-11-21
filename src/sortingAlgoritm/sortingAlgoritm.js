 
 export function mergeSort(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    console.log(animations)
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
    console.log(startIdx, endIdx)
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
            animations.push([k, auxilaryArray[j]])
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


export const bubbleSort = (array) => {
    const animations = [];
    if(array.length <= 1) return array;
    const auxilaryArray = array.slice();

    bubbleSortHelper(array, 0, auxilaryArray, animations);
    return animations;
}  

function bubbleSortHelper(
    mainArray,
    startIdx,
    auxilaryArray,
    animations
){
   
    if(mainArray.length == 2 )return
    let sortArray = mainArray.pop();
    bubbleSortHelper(auxilaryArray, startIdx + 1, mainArray, animations);
    doBubble(mainArray, startIdx + 1, auxilaryArray, animations);
}

function doBubble(
    mainArray, 
    startIdx,
    auxilaryArray, 
    animations
){
    console.log(mainArray, auxilaryArray)

    let i = 0;
    let j = auxilaryArray.length - 1;
    while( i <= j - 1){
        animations.push([i,j]);
        animations.push([i,j]);
        if(auxilaryArray[i] <= auxilaryArray[j]){
            animations.push([i, auxilaryArray[i]])
            mainArray[i++] = auxilaryArray[i++];
        }else{
            animations.push([i, auxilaryArray[j]])
            mainArray[i++] = auxilaryArray[j++];
        }
        console.log(i,j)
    }
   
    // for(let i = 0; i < mainArray.length; i++){
        

    //     for(let j = 0; j < mainArray.length; j++){
    //        // console.log(mainArray[j] > mainArray[j+1], mainArray[j], mainArray[j+1])
    //         animations.push([i,j])
    //         animations.push([i,j])
    //         if(mainArray[j] > mainArray[j+1]){

    //             let min = mainArray[j+1];
    //             let max = mainArray[j];
    //                 mainArray[j] = min
    //                 mainArray[j+1] = max
    //             animations.push([i,  mainArray[j]])
    //         }else{
    //             animations.push([i,  mainArray[j]])  
    //         }
    //     }
    // }
   // console.log(mainArray)
}