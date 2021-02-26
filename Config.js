// this file will hold the configuration object as well as initialize an instance of it
class Configuration{
  // Game State
  GAME_ACTIVE = true;

  //TILE SIZE N x N
  TILE_SIZE = 48;
  // maze initialization statuses
  FALSE = 0;
  TRUE = 1;
  LOADED = 2;
  // hint active statuses
  SOLUTION_ACTIVE = false;

  // HINT STATE
  HINT_ACTIVE = false;

  //breadcrumbs
  DISPLAY_BREADCRUMBS = false;

  //timer
  TIMER = 0;
  // starting points
  SCORE = 1000000;
  // rendering timeout
  RENDERING_TIMEOUT = 2000;
  constructor(){};
}
