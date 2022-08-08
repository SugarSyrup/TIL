# Mongoose Schema

## 코드

0. mongoose 호출

```
import mongoose from 'mongoose';
```

1. schema 설정
   예시 ~

```
var userSchema = mongoose.Schema({
    username : {type: String, required: true, unique: true, trim: true},
    password : {type: String, required: true, min: 8, trim: true},
    salt : {type:String},
    name : {type: String, required: true },
    birth : {type: Date, required: true },
});
```

trim : 앞뒤 공백 삭제,
unique : 고유 값
type : ~

2. Schema 등록? 후 export

```
var User = mongoose.model('Schema', userSchema);

export default User;
```
