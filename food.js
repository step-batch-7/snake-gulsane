"use Strict";

const foodPropertyLookUp = {
  simpleFood: { points: 5, growth: 1, type: "simpleFood" },
  superFood: { points: 20, growth: 0, type: "superFood" }
};

class Food {
  colId;
  rowId;
  property;
  constructor(colId, rowId, property) {
    this.colId = colId;
    this.rowId = rowId;
    this.property = property;
  }

  get status() {
    return {
      position: [this.colId, this.rowId],
      points: this.property.points,
      growth: this.property.growth,
      type: this.property.type
    };
  }
}
