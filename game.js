"useStrict";

class Game {
  snake;
  food;
  boundarySize;
  score;
  eatenFood;
  constructor(snake, food, boundarySize) {
    this.snake = snake;
    this.food = food;
    this.boundarySize = boundarySize;
    this.score = new Score();
    this.eatenFood = 0;
  }

  getSnakeStatus() {
    return this.snake.status;
  }

  getFoodStatus() {
    return this.food.status;
  }

  get getGameScore() {
    return this.score.status;
  }

  update() {
    if (this.snake.hasEatenFood(this.food.status.position)) {
      this.snake.growBy(this.food.status.growth);
      this.score.update(this.food.status.points);
      this.eatenFood = (this.eatenFood + 1) % 5;
      let foodType = foodPropertyLookUp.simpleFood;
      if (this.eatenFood === 0) {
        foodType = foodPropertyLookUp.superFood;
      }
      this.food = inItFood(foodType);
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
