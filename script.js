var canvas = $("canvas").get(0);
var ctx = canvas.getContext('2d');
var iW = window.innerWidth;
var iH = window.innerHeight;

var mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove',
        function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });

function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function Dot(x, y){
    this.x = x;
    this.y = y;

    this.draw = function(){
        ctx.fillRect(this.x, this.y, 3, 3);
    }

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
    }
}

var dotArray = []
for (var i = 0; i < 1000; i++){
    x = randomIntFromInterval(0, iW);
    y = randomIntFromInterval(0, iH);
    dotArray.push(new Dot(x, y));
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, iW, iH);

    for (i in dotArray){
        dotArray[i].update();
        if (dotArray[i].update.c < 100){
            delete dotArray[i];
        }
    }

    x = randomIntFromInterval(0, iW);
    y = randomIntFromInterval(0, iH);
    for (var i = 0; i < 5; i++){
        dotArray.push(new Dot(x, y));
        dotArray.shift();
        console.log(dotArray.length);
    }
}

$(document).ready(function(){
    canvas.width = iW;
    canvas.height = iH;

    animate();
});
