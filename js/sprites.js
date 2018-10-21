import { getRandomUnitVector } from './utilities.js';
export { createArrowSprite, createRectSprite, createBackgroundSprite };

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

function createArrowSprite(x=0,y=0){
    let width = 50;
    let height = 70;
    let speed = 0;
    let fwd = {x:0, y:0};
    let arrow = new ImageSprite(x,y,fwd,speed,width,height,"media/ArrowSprite.png");
    return arrow;
}

function createRectSprite(x=0, y=0,color="red",width=50,height=50){
    let speed = 0;
    let rect = new RectSprite(x,y,getRandomUnitVector(),speed,color,width,height);
    return rect;
}