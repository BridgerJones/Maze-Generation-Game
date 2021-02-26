// initialize the highscore element
document.getElementById("highScore").innerText = window.localStorage.getItem("highScore");
// this is the main function that holds the game loop
function main(mazeSize){
  // on game init, hide the map select
  document.getElementById("map-select").style.display = "none";
  // reveal the option to start a new game
  document.getElementById("newGame").hidden = false;
  // array to hold all of the EventLog Objects
  let events = [];
  // game config object
  let Config = new Configuration();
  // holds the initial time stamp from which elapsed will be calculated
  let start;
  // bool flag that assists in initialized state transfer
  let initialized = Config.FALSE;
  // size of the maze
  let mazeDimension = mazeSize;
  // get a maze for this game session
  const maze = generateMaze(mazeDimension);
  // initialize controls
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
    // handle EventObjects created by player input
    processInput(elapsed);
    //update
    update(elapsed);
    //render
    render();
    // recursive call
    window.requestAnimationFrame(gameLoop)
  }


  // updates the EventLog objects contained in the events data structure
  function update(elapsed) {
    // if game has not been won yet
    if (Config.GAME_ACTIVE){
      if (initialized <= Config.LOADED){
        initialized++;
      }
      if (maze.isGameOver() === false){
        // setting the timer
        Config.TIMER = Math.floor(elapsed / 1000);
        // additional penalty for solution being displayed
        if (Config.SOLUTION_ACTIVE){
          Config.SCORE = Config.SCORE - (Config.TIMER + 2500);
        }
        // additional penalty for hint being displayed
        else if (Config.HINT_ACTIVE){
          Config.SCORE = Config.SCORE - (Config.TIMER + 500);
        }
        // default point deduction without modifiers
        else {
          Config.SCORE = Config.SCORE - Config.TIMER;
        }
      }

      else {
        Config.GAME_ACTIVE = false;

      }
    }

  }
  // handle input from controls and call respective methods
  function processInput(){
    events.forEach((event, eventIndex)=>{
      if (event.status === "MOVEUP"){
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          maze.moveUp();
        }
        else {
          events.splice(eventIndex, 1);
        }

      }
      else if (event.status === "MOVELEFT"){
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          maze.moveLeft();
        }
        else {
          events.splice(eventIndex, 1);
        }

      }
      else if (event.status === "MOVEDOWN"){
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          maze.moveDown();
        }
        else {
          events.splice(eventIndex, 1);
        }

      }
      else if (event.status === "MOVERIGHT"){
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          maze.moveRight();
        }
        else {
          events.splice(eventIndex, 1);
        }

      }

      else if (event.status === "TOGGLEPATH"){
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          if (Config.SOLUTION_ACTIVE){
            Config.SOLUTION_ACTIVE = false;
            events.splice(eventIndex, 1);
          }
          else {
            Config.SOLUTION_ACTIVE = true;
            events.splice(eventIndex, 1);
          }


        }
        else {
          events.splice(eventIndex, 1);
        }

      }
      else if (event.status === "TOGGLEHINT"){
        console.log(event);
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          if (Config.HINT_ACTIVE){
            maze.resetNextCorrectMove();
            Config.HINT_ACTIVE = false;
            events.splice(eventIndex, 1);
          }
          else {
            maze.getNextCorrectMove();
            Config.HINT_ACTIVE = true;
            events.splice(eventIndex, 1);
          }


        }
        else {
          events.splice(eventIndex, 1);
        }

      }
      else if (event.status === "TOGGLEBREADCRUMB"){
        console.log(event);
        event.cycleCount++;
        if (event.cycleCount <= event.lifeCycle){
          if (Config.DISPLAY_BREADCRUMBS){
            maze.resetNextCorrectMove();
            Config.DISPLAY_BREADCRUMBS = false;
            events.splice(eventIndex, 1);
          }
          else {
            maze.getNextCorrectMove();
            Config.DISPLAY_BREADCRUMBS = true;
            events.splice(eventIndex, 1);
          }


        }
        else {
          events.splice(eventIndex, 1);
        }

      }
    });
  }
  // takes the data from EventLog when it is active and renders it to the DOM
  function render() {

    let timer = document.getElementById("time");
    timer.innerText = Config.TIMER;

    let points = document.getElementById("score");
    points.innerText = Config.SCORE;

    let alertHint = document.getElementById("alertHint");
    let alertSolution = document.getElementById("alertSolution");
    let alertWin = document.getElementById("alertWin");
    // this draws the whole maze initially
    if (initialized === Config.TRUE){
      renderMaze(maze);
    }
    if (Config.SOLUTION_ACTIVE === false && Config.HINT_ACTIVE !== true){
      renderInnerMaze(maze);
      alertSolution.hidden = true;
    }
    if (Config.SOLUTION_ACTIVE === true){
      // timeout is used to help avoid rendering conflict on larger maze sizes, sizes larger than 50 X 50 may need a longer rendering timeout
      setTimeout(renderBestPath(maze),Config.RENDERING_TIMEOUT);
      alertSolution.hidden = false;
    }
    if (Config.HINT_ACTIVE === false && Config.SOLUTION_ACTIVE !== true){
      renderInnerMaze(maze);
      alertHint.hidden = true;
    }
    if (Config.HINT_ACTIVE === true){
      // timeout is used to help avoid rendering conflict on larger maze sizes, sizes larger than 50 X 50 may need a longer rendering timeout
      setTimeout(renderNextMove(maze), Config.RENDERING_TIMEOUT);
      alertHint.hidden = false;
    }
    if (Config.DISPLAY_BREADCRUMBS === true){
      // timeout is used to help avoid rendering conflict on larger maze sizes, sizes larger than 50 X 50 may need a longer rendering timeout
      setTimeout(renderBreadCrumbs(maze), Config.RENDERING_TIMEOUT);
    }
    if (Config.DISPLAY_BREADCRUMBS === false && Config.SOLUTION_ACTIVE !== true && Config.HINT_ACTIVE !== true){
      renderInnerMaze(maze);
    }
    events.forEach((event, eventIndex)=>{
      if (event.status === "MOVEUP"){
        renderInnerMaze(maze);
        console.log("MOVEUP RENDER CALL")

      }
      else if (event.status === "MOVELEFT"){
        renderInnerMaze(maze);
        console.log("MOVELEFT RENDER CALL")

      }
      else if (event.status === "MOVEDOWN"){
        renderInnerMaze(maze);
        console.log("MOVEDOWN RENDER CALL")

      }
      else if (event.status === "MOVERIGHT"){
        renderInnerMaze(maze);
        console.log("MOVERIGHT RENDER CALL")

      }

    });
    // on game win
    if (Config.GAME_ACTIVE === false){
      alertWin.hidden = false;
      document.getElementById("credits").hidden = false;
      // if the current score is greater than the stored high score, save it to localStorage and display
      if (window.localStorage.getItem("highScore") < Config.SCORE || window.localStorage.getItem("highScore") === undefined){
        window.localStorage.setItem("highScore", Config.SCORE);
        document.getElementById("highScore").innerText =window.localStorage.getItem("highScore");
      }

    }

  }
  // sets up all of the control inputs
  function initEventListener(){
    document.addEventListener('keydown', (event)=> {
      // primary up
      if (event.key === 'w'){
        console.log(event.key);
        events.push(new EventObject("MOVEUP", 1));
        console.log(events);
      }
      //primary left
      else if (event.key === 'a'){
        events.push(new EventObject("MOVELEFT", 1));
        console.log(event.key);
      }
      // primary down
      else if (event.key === 's'){
        console.log(event.key);
        events.push(new EventObject("MOVEDOWN", 1));
      }
      // primary right
      else if (event.key === 'd'){
        console.log(event.key);
        events.push(new EventObject("MOVERIGHT", 1));
      }
      // secondary up
      else if (event.key === 'i'){
        console.log(event.key);
        events.push(new EventObject("MOVEUP", 1));
      }
      // secondary left
      else if (event.key === 'j'){
        events.push(new EventObject("MOVELEFT", 1));
        console.log(event.key);
      }
      // secondary down
      else if (event.key === 'k'){
        console.log(event.key);
        events.push(new EventObject("MOVEDOWN", 1));
      }
      // secondary right
      else if (event.key === 'l'){
        console.log(event.key);
        events.push(new EventObject("MOVERIGHT", 1));
      }
      // arrow key event handling, preventDefault is added to prevent page movement
      else if (event.key === 'ArrowUp'){
        event.preventDefault();
        events.push(new EventObject("MOVEUP", 1));
        console.log(event.key);
      }
      else if (event.key === 'ArrowLeft'){
        event.preventDefault();
        events.push(new EventObject("MOVELEFT", 1));
        console.log(event.key);
      }
      else if (event.key === 'ArrowDown'){
        event.preventDefault();
        events.push(new EventObject("MOVEDOWN", 1));
        console.log(event.key);
      }
      else if (event.key === 'ArrowRight'){
        event.preventDefault();
        events.push(new EventObject("MOVERIGHT", 1));
        console.log(event.key);
      }
      // toggle next hint
      else if (event.key === 'h'){
        events.push(new EventObject("TOGGLEHINT", 1));
        console.log(event.key);
      }
      // toggle full solution path
      else if (event.key === 'p'){
        events.push(new EventObject("TOGGLEPATH", 1));
        console.log(event.key);
      }
      // toggle breadcrumbs left behind
      else if (event.key === 'b'){
        events.push(new EventObject("TOGGLEBREADCRUMB", 1));
        console.log(event.key);
      }
    });
    // inner class that is used to represent Events as they enter the events list
    class EventObject{
      status = "";
      lifeCycle = 0;
      cycleCount = 0;

      constructor(status, lifeCycle){
        this.status = status;
        this.lifeCycle = lifeCycle;
      }
    }
  }

}
