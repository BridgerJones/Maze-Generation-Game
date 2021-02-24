// array to hold all of the EventLog Objects
let events = [];
// game config object
let Config = new Configuration();
// holds the initial time stamp from which elapsed will be calculated
let start;
let initialized = Config.FALSE;
let mazeDimension = Config.MAZE_DIMENSION;
const maze = generateMaze(mazeDimension);

initEventListener();



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
  if (initialized <= Config.LOADED){
    initialized++;
  }
  if (Config.HINT_ACTIVE && Config.HINT_STATUS <= Config.HINT_LOADED){
    Config.HINT_STATUS++;
  }
}


// takes the data from EventLog when it is active and renders it to the DOM
function render() {
  if (initialized === Config.TRUE){
    renderMaze(maze);
  }
  if (Config.HINT_STATUS == Config.HINT_TRUE){
    setTimeout(renderBestPath(maze),2000);
  }

}

function initEventListener(){
  document.addEventListener('keydown', (event)=> {
    // primary up
    if (event.key === 'w'){
      console.log(event.key);
      maze.moveUp();
    }
    //primary left
    else if (event.key === 'a'){
      console.log(event.key);
    }
    // primary down
    else if (event.key === 's'){
      console.log(event.key);
    }
    // primary right
    else if (event.key === 'd'){
      console.log(event.key);
    }
    // secondary up
    else if (event.key === 'i'){
      console.log(event.key);
    }
    // secondary left
    else if (event.key === 'j'){
      console.log(event.key);
    }
    // secondary down
    else if (event.key === 'k'){
      console.log(event.key);
    }
    // secondary right
    else if (event.key === 'l'){
      console.log(event.key);
    }
    // arrow key event handling, preventDefault is added to prevent page movement
    else if (event.key === 'ArrowUp'){
      event.preventDefault();
      console.log(event.key);
    }
    else if (event.key === 'ArrowLeft'){
      event.preventDefault();
      console.log(event.key);
    }
    else if (event.key === 'ArrowDown'){
      event.preventDefault();
      console.log(event.key);
    }
    else if (event.key === 'ArrowRight'){
      event.preventDefault();
      console.log(event.key);
    }
    // toggle next hint
    else if (event.key === 'h'){
      console.log(event.key);
    }
    // toggle full solution path
    else if (event.key === 'p'){
      console.log(event.key);
    }
    // toggle breadcrumbs left behind
    else if (event.key === 'b'){
      console.log(event.key);
    }
  });
}
