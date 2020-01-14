"useStrict";

class Game {
  constructor(snake, food, boundarySize) {
    this.snake = snake;
    this.food = food;
    this.boundarySize = boundarySize;
    this.score = new Score();
  }

  getSnakeStatus() {
    return this.snake.status;
  }

  getFoodStatus() {
    return { position: this.food.position };
  }

  get getGameScore() {
    return this.score.status;
  }

  update() {
    if (this.snake.hasEatenFood(this.food.position)) {
      this.food = inItFood();
      this.snake.growBy(1);
      this.score.updateDefault();
    }
  }

  hasGameOver() {
    return (
      this.snake.hasTouchedItself() ||
      this.snake.hasTouchedBoundary(this.boundarySize)
    );
  }

  turnSnake(directionLookup) {
    const headDirection = this.getSnakeStatus().headDirection;
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
