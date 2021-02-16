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
  isCellPath(x, y){
    return !this.grid[x][y].isWall;
  }
}
