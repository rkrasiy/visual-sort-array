function getRandomInt(min = 10, max = 500) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillArray(num){
    let arr = []
    
   for(let i = 0; i < num; i++){
        let founded = false;
        while(!founded){
            let num = getRandomInt();
            if(!arr.includes(num)){
                arr[i] = num;
                founded = true;
            }
        }
   }

   return arr;
}

export {
    getRandomInt,
    fillArray
}