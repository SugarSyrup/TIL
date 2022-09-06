function solution(n, times) {
    var count = 0;
    var arr = times.sort((a,b) => {
        return a - b;
    }).map((a) => {
        return [a,a];
    })
    
    for(var i = 0; i < n; i++) {
        console.log(arr);
        var currentNode = arr.shift();
        count = currentNode[0];
        currentNode[0] = currentNode[0] + currentNode[1];
        
        var leftIndex = 0;
        var rightIndex = arr.length - 1;
        var middleIndex = Math.floor(arr.length / 2);
        
        while (leftIndex < rightIndex) {
            if(arr[leftIndex][0] < currentNode[0] && arr[rightIndex][0] > currentNode[0]){
                console.log(0);
                arr.splice(rightIndex, currentNode);
                break;
            }
            
            if(arr[middleIndex][0] < currentNode[0]){
                console.log(1);
                leftIndex = middleIndex + 1;
            } else {
                console.log(2);
                rightIndex = middleIndex - 1;                
            }

            middleIndex = Math.floor((leftIndex + rightIn dex) / 2);
        }
        console.log(arr);
    }
    return count;
}

console.log(solution(6, [2,8,10]));