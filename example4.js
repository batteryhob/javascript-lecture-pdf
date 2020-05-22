

//1. 생성자와 Prototype
function User(name,passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
}

User.prototype.toString = function(){
    return "[ User " + this.name + " ]";
}

User.prototype.checkPassword = function(password){
    return hash(password) === this.passwordHash;
}

var u = new User('eunhak','0ef23ksdflk3lks234l23kjlsd3l');
u.toString(); // ==> [ User eunhak ]
u.checkPassword('N14401'); // ==> false


//2. 설계시 유의점
//new 키워드 누락시에도 정상적으로 동작할 수 있도록 함

function User(name,passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
}

var u = User('oleh', 'wer2323sD323sdf35344');
u // undefined
this.name //oleh
this.passwordHash //wer2323sD323sdf35344

function UserStrict(name, passwordHash){
    "use strict"
    this.name = name;
    this.passwordHash = passwordHash;
}

var us = UserStrict('oleh', 'wer2323sD323sdf35344');
//Cannot set property 'name' of undefined

/////////////////////////////////////////////////

function User(name, passwordHash){
    if(!(this instanceof User)){
        return new User(name, passwordHash);
    }
    this.name = name;
    this.passwordHash = passwordHash;
}

var u = User('oleh', 'wer2323sD323sdf35344');

//메소드는 prototype에 저장(메모리 최적화)

function User(name, passwordHash){
    this.name = name;
    this.passwordHash = passwordHash;
    this.toString = function(){
        return "[ User " + this.name + " ]";
    };
    this.checkPassword = function(password){
        return hash(password) === this.passwordHash;
    }
}

var oleh = new User('eunhak', 'sdf23d23d23');
var gusik = new User('gusik', 'h34ce23');
var lnb = new User('nbok', 'dfsf232sd23we');

//정보은닉을 위해 클로저 사용
//this의 프로퍼티가 아닌 변수로 참조

function User(name, passwordHash){
    this.toString = function(){
        return "[ User " + name + " ]";
    };

    this.checkPassword = function(password){
        return hash(password) === passwordHash;
    }
}

//this의 프로퍼티가 없기 떄문에 외부접근 불가
//메소드는 인스턴스 객체에 위치해야 함(메소드 복사 급증)

//this는 가장 가까이 둘러싼 함수에 의해 바인딩 됨
//this 파라미터 누락시 map 콜백함수내 this에는 전역객체(window)이 바인딩됨

function CSVReader(separators){
    "use strict"
    this.separators = separators || [","];
    this.regexp = new RegExp(this.separators.map(function(sep){
        return "\\" + seq[0];
    }).join("|"));
};

CSVReader.prototype.read = function(str){
    "use strict"
    var lines = str.trim().split(/\n/);
    return lines.map(function(line){
        return line.split(this.regexp);
    });
};

var reader = new CSVReader();
reader.read("a,b,c\nd.e.f\n");

//nonStict => [["a,b,c"],["d,e,f"]]
//strict => Cannot read property 'regexp' of undefined
//정상 => [["a,b,c"],["d,e,f"]]

////////////////////////////////////////////////
//1번째 방법
return lines.map(function(line){
    return line.split(this.regexp);
}, this); //외부 this 바인딩 전달

//2번째 방법
var self = this;
return lines.map(function(line){
    return line.split(self.regexp);
});

//3번째 방법
return lines.map(function(line){
    return line.split(self.regexp);
}.bind(this)); //외부 this 바인딩 전달


//3. 클래스 상속
//하위클래스 생성자에서 상위클래스 생성자 명시적 호출
//Object.create를 사용하여 하위클래스 프로토타입 객체생성

function Actor(scene, x, y){
    this.scene = scene;
    this.x = x;
    this.y = y;
}

Actor.prototype.moveTo = function(x, y){
    this.x = x;
    this.y = y;
    return "X:" + this.x + ", Y:" + this.y;
}

function SpaceShip(scene, x, y){
    Actor.call(this, scene, x, y);
    this.points = 0;
}

SpaceShip.prototype = Object.create(Actor.prototype);
SpaceShip.prototype.scorePoint = function(){ this.points++; }

var ship = new SpaceShip('space', 100, 200);
console.log(ship);
ship.moveTo(100,100);
ship.scorePoint();