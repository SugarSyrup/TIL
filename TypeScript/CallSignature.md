## Call Signatures

프로퍼티로 호출 가능한 것을 설명하려면 객체 타입에 Call Signature을 작성할 수 있습니다.
Call Signatures는 다음과 같이 함수의 매개 변수(parameter)와 반환 타입을 지정합니다.

```
type PizzaFunction = {
pizza: string;
(args: number): boolean;
};

function hello(fn: PizzaFunction) {
console.log(fn.pizza, fn(6));
}
```

# Function Overloads

동일한 이름에 매개 변수와 매개 변수 타입 또는 리턴 타입이 다른 여러 버전의 함수를 만드는 것을 말합니다. TypeScript에서는 오버로드 signatures을 작성하여 "다양한 방식으로 호출할 수 있는 함수"를 지정할 수 있습니다.

```
type Add={
(a:number,b:number):number;
(a:number,b:number,c:number):number;
}

const add:Add=(a,b,c?:number)=>{
return a+b;
}
add(1,2)
add(1,2,3)
```

https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
