"use strict";

class Score {
  constructor() {
    this.score = 0;
  }

  get status() {
    return this.score;
  }
  updateDefault() {
    this.score += 5;
  }
  updateSuper() {
    this.score += 20;
  }
}
