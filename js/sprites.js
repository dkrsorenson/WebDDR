import { getRandomUnitVector } from './utilities.js';
import { keysPressed } from './input.js'
export { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite, ImageSprite, SpriteSheetSprite };

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

class ImageSprite {
    constructor(x=0,y=0,width=100,height=50,imageSrc){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        let newImage = new Image();
        newImage.src = imageSrc;
        this.image = newImage;
    }
    
    draw(ctx){
        ctx.save();
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();
    }
    
    setRectPos(x=0,y=0){
        this.x = x;
        this.y = y;
    }
    
}

class SpriteSheetSprite extends ImageSprite{
    constructor(x=0,y=0,width=500,height=500,imageSrc,frameCount){
        super(x, y, width, height, imageSrc);
        this.frameCount = frameCount;
        this.scaleFactor = {x: 1, y: 1};
    }

    draw(ctx, frame = 0){
        ctx.save();
        ctx.drawImage(
            this.image,
            frame * this.width, // image x
            0, // image y
            this.width,
            this.height,
            this.x,
            this.y,
            this.width / this.scaleFactor.x,
            this.height / this.scaleFactor.y
        );
        ctx.restore();
    }

    SetPosition(x, y){
       this.x = x;
       this.y = y;
    }

    SetScale(x, y){
        this.scaleFactor.x = x;
        this.scaleFactor.y = y;
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
	constructor(x=0,y=0,fillColor="red", strokeColor="white",textColor = "black", width=25,height=25,text="Text",leftTextPadding=0,fontSize=20,lineWidth=3){
        this.x = x;
        this.y = y;
		this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.textColor = textColor;
		this.width = width;
		this.height = height;
        this.text = text;
        this.radius = 20;
        this.leftTextPadding = leftTextPadding;
        this.fontSize = fontSize;
        this.lineWidth = lineWidth;
	}

	draw(ctx){ 
        ctx.save();
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
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
        
        ctx.font = this.fontSize + "px Anton";
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text,this.x + this.leftTextPadding,this.y + this.height * 0.7,this.width - 20);
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
    constructor(x=0,y=0, color="red", width=25, height=25, angle=0, freeze=false){
        if (freeze){
            super(x,y,{x:0,y:0},0);
        }
        else {
            super(x, y, {x:-1,y:0}, 4);
        }
        this.color = color;
		this.width = width;
        this.height = height;
        this.angle = angle;
        this.hit = false;

        // Setting which key to press
        if (this.angle * (180 / Math.PI) == 0) {
            this.key = "38";
            this.key2= "87";
        }
        if (this.angle * (180 / Math.PI) == 90) {
            this.key = "39";
            this.key2 = "68";
        }
        if (this.angle * (180 / Math.PI) == 180) {
            this.key = "40";
            this.key2 = "83";
        }
        if (this.angle * (180 / Math.PI) == 270) {
            this.key = "37";
            this.key2 = "65"
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
        if (keysPressed[this.key] || keysPressed[this.key2]){
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

    move() {
        this.x += this.fwd.x * this.speed;
        this.y += this.fwd.y * this.speed;
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    checkDistance(x, checkDistance = 25){
        let xPoint = x - this.x;

        // distance check
        if (Math.sqrt((xPoint * xPoint)) < checkDistance) {
            //console.dir(Math.sqrt((xPoint * xPoint)));
            return true;
        }
        return false;
    }

    getKey(){
        return this.key;
    }

    getKey2(){
        return this.key2;
    }

    setHit(){
        this.hit = true;
    }

    getHit(){
        return this.hit;
    }
}

function createBackgroundSprite(){
    let x = 0;
    let y = 0;
    let width = 1200;
    let height = 800;
    // let speed = 0;
    // let fwd = {x:0, y:0};
    let background = new ImageSprite(x,y,width,height,"media/Background.png");
    return background;
}

function createRectSprite(x=0, y=0,color="red",width=50,height=50){
    let speed = 0;
    let rect = new RectSprite(x,y,getRandomUnitVector(),speed,color,width,height);
    return rect;
}


function createArrowSprite(x=0,y=0, color="white", width=50, height=75, angle=0, freeze){
    let arrow = new ArrowSprite(x,y,color,width,height,angle, freeze);
    return arrow;
}
