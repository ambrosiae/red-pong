import {SVG_NS} from '../settings.js';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down){
    this.width = width;
    this.boardHeight = boardHeight;    
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
    
    document.addEventListener('keydown', event => {
      switch(event.key){
        case up: this.up();
        break;
        case down: this.down();
        break;
      }
    });
  }
  
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return {leftX, rightX, topY, bottomY};
  }
  
  up(){
    //get max number. either 0 or y position-speed.
    this.y = Math.max(this.y - this.speed, 0);
  }
  
  down(){
    //get min or the height of board - height of paddle or y position+speed.
    this.y = Math.min(this.y + this.speed, this.boardHeight-this.height);
  }
  
  render(svg){
    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#800080');
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    svg.appendChild(rect);
    
  }
  
}