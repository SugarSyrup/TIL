# Mongoose MongoDB 연결하기

## 코드

0. mongoose 설치

```
npm i mongoose
```

1. mongoose 호출

```
import mongoose from "mongoose";
```

2. mongoose - mongo connect

```
mongoose.connect('mongodb://localhost:27017/ProjectFood');

const db = mongoose.connection;
```

3. db event 설정

```
const handleOpen = () => {console.log("Connect to DB");}
const handleErr = (err) => {console.log("Database Error : ", err);}

db.on("error",handleErr);
db.once("open", handleOpen);
```
