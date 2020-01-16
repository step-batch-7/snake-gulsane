"use strict";

class Score {
  constructor() {
    this.score = 0;
  }

  get status() {
    return this.score;
  }
  update(points) {
    this.score += points;
  }
}
