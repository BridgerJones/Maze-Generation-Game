class Cell {
  left = {
    x: null,
    y: null
  }
  top = {
    x: null,
    y: null
  }
  right = {
    x: null,
    y: null
  }
  bottom = {
    x: null,
    y: null
  }

  isWall = true;

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
  isCellWall(x, y){
    return this.grid[x][y].isWall;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


let grid = new Grid(10,10);
let startingX = getRandomInt(0,10);
let startingY = getRandomInt(0,10);
console.log(`${startingX} and ${startingY}`)

let startingCell = grid.grid[startingX][startingY];
console.log(startingCell)

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
console.log(wallList);
while (wallList.length != 0){

  let randomIndex = getRandomInt(0, wallList.length)
  let currentWall = wallList[randomIndex];

  console.log(currentWall);
  console.log(grid.grid[currentWall.x][currentWall.y]);
  let pathCount = 4;
  grid.grid[currentWall.x][currentWall.y].getWalls().forEach(wall => {
    if (grid.isCellWall(wall.x, wall.y)){
      pathCount--;
    }
  });
  if (pathCount < 3){
    grid.grid[currentWall.x][currentWall.y].isWall = false;
    grid.grid[currentWall.x][currentWall.y].getWalls().forEach(wall => {
      wallList.push(wall);
    });
  }
  // if (grid.grid[currentWall.x][currentWall.y].isPathEligible()){
  //   grid.grid[currentWall.x][currentWall.y].isWall = false;
  //
  //   grid.grid[currentWall.x][currentWall.y].getWalls().forEach(wall => {
  //     if (grid.grid[wall.x][wall.y].isWall){
  //       wallList.push(wall);
  //     }
  //   });
  // }
  wallList.splice(randomIndex, 1);

}
output = [];
for (let i = 0; i < 10; i++){
  for (let j = 0; j < 10; j++){
    if (grid.grid[i][j].isWall){
      output.push("X");
    }
    else {
      output.push(" ");
    }
  }
  output.push("\n");
}

console.log(output.toString());
