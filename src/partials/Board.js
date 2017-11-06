import {SVG_NS} from '../settings.js';

export default class Board{
  constructor(width, height){
    this.width=width;
    this.height=height;
  }
  
  render(svg){
		let rect = document.createElementNS(SVG_NS, 'rect');
		rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#dcceee');
    svg.appendChild(rect);
    
    let line = document.createElementNS(SVG_NS, 'line');
    line.setAttributeNS(null, 'x1', this.width/2);
    line.setAttributeNS(null, 'x2', this.width/2);
    line.setAttributeNS(null, 'y1', 0);
    line.setAttributeNS(null, 'y2', this.height);
    line.setAttributeNS(null, 'stroke', '#800080');    
    line.setAttributeNS(null, 'stroke-dasharray', 10, 5);
    line.setAttributeNS(null, 'stroke-width', 3);
    svg.appendChild(line);
  }
}

