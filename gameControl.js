"use Strict";

const areCellsEqual = (cell1, cell2) => {
  const [cell1RowId, Cell1ColId] = cell1;
  const [cell2RowId, cell2ColId] = cell2;
  return cell1RowId === cell2RowId && Cell1ColId === cell2ColId;
};

const isNotInRange = function(value, [min, max]) {
  return value < min || value >= max;
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
