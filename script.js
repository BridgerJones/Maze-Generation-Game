function drawOuterWall(ctx, img, outerWallBound){
  for (let x = 0; x <= outerWallBound; x += 48){
    ctx.drawImage(img, x, 0);
    ctx.drawImage(img, x, outerWallBound);
    ctx.drawImage(img, 0, x);
    ctx.drawImage(img, outerWallBound, x);
  }
}
function OuterWall(outerWallBound){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawOuterWall(ctx, img, outerWallBound);
  }

  img.src = "./assets/Tiles/OuterWallT.png";
}
function drawInnerWallN(ctx, img, innerWallBound){
  for (let x = 96; x <= innerWallBound; x += 48){
    ctx.drawImage(img, x, 48);
  }
}
function InnerWallN(innerWallBound){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallN(ctx, img, innerWallBound);
  }
  img.src = "./assets/Tiles/OuterWallN.png";
}
function drawInnerWallS(ctx, img, innerWallBound, drawingBound){
  for (let x = 96; x <= innerWallBound; x += 48){
    ctx.drawImage(img, x, drawingBound);
  }
}
function InnerWallS(innerWallBound, drawingBound){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallS(ctx, img, innerWallBound, drawingBound);
  }
  img.src = "./assets/Tiles/OuterWallS.png";
}

function drawInnerWallW(ctx, img, innerWallBound){
  for (let y = 96; y <= innerWallBound; y += 48){
    ctx.drawImage(img, 48, y);
  }
}
function InnerWallW(innerWallBound){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallW(ctx, img, innerWallBound);
  }
  img.src = "./assets/Tiles/OuterWallW.png";
}

function drawInnerWallE(ctx, img, innerWallBound, drawingBound){
  for (let y = 96; y <= innerWallBound; y += 48){
    ctx.drawImage(img, drawingBound, y);
  }
}
function InnerWallE(innerWallBound, drawingBound){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallE(ctx, img, innerWallBound, drawingBound);
  }
  img.src = "./assets/Tiles/OuterWallE.png";
}
function Corners(cornerBound) {


  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let cornerNW = new Image();
  let cornerNE = new Image();
  let cornerSW = new Image();
  let cornerSE = new Image();
  cornerNW.onload = function(){
    ctx.drawImage(cornerNW, 48, 48);
  }
  cornerNW.src = "./assets/Tiles/OuterWallCornerNW.png";
  cornerNE.onload = function(){
    ctx.drawImage(cornerNE, cornerBound, 48);
  }
  cornerNE.src = "./assets/Tiles/OuterWallCornerNE.png";
  cornerSW.onload = function(){
    ctx.drawImage(cornerSW, 48, cornerBound);
  }
  cornerSW.src = "./assets/Tiles/OuterWallCornerSW.png";
  cornerSE.onload = function(){
    ctx.drawImage(cornerSE, cornerBound, cornerBound);
  }
  cornerSE.src = "./assets/Tiles/OuterWallCornerSE.png";
}
function drawWalls(maze, ctx, img){

  let x = 96;
  let y = 96;
  for (let column = 0; column < maze.dimension; column++){
    for (let row = 0; row < maze.dimension; row++){
      console.log(`x: ${x} y: ${y}`);
      if (maze.grid[column][row].isWall){
        ctx.drawImage(img, x, y);
      }
      x += 48
    }
    x = 96;
    y += 48;
  }
}

function drawPaths(maze, ctx, img){

  let x = 96;
  let y = 96;
  for (let column = 0; column < maze.dimension; column++){
    for (let row = 0; row < maze.dimension; row++){
      console.log(`x: ${x} y: ${y}`);
      if (maze.grid[column][row].isWall === false){
        ctx.drawImage(img, x, y);
      }
      x += 48
    }
    x = 96;
    y += 48;
  }
}

function drawPlayer(maze, ctx, img){

  let x = 96;
  let y = 96;
  for (let column = 0; column < maze.dimension; column++){
    for (let row = 0; row < maze.dimension; row++){
      console.log(`x: ${x} y: ${y}`);
      if (maze.grid[column][row].containsPlayer){
        console.log(`Player drawn at ${column}, ${row}`)
        ctx.drawImage(img, x, y);
      }
      x += 48
    }
    x = 96;
    y += 48;
  }
}

function drawExit(maze, ctx, img){

  let x = 96;
  let y = 96;
  for (let column = 0; column < maze.dimension; column++){
    for (let row = 0; row < maze.dimension; row++){
      console.log(`x: ${x} y: ${y}`);
      if (maze.grid[column][row].isExit === true){
        ctx.drawImage(img, x, y);
      }
      x += 48
    }
    x = 96;
    y += 48;
  }
}
function Maze(maze){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");

  let wallImage = new Image();
  wallImage.onload = function(){
    drawWalls(maze, ctx, wallImage);
  }
  wallImage.src = "./assets/Tiles/Wall.png";

  let pathImage = new Image();
  pathImage.onload = function(){
    drawPaths(maze, ctx, pathImage);
    // draw the player after path images have rendered
    let playerImage = new Image();
    playerImage.onload = function(){
      drawPlayer(maze, ctx, playerImage);
    }
    playerImage.src = "./assets/Player.png";
    // draw the exit after the path images have rendered
    let exitImage = new Image();
    exitImage.onload = function(){
      drawExit(maze, ctx, exitImage);
    }
    exitImage.src = "./assets/Tiles/PathExit.png";
  }
  pathImage.src = "./assets/Tiles/PathNeutral3x.png";

  let exitImage = new Image();
  exitImage.onload = function(){
    drawExit(maze, ctx, exitImage);
  }
  exitImage.src = "./assets/Tiles/PathExit.png";
}
function renderBestPath(maze){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let bestPathImage = new Image();
  bestPathImage.onload = function(){
    let x = 96;
    let y = 96;
    for (let column = 0; column < maze.dimension; column++){
      for (let row = 0; row < maze.dimension; row++){
        console.log(`x: ${x} y: ${y}`);
        if (maze.grid[column][row].isVisited ){
          ctx.drawImage(bestPathImage, x, y);
        }
        x += 48
      }
      x = 96;
      y += 48;
    }
    // draw the player after path images have rendered
    let playerImage = new Image();
    playerImage.onload = function(){
      drawPlayer(maze, ctx, playerImage);
    }
    playerImage.src = "./assets/Player.png";
  }
  bestPathImage.src = "./assets/Tiles/PathHint3x.png";

}
function renderMaze(maze){
  // resize canvas if not default canvas element
  let canvas = document.getElementById("main");
  let canvasBounds = (maze.dimension + 4) * 48;
  canvas.width = canvasBounds;
  canvas.height = canvasBounds;
  let outerWallBound = (maze.dimension + 3) * 48;
  let innerWallBound = (maze.dimension + 1) * 48;
  let cornerBound = (maze.dimension + 2) * 48;
  let drawingBound = (maze.dimension + 2) * 48;

  OuterWall(outerWallBound);
  InnerWallN(innerWallBound);
  InnerWallS(innerWallBound, drawingBound);
  InnerWallW(innerWallBound);
  InnerWallE(innerWallBound, drawingBound);
  Corners(cornerBound);
  Maze(maze);

}
