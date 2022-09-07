# Ch14 [BFS, DFS]
Breadth-First Search, Depth-First Search

## BFS(Breadth-First Search)
: 그래프 탐색 알고리즘으로 같은 깊이에 해당하는 정점부터 탐색 하는 알고리즘

### 특징
+ Queue를 이용하여 구현 가능
+ 시작지점에서 가까운 정점부터 탐색
+ V가 정점의 수 E가 간선의 수일때 => O(V+E)

## DFS(Depth-First Search)
: 그래프 탐색 알고리즘으로 최대한 깊은 정점부터 탐색하는 알고리즘

### 특징
+ Stack을 이용하여 구현
+ 시작 정점에서 깊은 것 부터 찾는다
+ V가 정점의 수 E가 간선의 수일때 => O(V+E)