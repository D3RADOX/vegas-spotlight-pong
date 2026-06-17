const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;

let player1Y = H / 2 - 50;
let player2Y = H / 2 - 50;
const paddleHeight = 100;
const paddleWidth = 15;
const paddleSpeed = 8;

let ballX = W / 2;
let ballY = H / 2;
let ballSpeedX = 6;
let ballSpeedY = 3;
const ballRadius = 10;

let score1 = 0;
let score2 = 0;

const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function drawBackground() {
    ctx.fillStyle = '#0a001f';
    ctx.fillRect(0, 0, W, H);
    
    ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.fillRect(0, 0, W/2, H);
    ctx.fillRect(W/2, 0, W/2, H);
    
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(W, 50);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, H-50);
    ctx.lineTo(W, H-50);
    ctx.stroke();
}

function drawPaddle(x, y) {
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 2, y + 10, 4, 20);
    ctx.fillRect(x + 2, y + 60, 4, 20);
}

function drawBall() {
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ballX - 3, ballY - 3, 3, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (keys['w'] || keys['W']) player1Y -= paddleSpeed;
    if (keys['s'] || keys['S']) player1Y += paddleSpeed;
    if (keys['ArrowUp']) player2Y -= paddleSpeed;
    if (keys['ArrowDown']) player2Y += paddleSpeed;
    
    player1Y = Math.max(0, Math.min(H - paddleHeight, player1Y));
    player2Y = Math.max(0, Math.min(H - paddleHeight, player2Y));
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= H) {
        ballSpeedY = -ballSpeedY;
    }
    
    if (ballX - ballRadius <= 30 && ballY > player1Y && ballY < player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX * 1.05;
        const hitPos = (ballY - (player1Y + paddleHeight/2)) / (paddleHeight/2);
        ballSpeedY = hitPos * 8;
    }
    
    if (ballX + ballRadius >= W - 30 && ballY > player2Y && ballY < player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX * 1.05;
        const hitPos = (ballY - (player2Y + paddleHeight/2)) / (paddleHeight/2);
        ballSpeedY = hitPos * 8;
    }
    
    if (ballX < 0) {
        score2++;
        resetBall();
    }
    if (ballX > W) {
        score1++;
        resetBall();
    }
    
    document.getElementById('ui').innerHTML = `VEGAS SPOTLIGHT PONG<br>Left: ${score1} | Right: ${score2}`;
}

function resetBall() {
    ballX = W / 2;
    ballY = H / 2;
    ballSpeedX = (Math.random() > 0.5 ? 6 : -6);
    ballSpeedY = (Math.random() - 0.5) * 6;
}

function draw() {
    drawBackground();
    drawPaddle(20, player1Y);
    drawPaddle(W - 35, player2Y);
    drawBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

resetBall();
gameLoop();