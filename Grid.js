class Grid {

  dimension = 0;
  // create the 2d array and populate with cell objects
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
  // returns bool
  isCellPath(x, y){
    return !this.grid[x][y].isWall;
  }
  // returns coordinates for starting cell
  getStartingCell(){
    for (let i = 0; i < this.dimension; i++){
      for (let j = 0; j < this.dimension; j++){
        if (this.grid[i][j].isStartingPoint){
          return {x: i, y: j};
        }
      }
    }
  }
  // marks the next correct move
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
  // resets the next correct move on toggle off
  resetNextCorrectMove(){
    for (let i = 0; i < this.dimension; i++){
      for (let j = 0; j < this.dimension; j++){
        if (this.grid[i][j].isNextMove){
          this.grid[i][j].isNextMove = false;
        }
      }
    }
  }
  // returns the coordinates of the player
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
      top.isMarked = true;
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
      bottom.isMarked = true;
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
      left.isMarked = true;
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
      right.isMarked = true;
    }
  }
  // returns bool
  isGameOver(){
    let playerCord = this.getPlayerPosition();
    let playerCell = this.grid[playerCord.x][playerCord.y];
    if (playerCell.isExit){
      return true;
    }
    else {
      return false;
    }
  }
}
