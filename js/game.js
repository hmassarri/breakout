//Reference the canvas
var canvas = document.getElementById("gameCanvas");

//Tool to paint on the canvas
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

//Player paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

//Bricks
var brickRowCount = 5;
var brickColCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 20;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//2d array for the bricks
var bricks = [];
for (c = 0; c < brickColCount; c++ ) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++ ) {
        bricks[c][r] = {x: 0, y: 0};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


//Draw Ball
function drawBall(ballColor) {
    //drawing code
    ctx.beginPath();
    //left, top, size
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

//Draw Paddle
function drawPaddle(paddleColor) {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

//Draw Bricks
function drawBricks() {
    for (c = 0; c < brickColCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
        }
    }
}

//Random color
function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

function draw() {
    //clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        drawBall();
        dx = -dx;
        
    }
    if (y + dy < ballRadius) {
        dy = -dy;    
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dy -= .5;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
}

//Debug
//alert(y);

//Pass the draw function and 10ms
setInterval(draw, 10);