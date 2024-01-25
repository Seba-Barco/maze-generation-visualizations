/*  1. Make the initial cell the current cell and mark it as visited
    2. While there are unvisited cells
        2.1 If the current cell has any neighors which have not been visited
            2.1.1 Choose randomly one of the unvisited neighbors
            2.1.2 Push the current cell to the stack
            2.1.3 Remove the wall between the current cell and the chosen cell
            2.1.4 Make the chosen cell the current cell and mark it as visited
        2.2 Else if stack is not empty
            2.2.1 Pop a cell from the stack
            2.2.2 Make it the current cell
*/
function randomizedDepthFirstSearch() {
    // Step 1
  current.visited = true;
  current.highlight();
  // Step 2
  // Step 2.1 & 2.1.1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    // Step 2.1.2
    stack.push(current);
    current.inStack = true;
    // Step 2.1.3
    removeWalls(current, next);
    // Step 2.1.4
    current = next;
    // Step 2.2
  } else if (stack.length > 0) {
    // Step 2.2.1 & 2.2.2
    current = stack.pop();
    current.inStack = false;
  }
}
