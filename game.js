"useStrict";

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
