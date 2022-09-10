/* Javascript 샘플 코드 */


var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1390802/AgriFood/MzenFoodCode/getKoreanFoodList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'u6RcVsFR208vg2Vldw7UE%2BYn7T0GztD1MT%2FuY%2FMwo1Ya5uYcWCqFBUcoRkVykof%2FN%2BBymKAWQ2P2%2FPNTahz4%2Fg%3D%3D'; /*Service Key*/

/*
queryParams += '&' + encodeURIComponent('Page_No') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('Page_Size') + '=' + encodeURIComponent('30');
queryParams += '&' + encodeURIComponent('food_Group_Code') + '=' + encodeURIComponent('06');
queryParams += '&' + encodeURIComponent('food_Name') + '=' + encodeURIComponent('감자'); 
*/

xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');