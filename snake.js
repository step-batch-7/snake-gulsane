"use Strict";

class Snake {
  positions;
  direction;
  type;
  previousTail;
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get head() {
    return this.positions[this.positions.length - 1].slice();
  }

  get status() {
    return {
      location: this.positions.slice(),
      species: this.type,
      headDirection: this.direction.heading,
      tail: this.previousTail.slice()
    };
  }

  hasEatenFood(foodLocation) {
    const [headX, headY] = this.head;
    const [foodX, foodY] = foodLocation;
    return headX === foodX && headY === foodY;
  }

  hasTouchedItself() {
    const body = this.status.location.slice(0, -1);
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
