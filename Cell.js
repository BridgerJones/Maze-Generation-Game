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
