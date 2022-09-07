class MyGraph {
    constructor(n) {
        this.graph = new Array(n);
        this.graph.forEach((element) => element = new Array(n));
    }

    insertEdge(x, y) {
        this.graph[x][y] = true;
        this.graph[y][x] = true;
    }

    farElement(n, count){
        var queue = new Array(this.graph.length);
        queue.forEach((element) => element = new Set());
        for(var i = 0; i<n;i++){
            if(this.graph[n][i]){
                this.graph[n][i] = false;
                queue[count].add(i);
            }
        }
    }
}

function solution(n, edge) {
    var mygraph = new MyGraph(n);
    edge.forEach((element) => mygraph.insertEdge(element[0], element[1]));

}