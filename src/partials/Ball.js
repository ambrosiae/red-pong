import {SVG_NS} from '../settings.js';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.reset();
  }
  reset(){
    this.x = this.boardWidth/2;
    this.y = this.boardHeight/2;
    
    this.vy = Math.floor(Math.random()*10-5);
    this.vx = this.direction*( 6 - Math.abs(this.vy));
    
    while (this.vy===0){
      this.vy=Math.floor((Math.random()+1.5)*12-6);
    }
  }
  
  wallCollision(paddle1,paddle2){
    const hitLeft = this.x-this.radius <=0;
    const hitRight = this.x+this.radius >=this.boardWidth;
    const hitTop = this.y - this.radius <=0;
    const hitBottom = this.y + this.radius >=this.boardHeight;
    
    if (hitLeft){
      this.goal(paddle2);
      this.direction=-1;
    } else if (hitRight) {
      this.goal(paddle1); 
      this.direction=1;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }
  
  paddleCollision(paddle1,paddle2){
    if (this.vx>0){
      //Detect collision on right
      let paddle = paddle2.coordinates(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
      let {leftX, topY, bottomY} = paddle;
      
      if (
        this.x + this.radius >= leftX
        && this.y >= topY
        && this.y <=bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      } 
    } else {
      //Detect collision on left
      let paddle = paddle1.coordinates(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
      let {rightX, topY, bottomY} = paddle;
      
      if (this.x - this.radius <= rightX
        && this.y >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }
  
  goal(paddle){
    paddle.score ++
    this.reset();
  }
  
  render(svg, paddle1, paddle2){
    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision(paddle1, paddle2);
    this.paddleCollision(paddle1, paddle2);
    
    let circle=document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'fill', '#800080');    
    svg.appendChild(circle);
  }
}