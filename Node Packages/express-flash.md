# express-flash

## 개념

Express Server에 편리하게 Flash Message를 추가 할수 있는 패키지

```
npm i express-flash
```

**_[git](https://github.com/RGBboy/express-flash), [npmjs](https://www.npmjs.com/package/express-flash)_**

## 사용법

설정

```
import flash from 'express-flash';

const app = express();
app.use(flash());
```

위의 설정을 express에 하면 `req.flash("메세지 종류", "메세지")` 의 문법으로 사용할수 있다.

Controller에서 flash를 사용하면, `locals.messages.메세지종류 = 메세지` 의 형식으로 저장되어 flash Message 에 접근 할수 있다.
