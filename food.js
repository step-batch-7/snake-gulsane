"use Strict";

class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.type = type;
  }

  get status() {
    return {
      position: [this.colId, this.rowId],
      type: this.type
    };
  }
}
