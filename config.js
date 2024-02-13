// Grid
var columns = 15;
var rows = 15;
var cellSize = 40;
var grid = [];
var startingCell = 0;
var shadingTime = 1200;
var fadingTracker = [];
var availableWalls = [];

// Cell
var topWall = 0;
var rightWall = 1;
var bottomWall = 2;
var leftWall = 3;
var current;
var stack = [];

// Maze generation
var mazeComplete = false;