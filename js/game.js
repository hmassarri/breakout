//Reference the canvas
var canvas = document.getElementById("gameCanvas");

//Tool to paint on the canvas
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var score = 0;
var lives = 3;
//To Move
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

//Player paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

//Bricks
var brickRowCount = 5;
var brickColCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 20;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;

//2d array for the bricks
var bricks = [];
for (c = 0; c < brickColCount; c++) {
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1
		};
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}

//Collision Detection
function collision() {
	for (c = 0; c < brickColCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score += 100;
					if (score == brickColCount * brickRowCount) {
						alert("You win, Congrulations");
						document.location.reload();
					}
				}	
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText("Score: " + score, 30, 30);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#000000";
	ctx.fillText("Lives: " + lives, canvas.width -85, 30);
}

//Draw Ball
function drawBall(color) {
	//drawing code
	ctx.beginPath();
	//left, top, size
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

//Draw Paddle
function drawPaddle(color) {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

//Draw Bricks
function drawBricks(color) {
	for (c = 0; c < brickColCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = color;
				ctx.fill();
				ctx.closePath();
			}
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
	drawScore();
	drawLives();
	collision();

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}

	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
			dy -= .2;

		} else {
			lives--;
			if (!lives) {
				alert("GAME OVER");
				document.location.reload();	
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	x += dx;
	y += dy;
	
	requestAnimationFrame(draw);
}

//Debug
//alert(randomColor());

//Pass the draw function and 10ms
draw();
