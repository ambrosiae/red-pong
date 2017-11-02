import './styles/game.css';
import Game from './partials/Game'

//create game

const game = new Game('game', 512, 256);

function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop); //optimized to refresh with framerate; don't want to keep animating when user isn't using the tab
  
}

