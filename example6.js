

//1. undefined 활용
var s1 = new Server(80, "interpark.com");
var s2 = new Server(80); //localhost 처리

function Server(port, host){
    if(arguments.length < 2){
        host = "localhost";
    }
    this.hostName = host;
}

var s1 = new Server(80, "interpark.com");
var s2 = new Server(80); //localhost 처리
var s3 = new Server(80, config.hostName); //??

//undefined 활용
function Server(port, host){
    if(host === undefined){
        host = "localhost";
    }
    this.hostName = host;
    /* 또는 투루시니스 사용 => undefined는 false처리
    this.hostName = host || "localhost";
    */
}

/*
  트루시니스 사용 시 주의점
  빈문자열 또는 숫자 0을 의미있는 값으로 사용할 경우
*/

function Element(width, height){
    this.width = width || 320;
    this.height = height || 240;
    // this.width = width === undefined ? 320 : width;
    // this.height = height === undefined ? 240 : height;
}
var c1 = new Element();
var c1 = new Element(0,0);


//2. 파라메터 정의시 옵션 객체 활용

//기능확장을 통한 인자증식의 결과
var alert = new Alert(
    100, 75, 300, 200, "Error", message
    ,"blue", "white", "black", "error", true
);

//옵션객체 사용으로 가독성 및 확장성 증대
var alert = new Alert(
    {x: 100, y: 75, width: 300, height: 200, title: "Error", message: message
    ,titleColor: "blue", bgColor: "white", 
    textColor: "black", icon: "error", modal: true}
);

//필수인자 필요시 옵션객체와 분리
var alert = new Alert(
    message, Error, {x: 100, y: 75, width: 300, height: 200, title: "Error",
    titleColor: "blue", bgColor: "white", 
    textColor: "black", icon: "error", modal: true}
);


//Alert 내부구현
function Alert(message, title, opts){
    opts = opts || {};
    this.width = opts.width === undefined ? 320 : opts.width;
    this.height = opts.height === undefined ? 240 : opts.height; 
    this.titleColor = opts.titleColor || "gray";
    this.textColor = opts.width || "black";
    ...
    this.message = message;
    this.title = title;
}

//Alert 내부구현(extend 사용)
function Alert(message, title, opts){
    this.message = message;
    this.title = title;
    opts = Extend({
        width: 320, height: 240, titleColor: "gray"
    }, opts);
}

//extend 구현
function Extend(target, source){
    if(source){
        for(var key in source){
            var val = source[key];
            if(typeof val !== "undefined"){
                target[key] = val;
            }
        }
    }
    return target;
}