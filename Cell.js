function Cell(i, j) {
  // Vertical position
  this.i = i;
  // Horizontal position
  this.j = j;
  // Enable/disable the walls of each cell in the grid.
  this.walls = [true, true, true, true];
  this.visited = false;
  this.inStack = false;

  this.getTopNeighbor = function () {
    return grid[index(i - 1, j)];
  };
  this.getRightNeighbor = function () {
    return grid[index(i, j + 1)];
  };
  this.getBottomNeighbor = function () {
    return grid[index(i + 1, j)];
  };
  this.getLeftNeighbor = function () {
    return grid[index(i, j - 1)];
  };

  // Returns the 4 neighbors
  this.getNeighbors = function () {
    return [
      this.getTopNeighbor(),
      this.getRightNeighbor(),
      this.getBottomNeighbor(),
      this.getLeftNeighbor(),
    ];
  }

  // Rendering logic.
  this.show = function () {
    var x = this.j * cellSize;
    var y = this.i * cellSize;
    stroke(255);

    // Draw the border lines for the cells
    if (this.walls[top]) {
      line(x, y, x + cellSize, y);
    }
    if (this.walls[right]) {
      line(x + cellSize, y, x + cellSize, y + cellSize);
    }
    if (this.walls[bottom]) {
      line(x, y + cellSize, x + cellSize, y + cellSize);
    }
    if (this.walls[left]) {
      line(x, y, x, y + cellSize);
    }

    // Paint the visited cells.
    if (this.inStack) {
      noStroke();
      fill(255, 255, 255, 100);
      rect(x, y, cellSize);
    } else if (this.visited) {
      noStroke();
      fill(0, 255, 255, 100);
      rect(x, y, cellSize);
    }
  };

  // Highlight the current cell.
  this.highlight = function () {
    var x = this.j * cellSize;
    var y = this.i * cellSize;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, cellSize);
  };
}
