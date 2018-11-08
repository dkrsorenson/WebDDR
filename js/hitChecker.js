import { TextSprite } from "./sprites.js";
export { createHitText, textUpdate };

// attributes
let textArray = [];

// creates a new HitText
function createHitText(position, xPoint, checkDistance){
    let x = xPoint - position.x;
    x = Math.abs(x);

    // excellent hit
    if (x < checkDistance / 8) {
        textArray.push(new TextSprite(position.x, position.y, "yellow", "EXCELLENT"));
    }

    // good hit
    else if (x < checkDistance / 3) {
        textArray.push(new TextSprite(position.x, position.y, "green", "GOOD"));
    }
    
    // ok hit
    else if (x < checkDistance / 2 + 20){
        textArray.push(new TextSprite(position.x, position.y, "blue", "OK"));
    }

    // miss
    else {
        textArray.push(new TextSprite(position.x, position.y, "white", "MISS"));
    }
}

// updates all the text in the array
function textUpdate(ctx) {
    for (let s of textArray){
        ctx.save();

        s.move()
        s.draw(ctx);
        
        if (s.getAlpha() == 0){
            s.setHit(); // we now delete this text sprite
        }

        ctx.restore();
    }

    // checks to see if we should delete something
    for (let i = 0; i < textArray.length; i++)
    {
        // if this is the one we are deleting
        let check = textArray[i].getHit();
        if (textArray[i].getHit()) {
            for (let j = i; j < textArray.length; j++) {
                if (j < textArray.length - 1){
                    textArray[j] = textArray[j+1];
                }

                else{
                    textArray.pop();
                }
            }
        }
    }
}