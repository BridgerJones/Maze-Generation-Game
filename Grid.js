
class Grid {
  constructor(x, y){
    this.grid = new Array(x);
    for (let i = 0; i < x; i++){
      this.grid[i] = new Array(y);
    }
    for(let i = 0; i < this.x; i++){
      for(let j = 0; j < y; j++){
        this.grid[i][j] = new Cell(i, j, x, y);
      }
    }
  }
}
