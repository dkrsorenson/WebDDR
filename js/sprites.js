import { getRandomUnitVector } from './utilities.js';
import { keysPressed } from './input.js'
export { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite };

class Sprite {
    constructor(x=0,y=0,fwd={x:0,y:0},speed=0){
        this.x = x;
        this.y = y;
        this.fwd = fwd;
        this.speed = speed;
    }
    
    move(){
        this.x += this.fwd.x * this.speed;
        this.y += this.fwd.y * this.speed;
    }
}

class ImageSprite extends Sprite {
    constructor(x=0,y=0,fwd={x:0,y:0},speed=0,width=100,
                 height=50,image){
        super(x,y,fwd,speed);
        this.width = width;
        this.height = height;
        let newImage = new Image();
        newImage.src = image;
        this.image = newImage;
    }
    
    draw(ctx){
        ctx.save();
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();
	}
}

class RectSprite extends Sprite{
	constructor(x=0,y=0,fwd={x:0,y:1},speed=0, color="red", width=25, height=25){
		super(x,y,fwd,speed);
		this.color = color;
		this.width = width;
		this.height = height;
	}

	draw(ctx){ // NEW implementation for "Square Sprite"
		ctx.save();
        ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}

class ButtonSprite {
	constructor(x=0,y=0,fillColor="red", strokeColor="white",textColor = "black", width=25, height=25,text="Text",textPadding=0){
        this.x = x;
        this.y = y;
		this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.textColor = textColor;
		this.width = width;
		this.height = height;
        this.text = text;
        this.radius = 20;
        this.textPadding = textPadding;
	}

	draw(ctx){ 
        ctx.save();
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth=3;
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.lineTo(this.x + this.width - this.radius, this.y);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + this.radius);
        ctx.lineTo(this.x + this.width, this.y + this.height - this.radius);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - this.radius, this.y + this.height);
        ctx.lineTo(this.x + this.radius, this.y + this.height);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - this.radius);
        ctx.lineTo(this.x, this.y + this.radius);
        ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius, this.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.font = "20px Arial";
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text,this.x + this.textPadding,this.y + (this.height/2) + 5,this.width - 20);
        ctx.restore();
        
	}  
    
    setRectSize(width=50,height=50){
        this.width = width;
        this.height = height;
    }
    
    setRectPos(x=0,y=0){
        this.x = x;
        this.y = y;
    }
    
    setFillColor(fillColor="red"){
        this.fillColor = fillColor;
    }
    
    getName(){
        return this.text;
    }
    
}

class ArrowSprite extends Sprite{
    constructor(x=0,y=0,fwd={x:0,y:1},speed=0, color="red", width=25, height=25, angle=0, freeze=false){
		super(x,y,fwd,speed);
        this.color = color;
		this.width = width;
        this.height = height;
        this.angle = angle;

        // Setting which key to press
        if (this.angle * (180 / Math.PI) == 0) {
            this.key = "38";
        }
        if (this.angle * (180 / Math.PI) == 90) {
            this.key = "39";
        }
        if (this.angle * (180 / Math.PI) == 180) {
            this.key = "40";
        }
        if (this.angle * (180 / Math.PI) == 270) {
            this.key = "37";
        }
	}

	draw(ctx){
        ctx.save();
        // setting where the arrow draws
        let x = this.x + (this.width / 2);
        let y = this.y + (this.height / 2);
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.translate(-x, -y);

        // check to see which color we should be using
        //console.log(this.key + " " + keysPressed[this.key]);
        if (keysPressed[this.key]){
            ctx.fillStyle = this.color;

        }
        else {
            ctx.fillStyle = "white";
        }

        // setting line size
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        
        // drawing the points and stroking the arrow
        let arrowTip = {x: this.x + this.width / 2, y: this.y};
        let midHeight = this.y + this.height / 2;
        let innerWidthR = this.x + (this.width * 3 / 4);
        let innerWidthL = this.x + (this.width * 1 / 4);
   
        // movements
        ctx.beginPath();
        ctx.moveTo(arrowTip.x, arrowTip.y);
        ctx.lineTo(this.x + this.width, midHeight);
        ctx.lineTo(innerWidthR, midHeight);
        ctx.lineTo(innerWidthR, this.y + this.height);
        ctx.lineTo(innerWidthL, this.y + this.height);
        ctx.lineTo(innerWidthL, midHeight);
        ctx.lineTo(this.x, midHeight);
        ctx.lineTo(arrowTip.x, arrowTip.y);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
		ctx.restore();
    }
}

function createBackgroundSprite(){
    let x = 0;
    let y = 0;
    let width = 1200;
    let height = 800;
    let speed = 0;
    let fwd = {x:0, y:0};
    let background = new ImageSprite(x,y,fwd,speed,width,height,"media/Background.png");
    return background;
}

function createRectSprite(x=0, y=0,color="red",width=50,height=50){
    let speed = 0;
    let rect = new RectSprite(x,y,getRandomUnitVector(),speed,color,width,height);
    return rect;
}


function createArrowSprite(x=0,y=0, color="white", width=50, height=75, angle=0){
    let arrow = new ArrowSprite(x,y,{x:0, y:0},1,color,width,height,angle);
    return arrow;
}
