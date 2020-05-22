
//1. 전역객체 사용 지양
var myApp = {}

myApp.id = 0;

myApp.next = function(){
    return myApp.id++;
}

myApp.reset = function(){
    myApp.id = 0;
}

//2. 클로저
function makeSandwich(){
    var magicIngredient = "땅콩버터";
    function make(filling){
        return magicIngredient + "  and" + filling;
    }

    return make("젤리");
}

makeSandwich(); //땅콩버터

///////////////////////////////////////////////////
function makeSandwich(){
    var magicIngredient = "땅콩버터";
    function make(filling){
        return magicIngredient + "  and" + filling;
    }

    return make;
}

var func = makeSandwich();
alert(func('바나나')); //땅콩버터 and 바나나
alert(func('젤리')); //땅콩버터 and 젤리
alert(func('마쉬멜로우')); //땅콩버터 and 마쉬멜로우

///////////////////////////////////////////////////
//클로저란 함수 자신이 포함하는 
//스코프의 변수를 추적하는 함수
function makeSandwich(magicIngredient){
    function make(filling){
        return magicIngredient + "  and" + filling;
    }

    return make;
}

var hamAnd = makeSandwich("햄");
hamAnd("치즈"); //햄 and 치즈
hamAnd("머스타드");//햄 and 머스타드

var chikenAnd = makeSandwich("치킨");
chikenAnd("양파"); //치킨 and 양파
chikenAnd("피클");//치킨 and 피클

//////////다음으로 대체가능////////////
function makeSandwich(magicIngredient){
    return function(filling){
        return magicIngredient + "  and" + filling;
    }
}

//정보은닉, 외부 변수를 private변수처럼 사용 가능
//클로저간에 외부변수 공유 가능(참조저장)

function box(){
    var val = undefined;

    return function(filling){
        set = function(newval) { val = newval; },
        get = function() { return val; },
        type = function() { return typeof va;l }
    }
}

var b = box();
b.type();
b.set(98.6);
b.get();
btype(); //number

//3. 변수 호이스팅(Hosting: 끌어올리다)
//암묵적으로 블록 내 정의된 변수 선언을 함수 맨 윗 부분으로 끌어올림(Hoisting)

function f(){
    var a = 10;

    if(1){
        var a = 12;
        alert(a); // ?
    }

    alert(a); // ?
}

function f(){
    for(var i =0, n = 10; i < n; i++){}
    for(var i =0, n = 11; i < n; i++){}
    for(var i =0, n = 12; i < n; i++){}
}
////////////////////////////////////////
function f(){
    var i, n;
    for(i =0, n = 10; i < n; i++){}
    for(i =0, n = 11; i < n; i++){}
    for(i =0, n = 12; i < n; i++){}
}
//혼란을 막기위해 변수 선언을 직접 호이스팅 권고

//4.클로저내 즉시 실행 함수
//각 클로저는 부모변수의 값이 아닌 참조 저장
function wrapElements(a){
    var result = [], i, n;
    for( i = 0, n = a.length; i < n; i++){
        result[i] = function(){
            return a[i];
        }
    }
}

var wrapped = wrapElements([10, 20, 30, 40, 50]);
var f = wrapped[0];
alert(f()); //?

//지역 스코프를 만들기 위해 IIFE사용
//(블록 스코프 지원을 위한 필수적인 차선책)
function wrapElements(a){
    var result = [], i, n;
    for( i = 0, n = a.length; i < n; i++){
       (function(j){
            result[0] = function() { return a[j]; }
       })(i)
    }
    return result;
}

var wrapped = wrapElements([10, 20, 30, 40, 50]);
var f = wrapped[0];
alert(f()); //?