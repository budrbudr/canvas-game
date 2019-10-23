'use strict';
let pushNewRect, drawNewRect,
    canvas = document.getElementById('canvas-game'),
    ctx = canvas.getContext('2d'),
    total = document.querySelector('.total'),
    start = document.querySelector('.start'),
    stop = document.querySelector('.stop');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
start.addEventListener('click', (e) => {
    e.preventDefault();
    animate();
});
stop.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(pushNewRect);
    clearInterval(drawNewRect);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    total.innerText = '0';
});

function animate() {
    function addNewRect() {
        //set params
        this.speed = Math.random() * 3;
        this.x = Math.random() * 620;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        //set colors
        this.r = Math.round(Math.random() * 255);
        this.g = Math.round(Math.random() * 255);
        this.b = Math.round(Math.random() * 255);
        this.color = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            this.update();
        };

        this.update = function () {
            this.y += this.speed;
        }
    }

    const rectangle = [];

    function draw() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
        for (let i = 0; i < rectangle.length; i++)
            rectangle[i].draw();
        update();
    }

    function update() {
        for (let i = 0; i < rectangle.length; i++) {
            rectangle[i].update();
        }
    }

    let time = Math.random() * 1500;
    pushNewRect = setInterval(function () {
        rectangle.push(new addNewRect())
    }, time);

    drawNewRect = setInterval(draw, 20);
    let isCursorInSquares = function (x, y, rectangle) {
        return x > rectangle.x && x < rectangle.x + rectangle.width + 8 &&
            y > rectangle.y && y < rectangle.y + rectangle.height + 50;
    };
    canvas.addEventListener('click', (e) => {
        let x = e.pageX;
        let y = e.pageY;
        for (let i = rectangle.length - 1; i >= 0; --i) {
            if (isCursorInSquares(x, y, rectangle[i])) {
                delete rectangle.splice(i, 1);
                total.innerHTML = Number(total.innerHTML) + 1;
            }
        }
    })
}
