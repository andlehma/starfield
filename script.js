var canvas = $("canvas").get(0);
var ctx = canvas.getContext('2d');
var iW = window.innerWidth;
var iH = window.innerHeight;

document.addEventListener('mousemove',
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        },false);

var mouse = {
    x: iW / 2,
    y: iH / 2,
};

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Dot(x, y){
    this.x = x;
    this.y = y;

    this.draw = function(){
        ctx.fillRect(this.x, this.y, 3, 3);
    };

    this.update = function(){

        var a = mouse.x - this.x;
        var b = mouse.y - this.y;
        var c = Math.sqrt(a*a + b*b);
        var dx = 0;
        var dy = 0;
        var xAngle = Math.abs(Math.asin(a/c));
        var yAngle = Math.abs(Math.asin(b/c));
        var vMult = c/500;

        if (mouse.x > this.x){
            dx = xAngle * vMult;
        }
        else if (mouse.x < this.x){
            dx = -xAngle * vMult;
        }

        if (mouse.y > this.y){
            dy = yAngle * vMult;
        }
        else if (mouse.y < this.y){
            dy = -yAngle * vMult;
        }

        this.x += dx;
        this.y += dy;
        this.draw();
    };
}

var dotArray = [];
for (var i = 0; i < 750; i++){
    var x = randomIntFromInterval(0, iW);
    var y = randomIntFromInterval(0, iH);
    dotArray.push(new Dot(x, y));
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, iW, iH);

    dotArray.forEach(function(i){
        i.update();
    });

    x = randomIntFromInterval(0, iW);
    y = randomIntFromInterval(0, iH);
    for (var i = 0; i < 5; i++){
        dotArray.push(new Dot(x, y));
        dotArray.shift();
    }
}

$(document).ready(function(){
    canvas.width = iW;
    canvas.height = iH;

    animate();
});
