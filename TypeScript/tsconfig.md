# tsconfig.json

### Contents

{
"include": [
"src"
],
"compilerOptions": {
"outDir": "build",

        "target": TypeScript 파일을 컴파일 할 때 빌드 디렉토리에 생성되는 자바스크리브의version 을 정한다.

        "lib": 미리 선언된 lib의 d.ts 파일을 사용할수 있게 됨
        ex(dom : dom.d.ts 안에 정의된 내용을 사용할수 있게 해줌)

        "strict": 모든 엄격한 타입-체킹 옵션 활성화

        "allowJs" : 컴파일 작업 진행시 JS파일도 포함할수 있는지 설정한다.
    }

}

.d.ts file : typescript로 정의되지 않은 파일을 불러오기 위해 미리 정의해놓는 파일
