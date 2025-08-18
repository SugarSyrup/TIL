# 브라우저의 주소창에 주소를입력하고 유저가 화면을 볼 때까지의 과정

## 네트워크 관점

### 주소창에 주소를 입력한 후 데이터를 받기까지의 과정

1. 입력받은 URL Parsing : 프로토콜 / 호스트 / 경로 분리
2. DNS를 통해 URL의 IP 주소 확인 ( 순서 : 브라우저 캐시 → OS 캐시 → router 캐시 → ISP 캐시 → DNS query를 날려 IP를 주소를 가져옴 )
3. TCP connection ( TCP/IP three-way handshake )
    1. 클라이언트 → 서버 : SYN 패킷 ( 연결 요청 )
    2. 서버 → 클라이언트 : SYN/ACK 패킷 ( 연결 할수 있는 포트 응답 )
    3. 클라이언트 → 서버 : ACK 패킷
4. HTTPS?
    - TLS 핸드 셰이크 ( 서버 인증서 교환, 세션키 생성 및 암호화 )
5. HTTP 웹페이지 GET/POST 요청/응답 ( HTML, CSS, JS, 이미지등 리소스 반환 )

### http cache

브라우저가 리소스를 로컬에 저장해, 다음 요청시 서버와의 통신을 줄이는 방식 ( HTTP 메시지 헤더로 내용이 전달 됨 )

- **Cache-Control : Cache동작을 제어하는 핵심 헤더. 클라이언트(브라우저)와 중간 캐시 서버(CDN, 프록시) 에게 어떻게 캐시할지 지침 전달**
    - `max-age=3600`, `no-cache`, `no-store` 등.
- **ETag : 리소스 버전 식별자, 캐시된 리소스와 현재 리소스에 차이가 있는지 확인하는 장치 (버전 태그)**
    - 보통 해시 값이나, 고유 문자열을 서버가 발급
    - 이후 클라이언트가 요청시 `If-None-Match` 헤더에 ETag값을 보내면, 서버가 비교후
        - 같으면 : `304 NOT Modified` ( 캐시 사용 )
        - 다르면 : 새 리소스 전송 (200 OK)
- **Last-Modified : 리소스가 마지막으로 변경된 시각**
    - 클라이언트는 이후 요청시 If-Modified-Since 헤더로 보내서 검증
        - 리소스 변경 없음 → `304 NOT Modified`
        - 변경됨 → 새 리소스 전송

ETag나 Last-Modified 의 동작은, 서버 리소스 요청에따른 백엔드에서 Response설정만 한다면, 브라우저에서 자동으로 캐싱할지 요청할지를 처리하게 됨.

## 렌더링 관점

### CRP(Critical Rendering Path란?

HTML, CSS, JS를 네트워크에서 받아 **화면에 픽셀로 그리기까지의 전체 과정**

1. HTML 파싱 → **DOM Tree** 생성 ( script 태그를 만나면 파싱 일시 중단/ 스크립트 로드 실행 후 진행 )
2. CSS 파싱 → **CSSOM Tree** 생성 ( CSS 는 상속과 덮어쓰기가 가능하기 때문 + CSSOM 없이 Render Tree 를 생성할수 없기 떄문에 CSS 전체가 수신되고 처리될 때 까지 페이지 렌더링을 막는다 )
3. 두 트리를 합쳐 **Render Tree** 생성 ( 페이지에서 최종적으로 렌더링할 내용을 나타내는 Tree / 보여지는 node만 캡처한다 : display none 은 제외 )
4. **Layout(Reflow)** → Render Tree 기반으로 각 요소의 위치와 크기 계산  뷰포트 크기, 폰트 크기, 상대단위 등 반영 (공간 배치 단계 )
5. **Paint(Repaint)** → 픽셀로 채색 (load시 전체 화면을 그리고, 이후에 브라우저가 필요한 최소 영역만 다시 그리도록 최적화 )
6. **Composite** → 여러 레이어 결합, 최종 화면 출력 GPU에서

### CRP 과정속 에서 최적화 할수 있는 방안

- Reflow / Repaint 최소화
- js `script` 태그와 CSS `link` 태그의 `attributes` 활용하여 렌더링 차단 최소화\
- CSS `will-change` 활용
    - 해당 요소를 미리 Composite 단계에 올려서, 이후에 변화가 생기더라도 Reflow/Repaint없이 Composite단계에서 처리
    - 렌더링 비용을 줄이고 성능을 올릴 수 있음

### reflow와 repaint

- reflow
    - 요소의 위치,크기 변경 시 레이아웃 재계산
    - 비용이 높음 ( 계산 → 배치 → 렌더링 재시작 )
    - ex) width 변경, DOM 추가/삭제
- repaint
    - 색상, 배경등 시각적인 속성만 변경
    - 상대적으로 낮음
    - bgCoor

- 최적화 팁
    - `transform`, `opacity` 변경 활용 → Reflow 없이 Repaint만 발생 (CPU → GPU 활용 / 상대적으로 Layout과정까지 하지 않아서 가벼움 )
    

### DOM Tree 와 Render Tree

- **DOM Tree**
    - HTML 문서를 계층 구조로 표현한 객체 모델.
    - HTML 태그, 속성, 텍스트 노드 포함.
- **CSSOM Tree**
    - CSS 규칙들을 브라우저가 이해하는 트리 구조.
- **Render Tree**
    - DOM + CSSOM 결합.
    - 실제 렌더링에 필요한 요소만 포함(예: `display: none`은 제외).
    - Render Tree → Layout → Paint 과정 수행.

### 강제 동기 레이아웃

브라우저가 **아직 계산하지 않아도 되는 레이아웃(Layout)**을 **프론트엔드 코드 때문에 강제로 즉시 계산해야 하는 상황**에 발생하는 성능 문제 ( 레이아웃을 다 처리되지 않은 상태에서 JS에서 레이아웃을 읽었을 때 )

<aside>

레이아웃 쓰레싱

강제 동기 레이아웃이 짧은 시간에 반복적으로 발생해서 브라우저의 성능 저하 현상

```tsx
for (let i = 0; i < 100; i++) {
	element.style.height = element.offsetHeight + 1 + 'px';
}
```

위 예제 코드 처럼, 레이아웃 변경 요청후 곧바로 레이아웃을 읽으려고 하면? 처리되지 않은 레이아웃을 읽었기 때문에 죽시 계산을 실행하게 됩니다.

쓰기 → 읽기 → 쓰기 → 읽기 를 통해 Layout → Paint를 짧은 주기에서 계속 실행 하다 쓰레싱이됨 (애니메이션 쓰레싱 )

</aside>

### 강제 동기 레이아웃 최적화 방안

- requestAnimationFrame 활용하기
- 애니메이션은 `transform` 과 `opacity`를 활용해서 layout 건드리지 않고 repaint만 발생