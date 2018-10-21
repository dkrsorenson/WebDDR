import {} from './utilities.js';
export {};

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
        this.image = image;
    }
    
    draw(ctx){
        ctx.save();
		ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		ctx.restore();
	}
}

class RectSprite extends sprite{
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