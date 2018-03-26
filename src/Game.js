function Game(){
  const canvas = document.getElementById("the-game");
  const context = canvas.getContext("2d");
  let game;
  let snake;
  let food;

  game = {

    score: 0,
    fps: 8,
    over: false,
    message: null,

    start() {
      game.over = false;
      game.message = null;
      game.score = 0;
      game.fps = 8;
      snake.init();
      food.set();
    },

    stop() {
      game.over = true;
      game.message = 'GAME OVER - PRESS SPACEBAR';
    },

    drawBox(x, y, size, color) {
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(x - (size / 2), y - (size / 2));
      context.lineTo(x + (size / 2), y - (size / 2));
      context.lineTo(x + (size / 2), y + (size / 2));
      context.lineTo(x - (size / 2), y + (size / 2));
      context.closePath();
      context.fill();
    },

    drawScore() {
      context.fillStyle = '#999';
      context.font = `${canvas.height}px Impact, sans-serif`;
      context.textAlign = 'center';
      context.fillText(game.score, canvas.width / 2, canvas.height * 0.9);
    },

    drawMessage() {
      if (game.message !== null) {
        context.fillStyle = '#00F';
        context.strokeStyle = '#FFF';
        context.font = `${canvas.height / 10}px Impact`;
        context.textAlign = 'center';
        context.fillText(game.message, canvas.width / 2, canvas.height / 2);
        context.strokeText(game.message, canvas.width / 2, canvas.height / 2);
      }
    },

    resetCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

  };

  snake = {

    size: canvas.width / 40,
    x: null,
    y: null,
    color: '#0F0',
    direction: 'left',
    sections: [],

    init() {
      snake.sections = [];
      snake.direction = 'left';
      snake.x = canvas.width / 2 + snake.size / 2;
      snake.y = canvas.height / 2 + snake.size / 2;
      for (let i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
        snake.sections.push(`${i},${snake.y}`);
      }
    },

    move() {
      switch (snake.direction) {
        case 'up':
          snake.y -= snake.size;
          break;
        case 'down':
          snake.y += snake.size;
          break;
        case 'left':
          snake.x -= snake.size;
          break;
        case 'right':
          snake.x += snake.size;
          break;
      }
      snake.checkCollision();
      snake.checkGrowth();
      snake.sections.push(`${snake.x},${snake.y}`);
    },

    draw() {
      for (let i = 0; i < snake.sections.length; i++) {
        snake.drawSection(snake.sections[i].split(','));
      }
    },

    drawSection(section) {
      game.drawBox(parseInt(section[0]), parseInt(section[1]), snake.size, snake.color);
    },

    checkCollision() {
      if (snake.isCollision(snake.x, snake.y) === true) {
        game.stop();
      }
    },

    isCollision(x, y) {
      if (x < snake.size / 2 ||
        x > canvas.width ||
        y < snake.size / 2 ||
        y > canvas.height ||
        snake.sections.includes(`${x},${y}`)) {
        return true;
      }
    },

    checkGrowth() {
      if (snake.x == food.x && snake.y == food.y) {
        game.score++;
        if (game.score % 5 == 0 && game.fps < 60) {
          game.fps++;
        }
        food.set();
      } else {
        snake.sections.shift();
      }
    }

  };

  food = {

    size: null,
    x: null,
    y: null,
    color: '#0FF',

    set() {
      food.size = snake.size;
      food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
      food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
    },

    draw() {
      game.drawBox(food.x, food.y, food.size, food.color);
    }

  };

  const inverseDirection = {
    'up': 'down',
    'left': 'right',
    'right': 'left',
    'down': 'up'
  };

  const keys = {
    up: [38, 75, 87],
    down: [40, 74, 83],
    left: [37, 65, 72],
    right: [39, 68, 76],
    start_game: [13, 32]
  };

  function getKey(value) {
    for (const key in keys) {
      if (keys[key] instanceof Array && keys[key].includes(value)) {
        return key;
      }
    }
    return null;
  }

  window.addEventListener("keydown", e => {
    const lastKey = getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].includes(lastKey)
      && lastKey != inverseDirection[snake.direction]) {
      snake.direction = lastKey;
    } else if (['start_game'].includes(lastKey) && game.over) {
      game.start();
    }
  }, false);

  const requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame;

  function loop() {
    if (game.over === false) {
      game.resetCanvas();
      game.drawScore();
      snake.move();
      food.draw();
      snake.draw();
      game.drawMessage();
    }
    setTimeout(() => {
      requestAnimationFrame(loop);
    }, 1000 / game.fps);
  }

  requestAnimationFrame(loop);
}
export default Game