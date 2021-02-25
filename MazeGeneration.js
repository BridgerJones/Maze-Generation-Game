class Cell {
  left = {
    x: "NULL",
    y: "NULL"
  }
  top = {
    x: "NULL",
    y: "NULL"
  }
  right = {
    x: "NULL",
    y: "NULL"
  }
  bottom = {
    x: "NULL",
    y: "NULL"
  }

  isWall = true;

  isNeutral = true;

  isCorrectPath = false;

  isMarked = false;

  isHint = false;

  isStartingPoint = false;

  isExit = false;

  containsPlayer = false;

  isVisited = false;

  distanceCounter = 0;

  isNextMove = false;




  constructor(x, y, xMax, yMax){
    this.x = x;
    this.y = y;
    // top left corner
    if (x == 0 && y == 0) {
      this.right.x = x + 1;
      this.right.y = y;
      this.bottom.x = x;
      this.bottom.y = y + 1;
      this.left = null;
      this.top = null;
    }
    // top right corner
    else if (x == xMax && y == 0){
      this.left.x = x - 1;
      this.left.y = y;
      this.bottom.x = x;
      this.bottom.y = y + 1;
      this.top = null;
      this.right = null;
    }
    // bottom right corner
    else if (x == xMax && y == yMax){
      this.top.x = x;
      this.top.y = y - 1;
      this.left.x = x - 1;
      this.left.y = y;
      this.bottom = null;
      this.right = null;
    }
    // bottom left corner
    else if (x == 0 && y == yMax){
      this.top.x = x;
      this.top.y = y - 1;
      this.right.x = x + 1;
      this.right.y = y;
      this.bottom = null;
      this.left = null;
    }
    // left edge
    else if (x == 0){
      this.top.x = x;
      this.top.y = y - 1;
      this.right.x = x + 1;
      this.right.y = y;
      this.bottom.x = x;
      this.bottom.y = y + 1;
      this.left = null;
    }
    // top edge
    else if (y == 0){
      this.left.x = x - 1;
      this.left.y = y;
      this.right.x = x + 1;
      this.right.y = y;
      this.bottom.x = x;
      this.bottom.y = y + 1;
      this.top = null;
    }
    // right edge
    else if (x == xMax){
      this.left.x = x - 1;
      this.left.y = y;
      this.top.x = x;
      this.top.y = y - 1;
      this.bottom.x = x;
      this.bottom.y = y + 1;
      this.right = null;
    }
    //bottom edge
    else if (y == yMax){
      this.left.x = x - 1;
      this.left.y = y;
      this.top.x = x;
      this.top.y = y - 1;
      this.right.x = x + 1;
      this.right.y = y;
      this.bottom = null;
    }
    else {
      this.left.x = x - 1;
      this.left.y = y;
      this.top.x = x;
      this.top.y = y - 1;
      this.right.x = x + 1;
      this.right.y = y;
      this.bottom.x = x;
      this.bottom.y = y + 1;
    }
  }

  getWalls(){
    let walls = [];
    if (this.left != null){
      walls.push(this.left);
    }
    if (this.top != null){
      walls.push(this.top);
    }
    if (this.right != null){
      walls.push(this.right);
    }
    if (this.bottom != null){
      walls.push(this.bottom);
    }
    return walls;
  }
}

class Grid {

  dimension = 0;

  constructor(x, y){
    this.grid = new Array(x);
    for (let i = 0; i < x; i++){
      this.grid[i] = new Array(y);
    }
    for(let i = 0; i < x; i++){
      for(let j = 0; j < y; j++){
        this.grid[i][j] = new Cell(i, j, x -1, y - 1);
      }
    }
  }
  isCellPath(x, y){
    return !this.grid[x][y].isWall;
  }
  getStartingCell(){
    for (let i = 0; i < this.dimension; i++){
      for (let j = 0; j < this.dimension; j++){
        if (this.grid[i][j].isStartingPoint){
          return {x: i, y: j};
        }
      }
    }
  }

  getNextCorrectMove(){
    let playerCord = this.getPlayerPosition();
    let currentCell = this.grid[playerCord.x][playerCord.y];
    let neighbors = [];
    let top;
    let left;
    let right;
    let bottom;

    if (currentCell.top !== null){
      top = this.grid[currentCell.top.x][currentCell.top.y];
      neighbors.push(top);
    }
    if (currentCell.left !== null){
      left = this.grid[currentCell.left.x][currentCell.left.y];
      neighbors.push(left);
    }
    if (currentCell.right !== null){
      right = this.grid[currentCell.right.x][currentCell.right.y];
      neighbors.push(right);
    }
    if (currentCell.bottom !== null){
      bottom = this.grid[currentCell.bottom.x][currentCell.bottom.y];
      neighbors.push(bottom);
    }
    for (let i = 0; i < neighbors.length; i++){
      if (neighbors[i].isCorrectPath && neighbors[i].distanceCounter > currentCell.distanceCounter){
        neighbors[i].isNextMove = true;
      }
    }
    console.log(currentCell);
    console.log(neighbors);

  }
  resetNextCorrectMove(){
    for (let i = 0; i < this.dimension; i++){
      for (let j = 0; j < this.dimension; j++){
        if (this.grid[i][j].isNextMove){
          this.grid[i][j].isNextMove = false;
        }
      }
    }
  }

  getPlayerPosition(){
    for (let i = 0; i < this.dimension; i++){
      for (let j = 0; j < this.dimension; j++){
        if (this.grid[i][j].containsPlayer){
          return {x: i, y: j};
        }
      }
    }
  }

  moveUp(){
    let currentPlayerCord = this.getPlayerPosition();
    let top;
    let currentPlayerCell = this.grid[currentPlayerCord.x][currentPlayerCord.y];
    console.log(currentPlayerCell)
      if (currentPlayerCell.top != null){
        top = this.grid[currentPlayerCell.top.x][currentPlayerCell.top.y];
      }


    if (top != null && top.isWall === false){
      currentPlayerCell.containsPlayer = false;
      top.containsPlayer = true;
    }
  }

  moveDown(){
    let currentPlayerCord = this.getPlayerPosition();
    let bottom;
    let currentPlayerCell = this.grid[currentPlayerCord.x][currentPlayerCord.y];
    console.log(currentPlayerCell)
      if (currentPlayerCell.bottom != null){
        bottom = this.grid[currentPlayerCell.bottom.x][currentPlayerCell.bottom.y];
      }


    if (bottom != null && bottom.isWall === false){
      currentPlayerCell.containsPlayer = false;
      bottom.containsPlayer = true;
    }
  }

  moveLeft(){
    let currentPlayerCord = this.getPlayerPosition();
    let left;
    let currentPlayerCell = this.grid[currentPlayerCord.x][currentPlayerCord.y];
    console.log(currentPlayerCell)
      if (currentPlayerCell.left != null){
        left = this.grid[currentPlayerCell.left.x][currentPlayerCell.left.y];
      }


    if (left != null && left.isWall === false){
      currentPlayerCell.containsPlayer = false;
      left.containsPlayer = true;
    }
  }

  moveRight(){
    let currentPlayerCord = this.getPlayerPosition();
    let right;
    let currentPlayerCell = this.grid[currentPlayerCord.x][currentPlayerCord.y];
    console.log(currentPlayerCell)
      if (currentPlayerCell.right != null){
        right = this.grid[currentPlayerCell.right.x][currentPlayerCell.right.y];
      }


    if (right != null && right.isWall === false){
      currentPlayerCell.containsPlayer = false;
      right.containsPlayer = true;
    }
  }

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function generateMaze(dimension){
  let grid = new Grid(dimension,dimension);
  // create size property on maze object
  grid.dimension = dimension;
  let startingX = getRandomInt(0,dimension);
  let startingY = getRandomInt(0,dimension);


  let startingCell = grid.grid[startingX][startingY];


  // wallList
  let wallList = [];
  //mark starting cell as a path
  startingCell.isWall = false;
  // add the starting cells walls to list
  startingCell.getWalls().forEach(wall => {
    if (grid.grid[wall.x][wall.y].isWall){
      wallList.push(wall);
    }

  });

  while (wallList.length != 0){

    let randomIndex = getRandomInt(0, wallList.length)
    let currentWall = wallList[randomIndex];



    let pathCount = 0;
    grid.grid[currentWall.x][currentWall.y].getWalls().forEach(wall => {
      if (grid.isCellPath(wall.x, wall.y)){
        pathCount++;
      }
    });
    if (pathCount < 2){
      grid.grid[currentWall.x][currentWall.y].isWall = false;
      grid.grid[currentWall.x][currentWall.y].getWalls().forEach(wall => {
        wallList.push(wall);
      });
    }
    wallList.splice(randomIndex, 1);
  }
  createStart(grid);
  createExit(grid);
  findShortestPath(grid);

  return grid;
}
function createStart(grid){
  let isCreated = false;
  while (isCreated === false){

    let randomColumn = getRandomInt(0, grid.dimension );

    let cell = grid.grid[0][randomColumn];

    if (cell.isWall === false){
      cell.isStartingPoint = true;
      cell.containsPlayer = true;
      cell.isVisited = true;
      isCreated = true;
    }
  }
}
function createExit(grid){
  let isCreated = false;
  while (isCreated === false){

    let randomColumn = getRandomInt(0, grid.dimension );

    let cell = grid.grid[grid.dimension - 1][randomColumn];

    if (cell.isWall === false){
      cell.isExit = true;
      isCreated = true;
    }
  }
}

function findShortestPath(grid){
  let paths = [];
  let startingCell = grid.getStartingCell();

  let distance = 0;
  paths.push(grid.grid[startingCell.x][startingCell.y]);



  while (paths.length !== 0){
    let currentCell = paths.shift();
    if (currentCell.isExit){

      while (currentCell.isStartingPoint === false){
        if (currentCell.top !== null){
          let topCell = grid.grid[currentCell.top.x][currentCell.top.y];
          if (topCell.distanceCounter < currentCell.distanceCounter && topCell.isWall === false && topCell.isVisited){
            currentCell = topCell;
            currentCell.isCorrectPath = true;

          }
        }
        if (currentCell.right !== null){
          let rightCell = grid.grid[currentCell.right.x][currentCell.right.y];
          if (rightCell.distanceCounter < currentCell.distanceCounter && rightCell.isWall === false && rightCell.isVisited){

            currentCell = rightCell;
            currentCell.isCorrectPath = true;
          }
        }
        if (currentCell.bottom !== null){
          let bottomCell = grid.grid[currentCell.bottom.x][currentCell.bottom.y];
          if (bottomCell.distanceCounter < currentCell.distanceCounter && bottomCell.isWall === false && bottomCell.isVisited){

            currentCell = bottomCell;
            currentCell.isCorrectPath = true;
          }
        }
        if (currentCell.left !== null){
          let leftCell = grid.grid[currentCell.left.x][currentCell.left.y];
          if (leftCell.distanceCounter < currentCell.distanceCounter && leftCell.isWall === false && leftCell.isVisited){

            currentCell = leftCell;
            currentCell.isCorrectPath = true;
          }
        }

      }

      return currentCell.distanceCounter;
    }
    if (currentCell.top !== null){
      let topCell = grid.grid[currentCell.top.x][currentCell.top.y];
      if (topCell !== undefined && topCell.isWall == false && topCell.isVisited == false){
        topCell.distanceCounter = (currentCell.distanceCounter + 1);
        topCell.isVisited = true;
        paths.push(topCell);
      }
    }
    if (currentCell.right !== null){
      let rightCell = grid.grid[currentCell.right.x][currentCell.right.y];
      if (rightCell !== undefined && rightCell.isWall == false && rightCell.isVisited == false){
        rightCell.distanceCounter = (currentCell.distanceCounter + 1);
        rightCell.isVisited = true;
        paths.push(rightCell);
      }
    }
    if (currentCell.bottom !== null){
      let bottomCell = grid.grid[currentCell.bottom.x][currentCell.bottom.y];
      if (bottomCell !== undefined && bottomCell.isWall == false && bottomCell.isVisited == false){
        bottomCell.distanceCounter = (currentCell.distanceCounter + 1);
        bottomCell.isVisited = true;
        paths.push(bottomCell);
      }
    }
    if (currentCell.left !== null){
      let leftCell = grid.grid[currentCell.left.x][currentCell.left.y];
      if (leftCell !== undefined && leftCell.isWall == false && leftCell.isVisited == false){
        leftCell.distanceCounter = (currentCell.distanceCounter + 1);
        leftCell.isVisited = true;
        paths.push(leftCell);
      }
    }

  }


}
function displayMazeToConsole(maze){
  output = [];
  for (let i = 0; i < maze.dimension; i++){
    for (let j = 0; j < maze.dimension; j++){
      if (maze.grid[i][j].isWall){
        output.push("#");
      }
      else {
        output.push("O");
      }
    }
    output.push("\n");
  }




}
