# Dataset

## 문제

backend 에서 db를 통해 불러온 video 객체를 controller를 통해서 정보를 보내고 웹페이지를 구성함 -> 해당 video 객체에 대한 db에 요청할 id가 frontend의 javascript에 필요함?(api를 통해 해당 객체의 정보를 수정하기 위해) -> frontend에서는 해당 정보를 알 방법이 없다...

이전의 프로젝트에서도 해당 문제를 가지고 애먹고 고생한 기억이 있다.. 어떻게 전달해 줘야할지 모르던 그때는 backend에 대한 개념자체가 없이 코딩하던 시절이라 db연동도 처음 해봤었던 때였고, 기억나지않지만 야매로 해결했었던것 같다. (span객체에 넣고 display:none? 했던것 같기도 하고..)

<hr>

## 해결방안

HTML 5 에 새로 추가된 속성 **_"dataset"_** 이다!!

```
<video src="blahblahblah" data-videoId = "_id">
```

위의 방식 처럼 data-\* 의 방식으로 값을 넣을 수 있고

```
const video = document.querySelector('video');
video.dataset.videoId;
```

로 접근 가능하다!

**주의사항**
html코드에 해당 data가 노출된다. 보안에 위험이 있는 코드는 다른 방식...(? 다른 방식은 뭐가 있을까?!) 을 이용하는 것을 고려해 봐야 할 것이다.
