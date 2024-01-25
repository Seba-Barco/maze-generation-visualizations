function removeWalls(a, b) {
    var horizontal = a.j - b.j;
    var vertical = a.i - b.i;
    if (horizontal == -1) {
      a.walls[right] = false;
      b.walls[left] = false;
    }
    else if (horizontal == 1) {
      a.walls[left] = false;
      b.walls[right] = false;
    }
    if (vertical == -1) {
      a.walls[bottom] = false;
      b.walls[top] = false;
    }
    else if (vertical == 1) {
      a.walls[top] = false;
      b.walls[bottom] = false;
    }
  }
  