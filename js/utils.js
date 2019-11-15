
function shuffle(arr) {
    var newArrLength = arr.length
    var newArr=[];
    for (i = 0; i < newArrLength; i++) {
        var arrIdx = getRandomInt(0,arr.length-1);
        newArr.push(arr[arrIdx]);
        arr.splice(arrIdx,1);
    }return newArr;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  };