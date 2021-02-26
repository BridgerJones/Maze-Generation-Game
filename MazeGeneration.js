



// helper method to generate random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
// this generates a grid object that has been populated with maze logic
// it makes use of the Prims Randomized algorithm to generate maze logic
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
  // initialize more maze logic
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
      cell.isMarked = true;
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
// this method makes use of a stack to travel every path tile, once it reaches the end
// it loops from the exit to the start point only along the shortest path
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
