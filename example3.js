//1.함수, 메소드, 생성자
function hello(name){
    return "hello" + name;
}

var obj = {
    username: "oleh",
    hell: function(){
        return "hello" + this.username;
    }
}

function emp(empno, name){
    this.empno = empno;
    this.name = name;
}


var u = new emp('N14401','이은학');


//2 고차함수
function compareNumbers(x, y){
    if(x < y){
        return -1;
    }
    if(x > y){
        return 1;
    }
    return 0;
}

[3, 1, 4, 1, 5, 9].sort(compareNumbers);
//[1,1,3,4,5,9]

var names = ["eunhak","gusik","nbook"];
var upper = [];

for(var i = 0, n = name.length; i < n; i++){
    upper[i] = names[i].toUpperCase();
}

upper; //["EUNHAK","GUSIK","NBOOK"];

//////////////////////////////////////////////
var names = ["eunhak","gusik","nbook"];
var upper = names.map(function(name){
    return name.toUpperCase();
})

upper; //["EUNHAK","GUSIK","NBOOK"];


//코드에 공통 패턴을 찾고 고차함수로 대체하는 습관 필요

//1)
var aIndex = "a".charCodeAt(0);
var alphabet = "";
for(var i = 0; i < 26; i++){
    alphabet += String.fromCharCode(aIndex + 1);
}

//2)
var digits = "";
for(var i = 0; i < 8; i++){
    random += String.fromCharCode(
        Math.floor(Math.random() * 26) + aIndex
    );
}

////////////////////////////////////////////////

function buildString(n, callBack){
    var result;
    for(var i = 0; i < n; i++){
        result += callBack(i);
    }
    return result;
}

var alphabet = buildString(26, function(i){
    return String.fromCharCode(aIndex + 1);
});


//3.Call메소드
var dict = {
    name: "oleh"
};

dict.hasOwnProperty = 1;
//dict.hasOwnProperty("name");
// => dict.hasOwnProperty is not function
//위 상황에서 call 함수 미사용시 특정 객체의 프로퍼티가 변경됨

//고차함수에서 콜백함수를 위한 다른 객체를 수신시 call 메소드를 사용하여 제어
var otherDic = {};
otherDic.hasOwnProperty.call(dict, "name"); //true

var table = {
    entries = [],
    addEntry: function(k, v){
        this.entries.push({ key: k, value: v});
    },
    forEach: function(f, thisArg){
        for(var i = 0, n = entries.length; i < n; i++){
            var entry = entries[i];
            f.call(thisArg, entry.key, entry.value);
        }
    }
}

table1.forEach(table2.addEntry, table2);

//4.apply 메소드

///가변인자 함수///
average(1,2,3);
average(1,2,3,4,5);
average(1,2,3,4,5,6);

///가변인자 함수///
average([1,2,3]);
average([1,2,3,4,5]);
average([1,2,3,4,5,6]);

var scores = getAllScores();

average.apply(null, scores);
//=>average(scores[0],scores[1],scores[2])

//5.arguments 객체 (가변인자 함수 생성)

function average(){
    for(var i = 0, sum = 0, n = arguments.length; i < n; i++){
        sum += arguments[i];
    }
    return sum / n;
}

///////////////////BEST PRACTICE////////////////////
function average(){
    return averageOfArray(arguments);
}

//6.bind함수
//예제
var buffer = {
    entries: [],
    add: function(s){
        this.entries.push(s);
    },
    concat: function(){
        return this.entries.join('');
    }
}

var source = ["010","-","9160","-","4423"];
source.forEach(buffer.add) // => ??
buffer.concat();

//bind사용으로 특정 객체의 스코프 전달가능
//1)
var source = ["010","-","9160","-","4423"];
source.forEach(buffer.add, buffer);
buffer.join(); //010-9160-4423

//2)
var source = ["010","-","9160","-","4423"];
source.forEach(function(s){
    buffer.add(s);
});
buffer.join(); //010-9160-4423

//3)
var source = ["010","-","9160","-","4423"];
source.forEach(buffer.add.bind(buffer));
buffer.join(); //010-9160-4423

//bind사용시 수신자 객체로 바인딩된 새로운 함수생성
buffer.add === buffer.add.bind(buffer); // false


//인자값이 고정인 함수 호출 시 유용
function simpleURL(protocol, domain, path){
    return protocol + "://" + domain + path;
}

var url = paths.map(function(path){
    return simpleURL("http", siteDomain, path)
})

var urls = paths.map(smpleURL.bind(null, "http", siteDomain));