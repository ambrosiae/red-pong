import {SVG_NS, KEYS} from '../settings.js';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
	
	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.boardGap = 20;
		this.paddleWidth = 16;
		this.paddleHeight = 112;
		this.radius = 16;
		
		this.score1 = new Score (400, 50, 60);
		this.score2 = new Score (600, 50, 60);
		
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
		
		this.paddle1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height-this.paddleHeight)/2,
			KEYS.a,
			KEYS.z
		);
		
		this.paddle2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width-this.boardGap-this.paddleWidth), (this.height-this.paddleHeight)/2,
			KEYS.up,
			KEYS.down
		);
		
		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
		);

		this.ballplus = new Ball(
			this.radius,
			this.width,
			this.height,
		);
		
		this.ballplus2 = new Ball(
			this.radius,
			this.width,
			this.height,
		);
		
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar){
				this.pause = !this.pause;
			}
			
		});
	}
	
	render() {
		if (this.pause){
			return;}
			
			this.gameElement.innerHTML='';
			let svg = document.createElementNS(SVG_NS, 'svg');
			svg.setAttributeNS(null, 'width', this.width);
			svg.setAttributeNS(null, 'height', this.height);
			svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
			svg.setAttributeNS(null, 'version', '1.1');
			
			this.gameElement.appendChild(svg);
			this.board.render(svg);
			this.ball.render(svg, this.paddle1, this.paddle2);
			this.paddle1.render(svg);
			this.paddle2.render(svg);
			this.score1.render(svg, this.paddle1.score);
			this.score2.render(svg, this.paddle2.score);
			
			if (this.paddle1.score>=3 || this.paddle2.score>=3){
				this.ballplus.render(svg, this.paddle1, this.paddle2);
			} else {
				return;
			}

			if (this.paddle1.score>=6 || this.paddle2.score>=6){
				this.ballplus2.render(svg, this.paddle1, this.paddle2);
			} else {
				return;
			}	

			if (this.paddle1.score===15){
				alert('Player 1 wins!');
			} else if (this.paddle2.score===15){
				alert('Player 2 wins!');
			}
			
		}
		
	}