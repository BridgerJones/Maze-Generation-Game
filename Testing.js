class Testing{

  constructor(){};
  function displayMazeToConsole(maze){
    output = [];
    for (let i = 0; i < maze.dimension; i++){
      for (let j = 0; j < maze.dimension; j++){
        if (maze.grid[i][j].isWall){
          output.push("#");
        }
        else {
          output.push("O");
        }
      }
      output.push("\n");
    }
  }

}
