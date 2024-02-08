// Grid
var columns = 8;
var rows = 8;
var cellSize = 30;
var grid = [];
var shadingTime = 1200;
var highlightTracker = [];
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
