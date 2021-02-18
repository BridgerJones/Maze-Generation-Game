function drawOuterWall(ctx, img){
  for (let x = 0; x <= 1104; x += 48){
    ctx.drawImage(img, x, 0);
    ctx.drawImage(img, x, 1104);
    ctx.drawImage(img, 0, x);
    ctx.drawImage(img, 1104, x);
  }
}
function OuterWall(){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawOuterWall(ctx, img);
  }

  img.src = "./assets/Tiles/OuterWallT.png";
}
function drawInnerWallN(ctx, img){
  for (let x = 96; x <= 1008; x += 48){
    ctx.drawImage(img, x, 48);
  }
}
function InnerWallN(){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallN(ctx, img);
  }
  img.src = "./assets/Tiles/OuterWallN.png";
}
function drawInnerWallS(ctx, img){
  for (let x = 96; x <= 1008; x += 48){
    ctx.drawImage(img, x, 1056);
  }
}
function InnerWallS(){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallS(ctx, img);
  }
  img.src = "./assets/Tiles/OuterWallS.png";
}

function drawInnerWallW(ctx, img){
  for (let y = 96; y <= 1008; y += 48){
    ctx.drawImage(img, 48, y);
  }
}
function InnerWallW(){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallW(ctx, img);
  }
  img.src = "./assets/Tiles/OuterWallW.png";
}

function drawInnerWallE(ctx, img){
  for (let y = 96; y <= 1008; y += 48){
    ctx.drawImage(img, 1056, y);
  }
}
function InnerWallE(){
  let canvas = document.getElementById("main");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.onload = function() {
    drawInnerWallE(ctx, img);
  }
  img.src = "./assets/Tiles/OuterWallE.png";
}
function Corners() {
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
    ctx.drawImage(cornerNE, 1056, 48);
  }
  cornerNE.src = "./assets/Tiles/OuterWallCornerNE.png";
  cornerSW.onload = function(){
    ctx.drawImage(cornerSW, 48, 1056);
  }
  cornerSW.src = "./assets/Tiles/OuterWallCornerSW.png";
  cornerSE.onload = function(){
    ctx.drawImage(cornerSE, 1056, 1056);
  }
  cornerSE.src = "./assets/Tiles/OuterWallCornerSE.png";
}
function drawWalls(maze, ctx, img){

  let x = 96;
  let y = 96;
  for (let column = 0; column < 20; column++){
    for (let row = 0; row < 20; row++){
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
  for (let column = 0; column < 20; column++){
    for (let row = 0; row < 20; row++){
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
  }
  pathImage.src = "./assets/Tiles/PathNeutral3x.png";
}
function renderMaze(maze){
  OuterWall();
  InnerWallN();
  InnerWallS();
  InnerWallW();
  InnerWallE();
  Corners();
  Maze(maze);
}
