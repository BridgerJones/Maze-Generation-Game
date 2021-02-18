// array to hold all of the EventLog Objects
let events = [];
// holds the initial time stamp from which elapsed will be calculated
let start;
let initialized = 0;
let mazeDimension = 200;
const maze = generateMaze(mazeDimension);


// initial call to start gameLoop
window.requestAnimationFrame(gameLoop);

// main game loop function, is passed a timestamp from requestAnimationFrame
function gameLoop(timestamp) {
  // if this is the first time being called, save the current time stamp as starting point
  if (start === undefined) {
    start = timestamp;
  }
  // calculate the elapsed time since function has been called
  const elapsed = timestamp - start;

  //update
  update(elapsed);
  //render
  render();
  // recursive call
  window.requestAnimationFrame(gameLoop)
}


// updates the EventLog objects contained in the events data structure
function update(elapsed) {
  if (initialized <= 2){
    initialized++;
  }
}


// takes the data from EventLog when it is active and renders it to the DOM
function render() {
  if (initialized === 1){
    renderMaze(maze);
  }

}
