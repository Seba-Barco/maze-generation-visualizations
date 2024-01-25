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

  // Checks the 4 neighbors of a given Cell, and returns a random unvisited one if possible.
  this.checkNeighbors = function () {
    var neighbors = [
      this.getTopNeighbor(),
      this.getRightNeighbor(),
      this.getBottomNeighbor(),
      this.getLeftNeighbor(),
    ];

    var notVisited = [];

    for (k = 0; k < neighbors.length; k++) {
      if (neighbors[k] && !neighbors[k].visited) {
        notVisited.push(neighbors[k]);
      }
    }

    if (notVisited.length > 0) {
      var r = floor(random(0, notVisited.length));
      return notVisited[r];
    }
  };

  this.selectRightOrBottom = function () {
    //console.log(grid[index(i, j + 1)]);
    var rightBottom = [
      this.getRightNeighbor(),
      this.getBottomNeighbor()
    ];

    var select = [];

    for (var kk = 0; kk < rightBottom.length; kk++) {
      if (rightBottom[kk]) {
        select.push(rightBottom[kk]);
      }
    }

    return select[floor(random(0, select.length))];
  };

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
