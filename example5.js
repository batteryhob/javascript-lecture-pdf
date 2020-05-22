var dict = { alice: 34, bob: 24, chris: 62 };
var people = [];
for(var name in dict){
    people.push(name + ":" + dict[name]);
}
people; //["alice:34", "bob:34", "chris:62"]

//사용자 정의 Dictionary 생성
function UserDict() {}
UserDict.prototype.count = function(){
    var i = 0;
    for(var name in this){
        i++;
    }
    return i;
}
UserDict.prototype.toString = function(){
    return "[object UserDict]";
}

var ud = new UserDict();
ud.alice = 34;
ud.bob = 24;
ud.chris = 62;
ud.count(); //?

/////////Object.prototype에 property 추가 지양/////////////
Object.prototype.getUpper = function(key){
    return this[key].toUpperCase();
}
people; //["alice: 34", "bob: 24", "chris: 62", "getUpper = funcion..." ]


////////Array.prototype에 property 추가 지양////////////////
Array.prototype.first = function(){
    return this[0];
}


////////////////////////////////////////////////////////////

//1)
//Object.Prototype에 property 추가
Object.prototype.getUpper = function(key){
    return this[key].toUpperCase();
}

//Prototype이 비어있는 객체 생성
var dict = Object.create(null);
Object.getPrototypeOf(dict) === null; //true

dict.alice = 34;
dict.bob = 24;
dict.chris = 64;

var people = [];
for(var name in dict){
    people.push(name + ": " + dict[name]);
}

console.log(people); //["alice: 34", "bob: 24", "chris: 62"]

//2)
Object.prototype.allKeys = function(){
    var result = [];
    for(var key in this){
        result.push(key);
    }
    return result;
}; //<-- 세미콜론 삭제시?

({alice: 34, bob: 24, chris:62 }).allKeys(); //?

Object.defineProperty(Object.prototype, "allKeys",{
    value: function(){
        var result = [];
        for(var key in this){
            result.push(key);
        }
        return result;
    },
    writable: true,
    enumerable: false,
    configurable: true
});

({alice: 34, bob: 24, chris:62 }).allKeys(); //["alice", "bob", "chris"]

//3)hasOwnProperty 사용
Object.prototype.getUpper = function(key){
    return this[key].toUpperCase();
}

var dict = { alice:34, bob:24, chris:62 };

var people = [];
for(var name in dict){
    if(dict,hasOwnProperty(name))
        people.push(name + ": " + dict[name]);
}

console.log(people); //["alice: 34", "bob: 24", "chris: 62"]


/////////////hasOwnProperty overriding///////////////
dict.hasOwnProperty = 10;
dict.hasOwnProperty("alice")
//Uncaught TypeError: dict.hasOwnProperty is not function
[].hasOwnProperty.call(dict, "alice") //true;

////////////프로퍼티 탐색 상황도 고려////////////////
if("alice" in dict){
    dict.alice = 24;
}

"alice" in dict //true;
"bob" in dict //true;
"chris" in dict //true;
"oleh" in dict //false;
"toString" in dict //true;
"getUpper" in dict //true;

if(dict.hasOwnProperty("alice")){
    dict.alice = 24;
}

//위 패턴을 딕셔너리의 연산에 적용한 클래스로 추상화하여 사용
//(기존 문법보다 견고하며 사용 편리성 유지)

Object.prototype.addOneYear = function(key){
    return this[key] = this[key] + 1;
}

//사용자 정의 Dictonary 추상화
function Dict(elements){
    this.elements = elements || {};
}
Dict.prototype.has = function(key){
    return {}.hasOwnProperty.call(this.elements, key);
}
Dict.prototype.get = function(key){
    return this.has(key) ? this.elements[key] : undefined;
}
Dict.prototype.set = function(key, val){
    this.elements[key] = val;
}
Dict.prototype.remove = function(key){
    delete this.elements[key];
}

var dict = new Dict({alice:34, bob:24, chris:62});
console.log(dict.has("alice")); //true
console.log(dict.get("bob")); //24
console.log(dict.has("valueOf")); //false

console.log(dict.has("addOneYear")); //false
console.log(dict.elements.addOneYear("alice")); //35

console.log(dict.has("hasOwnProperty")); //false
console.log(dict.set("hasOwnProperty"), 10);
console.log(dict.get("hasOwnProperty")); //10
console.log(dict.has("alice")); //true
console.log(dict.has("hasOwnProperty")); //true

///////////////////////////////////////////////////


//딕셔너리 객체의 for...in 열거는 순서를 보장하지 않음

function report(highScores){
    var result = "";
    var i = 1;
    for(var name in highScores){
        result += i + ". " + name + ": " +
        highScores[name] + "\n";
        i++;
    }
    return result;
}

console.log(report( {eunhak: 100, gusik: 90, nbok: 80} ))

/*
 순서의존 데이터 열거를 위해 {} -> [], for..in -> for 사용
*/
function reportFor(highScores){
    var result = "";
    for(var i = 0, n = highScores.length; i < n; i++){
        var score = highScores[i];
        result += (i + 1) + ". " + score.name + ": " + score.points + "\n";
    }
    return result;
}

console.log(reportFor([
    { name:'eunhak', point: '100' },
    { name:'gusik', point: '90' },
    { name:'nbok', point: '80' }
]))


//배열반복시에는 for...in대신 for사용
//길이를 재계산하지 않기 위해 length 값을 지역변수에 저장

var scores = [100, 90, 90, 100];
var total = 0;
for(var score in scores){
    total += score;
}

var mean = total / scores.length;
console.log(mean); //??

////배열 반복시 for 사용///
var scores = [100, 90, 90, 100];
var total = 0;
for(var i = 0, n = scores.length; i < n; i++){
    total += scores[i];
}

var mean = total / scores.length;
console.log(mean);


//반복문 대신 반복메소드 사용
//코드 가독성 올리고 실수 방지

//반복문 종료조건에 대한 사소한 실수
for(var i = 0; i <= n; i++ ) {}
for(var i = 1; i < n; i++ ) {}
for(var i = n; i >= 0; i-- ) {}
for(var i = n - 1; i > 0; i-- ) {}

//ES5 제공 반복 메소드, Array.prototype.forEach, map, filter, some, every
var trimmed = [];
for(var i = 0, n = input.length; i < n; i++){
    trimmed.push(input[i].trim());
}

var trimmed = [];
input.forEach(function(s){
    trimmed.push(s.trim());
});

var trimmed = input.map(function(s){
    s.trim();
});

var filterd = items.filter(function(listing){
    return item.price >= min && items.price <= max;
});
//사용자 정의 반복함수
function takeWhile(a, pred){
    var result = [];
    for(var i =0, n = a.length; i < n; i++){
        if(!pred(a[i], i)){
            break;
        }
        result[i] = a[i];
    }
    return result;
}
var prefix = takeWhile([1,2,4,8,16,32], function(n){
    return n < 10;
})
console.log(prefix); //[1,2,4,8]

//Array.prototype에 정의
Array.prototype.takeWhile = function(pred){....};
var prefix = [1,2,4,8,16,32].takeWhile(function(n){
    return n < 10;
});

//다만, 반복문내애서 흐름제어(break, continue)필요할 경우 전통방법 사용, 대안으로 some, every
[1,10,100].some(function(x){ return x > 5; })// true => 바로종료
[1,10,100].some(function(x){ return x > 6; })// false

[1,2,3,4,5].every(function(x){ return x > 0; })// true 
[1,2,3,4,5].every(function(x){ return x > 3; })// false => 바로종료

function takeWhile(a, pred){
    var result = [];
    a.every(function(x, i){
        if(!pred(x)){
            return false; //break
        }
        result[i] = x;
        return true //continue;
    });
    return result;
}

//2.유사배열 객체

//arguments객체는 Array.prototype 상속 X -> arguments.forEach 사용 X
function highlight(){
    [].forEach.call(arguments, function(widget){
        widget.setBackgorud("yellow");
    });
}

//유사배열객체도 Array.prototype 메소드 사용권장

var arrayLike = {0: "a", 1: "b", 2: "c", length: 3}
var result = Array.prototype.map.call(arrayLike, function(s){
    return s.toUpperCase();
});
console.log(result); //["A, "B", "C"]

var result = Array.prototype.map.call("abc", function(s){
    return s.toUpperCase();
})
console.log(result); //["A, "B", "C"]


//3. Array 생성자 대신 배열 리터럴 사용

//배열 리터럴
var a = [1, 2, 3, 4, 5];a

//배열 생성자
var a = new Array(1, 2, 3, 4, 5);

//1번째 생성자 사용으로 인한 오류
function f(Array){
    return new Array(1, 2, 3, 5, 6)
}
f(String); //new String(1);

//2번쨰 생성자 사용으로 인한 오류
Array = String;
new Array(1, 2, 3, 4, 5); //new String(1);

//3번쨰 생성자 사용으로 인한 오류
var a = [7];
var b = new Array(7);
console.log(a);
console.log(b);

b.forEach(function(a){
    console.log(b);
})