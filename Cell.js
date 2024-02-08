function Cell(i, j) {
  // Vertical position
  this.i = i;
  // Horizontal position
  this.j = j;
  // Enable/disable the walls of each cell in the grid.
  this.walls = [true, true, true, true];
  this.visited = false;
  this.inStack = false;
  this.solution = false;

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
  };

  this.getUnvisitedRandomNeighbor = function () {
    let neighbors = this.getNeighbors();
    let notVisited = [];
    let ind;

    for (ind = 0; ind < neighbors.length; ind++) {
      if (neighbors[ind] && !neighbors[ind].visited) {
        notVisited.push(neighbors[ind]);
      }
    }

    if (notVisited.length > 0) {
      let r = floor(random(0, notVisited.length));
      return notVisited[r];
    }
  };
}
