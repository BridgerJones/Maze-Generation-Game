function drawOuterWall(ctx, img){
  for (let x = 0; x <= 1008; x += 48){
    ctx.drawImage(img, x, 0);
    ctx.drawImage(img, x, 1008);
    ctx.drawImage(img, 0, x);
    ctx.drawImage(img, 1008, x);
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
  for (let x = 96; x <= 912; x += 48){
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
  for (let x = 96; x <= 912; x += 48){
    ctx.drawImage(img, x, 960);
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
  for (let y = 96; y <= 912; y += 48){
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
  for (let y = 96; y <= 912; y += 48){
    ctx.drawImage(img, 960, y);
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
    ctx.drawImage(cornerNE, 960, 48);
  }
  cornerNE.src = "./assets/Tiles/OuterWallCornerNE.png";
  cornerSW.onload = function(){
    ctx.drawImage(cornerSW, 48, 960);
  }
  cornerSW.src = "./assets/Tiles/OuterWallCornerSW.png";
  cornerSE.onload = function(){
    ctx.drawImage(cornerSE, 960, 960);
  }
  cornerSE.src = "./assets/Tiles/OuterWallCornerSE.png";
}
window.onload = function() {
  OuterWall();
  InnerWallN();
  InnerWallS();
  InnerWallW();
  InnerWallE();
  Corners();


}
