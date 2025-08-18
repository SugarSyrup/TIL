# CORS

## **브라우저에서 다른 출처의 리소스를 요청할 때 적용되는 보안 정책.**

기본적으로 Same-Origin Policy 때문에 스크립트가 다른 도메인으로 요청을 보내는걸 제한하는데, 서버가 응답 헤더에 `Access-Control-Allow-Origin` 같은 값을 내려주면 특정 출처의 요청을 허용할 수 있게 됨.

브라우저에서 요청을 차단하는 개념 x, 요청은 실제로 나가지만 브라우저에서 응답을 차단하게 됨. 따라서 `Access-Control-Allow-Origin` 응답 헤더를 통해 허용을 할수 있습니다.

## Preflight

HTTP 요청은 단순 요청 (Simple request) / 복잡한 요청 (non-simple request) 로 나뉩니다.

브라우저 보안 정책 (Same-Origin Policy) 때문에

- 단순 요청은 바로 보내고
- 복잡한 요청은 보안 검증을 위해 `Preflight`( 사전요청 ) 을 보냄

### 단순 요청 ( Simple Request )

- 메서드 : GET, POST, HEAD
- 헤더 : 브라우저가 기본 제공하는 안전한 헤더 
(예: `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`이 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`일 때만)

### 복잡한 요청 ( non-simple Request )

- 메서드: **PUT, DELETE, PATCH** 등 단순 요청이 아닌 경우
- 헤더: **커스텀 헤더** 추가 시 (`X-Auth-Token`, `Authorization`, `X-Requested-With` 등)
- Content-Type이 `application/json` 같은 경우

👉 즉, **보안상 민감할 수 있는 요청이면 브라우저가 먼저 서버에게 허락을 맡는 것**입니다.

### Preflight 동작 과정

1. 브라우저가 `OPTIONS` 요청 전송
    - `Origin`: 요청 출처
    - `Access-Control-Request-Method`: 실제 요청에 쓸 메서드
    - `Access-Control-Request-Headers`: 실제 요청에 포함할 커스텀 헤더 목록
2. 서버가 허용 여부 응답
    - `Access-Control-Allow-Origin`: 허용할 도메인
    - `Access-Control-Allow-Methods`: 허용할 메서드
    - `Access-Control-Allow-Headers`: 허용할 헤더
    - `Access-Control-Max-Age`: Preflight 결과를 캐시할 시간
3. 브라우저가 실제 요청 전송

### 브라우저에서 서버로 요청 ~ 응답까지 처리하는 작업

1. 요청 준비 
    - `fetch`, `XMLHttpRequest`, `axios` 같은 API 호출 발생
    - CORS 상황이면 → 필요시? Preflight(OPTIONS) 먼저 전송
2. 캐시 확인
3. 네트워크 계층 처리 ( DNS → TCP Connection → TLS 핸드 셰이크 ) ( 이미 연결돼 있으면 재사용 : Keep-Alive )
4. 응답 대기 & 수신
    - 압축 (gzip, br) 이면 해제
5. 응답 해석
    - 상태 코드 확인
    - 응답 헤더 / 바디 Parsing
6. 보안 검증
    - CORS 정책 적용 : Access-Control-Allow-Origin 확인 ( 허용되지 않으면 JS에서 응답 접근 차단 )
    - CSP, Mixed Content 같은 정책 검사
7. Javascript 로 전달
