const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnRight() {
    this.heading = (this.heading + 3) % 4;
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  turnRight() {
    this.direction.turnRight();
  }
  turnLeft() {
    this.direction.turnLeft();
  }
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }
}

class Game {
  constructor(snake, food) {
    this.snake = snake;
    this.food = food;
  }

  getSnakeStatus() {
    return {
      location: this.snake.location,
      species: this.snake.species,
      previousTail: this.snake.previousTail
    };
  }

  getFoodStatus() {
    return { position: this.food.position };
  }

  turnSnake(directionLookup) {
    const snakeDirection = this.snake.direction.heading;

    if (directionLookup[event.key] === (snakeDirection + 1) % 4) {
      this.snake.turnLeft();
    }

    if (directionLookup[event.key] === (snakeDirection + 3) % 4) {
      this.snake.turnRight();
    }
  }

  move() {
    this.snake.move();
  }
}

const inItSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), "snake");
};

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = "grid";

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + "_" + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const handleKeyPress = game => {
  const keyLookup = {
    ArrowRight: EAST,
    ArrowLeft: WEST,
    ArrowUp: NORTH,
    ArrowDown: SOUTH
  };
  game.turnSnake(keyLookup);
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const drawFood = food => {
  const [rowId, colId] = food.position;
  const cell = getCell(rowId, colId);
  cell.classList.add("food");
};

const updateGame = game => {
  const snake = game.getSnakeStatus();
  const food = game.getFoodStatus();
  moveAndDrawSnake(snake);
  drawFood(food);
  game.move();
};

const setGame = game => {
  attachEventListeners(game);
  createGrids();
  updateGame(game);
};

const main = function() {
  const snake = inItSnake();
  const food = new Food(5, 5);
  const game = new Game(snake, food);
  setGame(game);
  setInterval(() => {
    updateGame(game);
  }, 200);
};
