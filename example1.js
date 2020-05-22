(function (){

    "use strict";
    
    test = "not definded";
    alert(test);
    
    function testFunc(p1, p1) {};
    
    var eval = 3.14;
    
    eval ("var x = 2");
    alert(x);
    
    var interface = "test";
    
})();


//파일전체 xxx.js 파일 최상단에 정의
"use strict";

//특정함수에 적용
//Non-strict code...

(function(){
    "use strict";
    //Define your library strictly
})();

//Non-strict code...

//1. 세미콜론은 } 토큰 전이나 줄의 마지막
//또는 프로그램의 마지막 전에만 추론되어 삽입

function Point(x,y){
    this.x = || 0
    this.y = || 0
    return this.x * this.y
}

function area(r){ r= +r; return Math.PI * r * r}

function area(r){ r= +r return Math.PI * r * r}

//2. 세미콜론은 다음 토큰이 파싱될 수 없을떄(오류발생)
//에만 추론되어 삽입

function Sum(a,b) { return a + b }

//a = Math.abs(Sum(1,-3));

//CASE 1 => ?
a = Math.abs
(Sum(1,-3));

//CASE 2 => a = b Sum(1,-3)
a = b
Sum(1,-3)


//3. 선언문이 ( [ + - / 로 시작할 때 주의

//CASE 1
a = b["r", "g", "b"].forEach(function(key){
    background[key] = foreground[key] / 2
});

/*
a = b
["r", "g", "b"].forEach(function(key){
    background[key] = foreground[key] / 2
});
*/

//CASE 2
a = b
/Error/i.test(str) && fail();

/*
나눗셈 연산자;;;
a = b / Error/i.test(str) && fail();
*/

//4. 스크립트 번들링시 주의

//파일1.js
(function(){
    //...
})()
//파일2.js
(function(){
    //...
})()
//번들링 후 나 파싱 후
(function(){
    //...
})()
(function(){
    //...
})()

//방어코드 삽입필요
//파일1.js
;(function(){
    //...
})()
//파일2.js
;(function(){
    //...
})()

//5. return, throw, break, continur, ++, --
//바로 뒤에 새로운 행 입력 시 주의

//CASE 1 : return {};
return
{};

//파싱후
return;
{}
;

//CASE2 : ++ 접두어? 접미어?
a
++
b

//파싱후
a;
++b;

//6. 세미콜론은 for반복문의 구분자나
// 빈 선언문으로 절대 삽입 안됨

for(var i = 0; total =1
    i < n
    i++
){
    total *= 1
}