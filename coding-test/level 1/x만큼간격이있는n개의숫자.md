# 직사각형 별찍기

## 문제

함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.

[링크](https://school.programmers.co.kr/learn/courses/30/lessons/12954)

출처 : [School_Programemrs](https://school.programmers.co.kr/)

## 코드

**_사용언어 : JavaScript_**

```
function solution(x, n) {
    var answer = [];
    var input = x;
    for(var i = 0; i < n; i++){
        answer[i] = input;
        input += x;
    }
    return answer;
}
```

## 힘들었던 점

-
