import {} from './utilities.js';
export {ButtonSprite};

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
	constructor(x=0,y=0,fillColor="red", strokeColor="white",textColor = "black", width=25, height=25,text="Song"){
        this.x = x;
        this.y = y;
		this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.textColor = textColor;
		this.width = width;
		this.height = height;
        this.text = text;
        this.radius = 20;
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
        ctx.fillText(this.text,this.x + 15,this.y + (this.height/2) + 5,this.width - 20);
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
    
}