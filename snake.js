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

const areCellsEqual = (cell1, cell2) => {
  const [cell1RowId, Cell1ColId] = cell1;
  const [cell2RowId, cell2ColId] = cell2;
  return cell1RowId === cell2RowId && Cell1ColId === cell2ColId;
};

const isNotInRange = function(value, [min, max]) {
  return value < min || value >= max;
};

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

  get headDirection() {
    return this.direction.heading;
  }

  get head() {
    return this.positions[this.positions.length - 1].slice();
  }

  hasEatenFood(foodLocation) {
    const [headX, headY] = this.head;
    const [foodX, foodY] = foodLocation;
    return headX === foodX && headY === foodY;
  }

  hasTouchedItself() {
    const body = this.location.slice(0, -1);
    const snakeHead = this.head;
    return body.some(part => areCellsEqual(part, snakeHead));
  }

  hasTouchedBoundary([width, height]) {
    const [headX, headY] = this.head;
    const hasTouchedSides = isNotInRange(headX, width);
    const hasTouchedTopBottom = isNotInRange(headY, height);
    return hasTouchedSides || hasTouchedTopBottom;
  }

  growBy(length) {
    for (let i = 0; i <= length; i++) {
      const [headX, headY] = this.head;
      const [deltaX, deltaY] = this.direction.delta;
      this.positions.push([headX + deltaX, headY + deltaY]);
    }
  }

  move() {
    const [headX, headY] = this.head;
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
  constructor(snake, food, boundarySize) {
    this.snake = snake;
    this.food = food;
    this.score = 0;
    this.boundarySize = boundarySize;
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

  get getGameScore() {
    return this.score;
  }

  increaseScoreBy(points) {
    this.score += points;
  }

  update() {
    if (this.snake.hasEatenFood(this.food.position)) {
      this.food = inItFood();
      this.snake.growBy(1);
      this.increaseScoreBy(5);
    }
  }

  hasGameOver() {
    return (
      this.snake.hasTouchedItself() ||
      this.snake.hasTouchedBoundary(this.boundarySize)
    );
  }

  turnSnake(directionLookup) {
    const headDirection = this.snake.headDirection;
    if (directionLookup[event.key] === (headDirection + 1) % 4) {
      this.snake.turnLeft();
    }

    if (directionLookup[event.key] === (headDirection + 3) % 4) {
      this.snake.turnRight();
    }
  }

  move() {
    this.snake.move();
  }
}

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

const drawFood = food => {
  const [rowId, colId] = food.position;
  const cell = getCell(rowId, colId);
  cell.classList.add("food");
};

const eraseFood = food => {
  const [rowId, colId] = food.position;
  const cell = getCell(rowId, colId);
  cell.classList.remove("food");
};

const moveAndDrawSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const drawScore = score => {
  const scoreId = document.getElementById("score");
  scoreId.innerText = `Score: ${score}`;
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

const updateGame = (game, gameLoop) => {
  if (game.hasGameOver()) {
    clearInterval(gameLoop);
    alert("Game is Over");
  }
  eraseFood(game.getFoodStatus());
  drawScore(game.getGameScore);
  game.update();
  moveAndDrawSnake(game.getSnakeStatus());
  drawFood(game.getFoodStatus());
  game.move();
};

const setGame = game => {
  attachEventListeners(game);
  createGrids();
  updateGame(game);
};

const inItSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25],
    [43, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), "snake");
};

const inItFood = () => {
  const rowId = Math.floor(Math.random() * 100);
  const colId = Math.floor(Math.random() * 60);
  return new Food(rowId, colId);
};

const main = function() {
  const snake = inItSnake();
  const food = inItFood();
  const game = new Game(snake, food, [
    [0, NUM_OF_COLS],
    [0, NUM_OF_ROWS]
  ]);
  setGame(game);
  const gameLoop = setInterval(() => {
    updateGame(game, gameLoop);
  }, 100);
};
