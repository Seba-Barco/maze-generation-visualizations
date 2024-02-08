// Grid
var columns = 30;
var rows = 30;
var cellSize = 25;
var grid = [];
var shadingTime = 1200;
var highlightTracker = [];

// Cell
var topWall = 0;
var rightWall = 1;
var bottomWall = 2;
var leftWall = 3;
var current;
var stack = [];

// Maze generation
var mazeComplete = false;
