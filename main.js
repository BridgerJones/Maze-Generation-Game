
function main(mazeSize){
  document.getElementById("map-select").style.display = "none";
  document.getElementById("newGame").hidden = false;
  // array to hold all of the EventLog Objects
  let events = [];
  // game config object
  let Config = new Configuration();
  // holds the initial time stamp from which elapsed will be calculated
  let start;
  let initialized = Config.FALSE;
  let mazeDimension = mazeSize;
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
    if (initialized <= Config.LOADED){
      initialized++;
    }
    // if (Config.HINT_ACTIVE && Config.HINT_STATUS <= Config.HINT_LOADED){
    //   Config.HINT_STATUS++;
    // }
    Config.TIMER = Math.floor(elapsed / 1000);
    Config.SCORE = 10000 - Config.TIMER * 5;

  }

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
          if (Config.HINT_STATUS){
            Config.HINT_STATUS = false;
            events.splice(eventIndex, 1);
          }
          else {
            Config.HINT_STATUS = true;
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
          if (Config.NEXT_MOVE){
            maze.resetNextCorrectMove();
            Config.NEXT_MOVE = false;
            events.splice(eventIndex, 1);
          }
          else {
            maze.getNextCorrectMove();
            Config.NEXT_MOVE = true;
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
    if (initialized === Config.TRUE){
      renderMaze(maze);
    }
    if (Config.HINT_STATUS === false && Config.NEXT_MOVE !== true){
      Maze(maze);
    }
    if (Config.HINT_STATUS === true){
      setTimeout(renderBestPath(maze),2000);
    }
    if (Config.NEXT_MOVE === false && Config.HINT_STATUS !== true){
      Maze(maze);
    }
    if (Config.NEXT_MOVE === true){
      setTimeout(renderNextMove(maze), 2000);
    }
    if (Config.DISPLAY_BREADCRUMBS === true){
      setTimeout(renderBreadCrumbs(maze), 2000);
    }
    if (Config.DISPLAY_BREADCRUMBS === false && Config.HINT_STATUS !== true && Config.NEXT_MOVE !== true){
      Maze(maze);
    }
    events.forEach((event, eventIndex)=>{
      if (event.status === "MOVEUP"){
        Maze(maze);
        console.log("MOVEUP RENDER CALL")

      }
      else if (event.status === "MOVELEFT"){
        Maze(maze);
        console.log("MOVELEFT RENDER CALL")

      }
      else if (event.status === "MOVEDOWN"){
        Maze(maze);
        console.log("MOVEDOWN RENDER CALL")

      }
      else if (event.status === "MOVERIGHT"){
        Maze(maze);
        console.log("MOVERIGHT RENDER CALL")

      }
    });
  }

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
