// this file will hold the configuration object as well as initialize an instance of it
class Configuration{
  // maze dimension
  MAZE_DIMENSION = 20;
  //TILE SIZE N x N
  TILE_SIZE = 48;
  // maze initialization statuses
  FALSE = 0;
  TRUE = 1;
  LOADED = 2;
  // hint active statuses
  HINT_STATUS = false;
  HINT_TRUE = 1;
  HINT_LOADED = 2;
  HINT_ACTIVE = false;
  // NEXT MOVE
  NEXT_MOVE = false;
  //breadcrumbs
  DISPLAY_BREADCRUMBS = false;

  //timer
  TIMER = 0;
  // starting points
  SCORE = 0;
  Configuration(){};
}
