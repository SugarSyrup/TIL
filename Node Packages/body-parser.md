# express-flash

## 개념

client POST request data를 body로 부터 추출, 기존에 조회시 undefined로 표시

_page의 POST requset 를 받고 싶을때 사용했다_

**_[git](https://github.com/RGBboy/express-flash), [npmjs](https://www.npmjs.com/package/express-flash)_**

## 사용법

설정 방법

```
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser().json());
```

```
bodyParser().json(옵션)
```

req.body를 json 형태로 parse 한다.

```
app.use(express.urlencoded( {extended : false } ));
```

false > 기본으로 내장된 querystring 모듈을 사용합니다.
true > 따로 설치가 필요한 qs 모듈을 사용하여 쿼리 스트링을 해석합니다.

여기서 querystring 모듈과 qs 모듈 즉 false/true 의 상세한 차이는?

Nested Object: 중첩 객체 처리의 차이라고 보면된다.
qs library : 중첩 객체를 만드는 것을 허용하고
query-string : 중첩 객체를 허용하지 않는다.

중첩객체란?

예를 들어 특정 객체를 복제해 왔을때 다른 주소를 할당받아 다른 객체인줄 알았지만, 내부 value중 배열이나 오브젝트가 같은 주소를 가르키고 있을때 중첩 객체, Nested Obj 라고 한다.

[l;ink](https://www.npmjs.com/package/body-parser)
[link1](https://medium.com/@chullino/1%EB%B6%84-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%86%8C%EA%B0%9C-body-parser%EB%A5%BC-%EC%86%8C%EA%B0%9C%ED%95%A9%EB%8B%88%EB%8B%A4-%ED%95%98%EC%A7%80%EB%A7%8C-body-parser%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94-bc3cbe0b2fd)
[link2](https://expressjs.com/en/4x/api.html#express-json-middleware)
express.urlencoded([옵션])
