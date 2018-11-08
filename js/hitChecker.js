import { TextSprite } from "./sprites.js";
export { createHitText, textUpdate };

// attributes
let textArray = [];

function createHitText(position, xPoint, checkDistance){
    let x = xPoint - position.x;
    x = Math.abs(x);
    if (x < checkDistance / 8) {
        textArray.push(new TextSprite(position.x, position.y, "yellow", "EXCELLENT"));
    }

    else if (x < checkDistance / 3) {
        textArray.push(new TextSprite(position.x, position.y, "green", "GOOD"));
    }
    
    else if (x < checkDistance / 2 + 20){
        textArray.push(new TextSprite(position.x, position.y, "blue", "OK"));
    }

    else {
        textArray.push(new TextSprite(position.x, position.y, "white", "MISS"));
    }

}

function textUpdate(ctx) {
    for (let s of textArray){
        ctx.save();

        s.move()
        s.draw(ctx);
        
        if (s.getAlpha() == 0){
            s.setHit();
        }
        
        ctx.restore();
    }

    // loop through the list of arrows
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