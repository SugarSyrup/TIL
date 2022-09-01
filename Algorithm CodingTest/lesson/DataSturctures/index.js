var genres = ["classic", "pop", "classic", "classic", "pop"];
var plays = [500, 600, 150, 800, 2500];
var answer = [];
var MyAlbum = {};
for(var i = 0; i < genres.length; i++) {
    if(!MyAlbum[genres[i]]){
        MyAlbum[genres[i]] = [];
    }
    MyAlbum[genres[i]].push({id:i, play:plays[i]});
}

var total = [];
var j = 0;
Object.keys(MyAlbum).forEach((genre) => {
    total.push({index:j++, views:MyAlbum[genre].reduce((prev, cur) => {
        if(typeof(prev) == "number"){
            return prev + cur.play;
        }
        return prev.play + cur.play;
    })});
    MyAlbum[genre].sort((a,b) => {
        return b.play - a.play;
    }).splice(2,MyAlbum[genre].length - 2);
})

total.sort((a,b) => {
    return b.views - a.views;
});

for(var h = 0; h<total.length; h++){
    MyAlbum[Object.keys(MyAlbum)[total[h].index]].forEach((music) => {
        answer.push(music.id);
    });
}

console.log(answer);