import { getRandomUnitVector } from './utilities.js';
import { keysPressed } from './input.js'
export { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite, ImageSprite, SpriteSheetSprite, TextSprite, SliderSprite };

// sprite base class
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

// image sprite class
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

// creates the sprite sheet
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

    // sets the position of the sprite sheet sprite
    SetPosition(x, y){
       this.x = x;
       this.y = y;
    }

    // sets the scale of the sprite sheet sprite
    SetScale(x, y){
        this.scaleFactor.x = x;
        this.scaleFactor.y = y;
    }
}

// button sprite class
class ButtonSprite {
    constructor(x=0,y=0,fillColor="red", strokeColor="white",textColor = "black", width=25,
                height=25,text="Text",leftTextPadding=0,fontSize=20,lineWidth=3){
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

// arrow sprite class
class ArrowSprite extends Sprite{
    constructor(x=0,y=0, color="red", width=25, height=25, angle=0, freeze=false){
        if (freeze){
            super(x,y,{x:0,y:0},0);
        }
        else {
            super(x, y, {x:-1,y:0}, 4);
        }
        this.freeze = freeze;
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

    // draw method
	draw(ctx){
        ctx.save();
        // setting where the arrow draws
        let x = this.x + (this.width / 2);
        let y = this.y + (this.height / 2);
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        ctx.translate(-x, -y);

        // check to see which color we should be using
        if ((keysPressed[this.key] || keysPressed[this.key2]) && this.freeze){
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

    // to scroll across the screen
    move() {
        this.x += this.fwd.x * this.speed;
        this.y += this.fwd.y * this.speed;
    }

    // gets the position of the arrow
    getPosition() {
        return {x: this.x, y: this.y};
    }

    // sets the position of the arrow
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // checks the distance between current position and target position, with a certain amount
    checkDistance(x, checkDistance){
        let xPoint = x - this.x;
        xPoint = Math.abs(xPoint);

        // distance check
        if (xPoint < checkDistance) {
            return true;
        }
        return false;
    }

    // These methods get the two keys of the arrow
    getKey(){ return this.key; }

    getKey2(){ return this.key2; }

    // these two methods help the hit bool
    setHit(){ this.hit = true; }

    getHit(){ return this.hit; }
}

// text sprite class
class TextSprite extends Sprite{
    constructor(x=0,y=0, color="red", text = ""){
        super(x, y, getRandomUnitVector(), 1);
        this.color = color;
        this.text = text;
        this.orgPosition = {x: x, y: y};
        this.maxDis = 40;
        this.alpha = 1;
	}

    // draw method
	draw(ctx){
        ctx.save();
        // setting line size
        ctx.font = "30px Anton";
        ctx.lineWidth = 5;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        if (this.checkDistance()){
            this.alpha -= .05

            if (this.alpha < 0) {
                this.alpha = 0;
            }
        }
        
        ctx.globalAlpha = this.alpha;

        ctx.beginPath();
        // drawing the text
        ctx.fillText(this.text,this.x,this.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
		ctx.restore();
    }

    // to scroll across the screen, returns true if we have passed the distance
    move() {
        this.x += this.fwd.x * this.speed;
        this.y += this.fwd.y * this.speed;
    }

    // checks the distance between OG position and current position
    checkDistance(){
        return Math.sqrt(((this.orgPosition.x - this.x) * (this.orgPosition.x - this.x)) + (this.orgPosition.y - this.y) * (this.orgPosition.y - this.y)) > this.maxDis;
    }

    // gets the alpha of the text sprite
    getAlpha(){
        return this.alpha;
    }

    
    // these two methods help the hit bool
    setHit(){ this.hit = true; }
    
    getHit(){ return this.hit; }
}

// creates the background image
function createBackgroundSprite(){
    let x = 0;
    let y = 0;
    let width = 1200;
    let height = 800;
    let background = new ImageSprite(x,y,width,height,"media/Background.png");
    return background;
}

// creates a rect sprite
function createRectSprite(x=0, y=0,color="red",width=50,height=50){
    let speed = 0;
    let rect = new RectSprite(x,y,getRandomUnitVector(),speed,color,width,height);
    return rect;
}

// creates an arrow sprite
function createArrowSprite(x=0,y=0, color="white", width=50, height=75, angle=0, freeze){
    let arrow = new ArrowSprite(x,y,color,width,height,angle, freeze);
    return arrow;
}

class SliderSprite {
    constructor(x=0,y=0,circleX=0,fillColor="cornflowerblue", strokeColor="black",textColor="black",text="Text",fontSize=20,lineWidth=3, value=100){
        this.x = x;
        this.y = y;
        this.circleX = circleX;
		this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.textColor = textColor;
        this.text = text;
        this.radius = 20;
        this.fontSize = fontSize;
        this.lineWidth = lineWidth;
        this.value = value;
	}

	draw(ctx){ 
        ctx.save();
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        // draw line
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 200, this.y);
        ctx.closePath();
        ctx.stroke();

        // draw circle
        ctx.beginPath();
        ctx.arc(this.circleX,this.y,this.radius,0,Math.PI * 2,false);
        ctx.closePath();
        ctx.fill();
        
        ctx.font = this.fontSize + "px Anton";
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text,this.x - 100,this.y + 10);
        ctx.restore();
        
	}  
    
    setRectPos(x=0,y=0){
        this.x = x;
        this.y = y;
    }

    moveSliderRight(){
        this.circleX += 20;
    }

    moveSliderLeft(){
        this.circleX -= 20;
    }

    addValue(){
        this.value += 10;
    }

    reduceValue(){
        this.value -= 10;
    }
    
    setFillColor(fillColor="red"){
        this.fillColor = fillColor;
    }
    
    getName(){
        return this.text;
    }
    
}
