function Cell(i, j) {
    // Vertical position
    this.i = i;
    // Horizontal position
    this.j = j;
    // Boolean values to enable/disable the walls of each cell in the grid
    this.walls = [true, true, true, true];
    this.visited = false;
    this.inStack = false;
  
    this.checkNeighbors = function () {
      var neighbors = [
        // top neighbor
        grid[index(i - 1, j)],
        // right neighbor
        grid[index(i, j + 1)],
        // bottom neighbor
        grid[index(i + 1, j)],
        // left neighbor
        grid[index(i, j - 1)],
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
      } else {
        return undefined;
      }
    };
  
    // Rendering logic
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
  
      // paint the visited cells
      if (this.inStack) {
        noStroke();
        fill(255, 255, 255, 100);
        rect(x, y, cellSize, cellSize);
      } else if (this.visited) {
        noStroke();
        fill(19, 196, 163, 100);
        rect(x, y, cellSize, cellSize);
      }
    };
  
    // Highlight the current cell
    this.highlight = function () {
      var x = this.j * cellSize;
      var y = this.i * cellSize;
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, cellSize, cellSize);
    };
  }