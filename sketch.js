var paddle;
var ball;
var bricks = [];

var playingGame = false;
var youWin = false;
var winText;

function setup() {
  createCanvas(windowWidth, windowHeight);

  paddle = new Paddle();
  ball = new Ball();

  for (var i = 0; i < 20; i++) {
    bricks.push(new Brick());
  }
  createText();
}

function draw() {
  background(255);

  // bricks
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].display();
    if (ball.hits(bricks[i])) {
      if (bricks[i].r >= 40) {
        bricks[i].r = bricks[i].r / 2;
      } else {
        bricks.splice(i, 1);
      }
      ball.direction.y *= -1;
    }
  }

  // paddle
  paddle.display();
  if (playingGame) paddle.checkEdges();
  if (playingGame) paddle.update();

  // ball
  if (ball.meets(paddle)) {
    if (ball.direction.y > 0) ball.direction.y *= -1;
  }
  ball.display();
  if (playingGame) ball.checkEdges();
  if (playingGame) ball.update();

  // game logics
  if (ball.pos.y > height) {
    ball.pos = createVector(width / 2, height / 2);
    playingGame = false;
  }

  if (bricks.length === 0) {
    youWin = true;
    playingGame = false;
  }

  if (youWin) {
    winText.style('display', 'block');
  } else {
    winText.style('display', 'none');
  }
}

function keyReleased() {
  paddle.isMovingRight = false;
  paddle.isMovingLeft = false;
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    paddle.isMovingLeft = true;
  } else if (key === 'd' || key === 'D') {
    paddle.isMovingRight = true;
  } else if (key === 's' || key === 'S') {
    if (bricks.length === 0) {
      for (var i = 0; i < 20; i++) {
        bricks.push(new Brick());
      }
    }
    playingGame = true;
    youWin = false;
  }
}

function createText() {
  winText = createP('YOU WIN!');
  winText.position(width / 2, 80);
}
