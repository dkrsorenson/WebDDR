import { createArrowSprite, createRectSprite, createBackgroundSprite } from './sprites.js'
import { getRandomColor } from './utilities.js'
export { currentScene, drawStart, startInit }

let currentScene = "start";
let spriteList = [];
let backgroundSprite;
let timer;

function startInit(){
    backgroundSprite = createBackgroundSprite();
    timer = 0;

    spriteList.push(createArrowSprite(50, 50));
}

function drawStart(ctx, screenWidth, screenHeight){
    // draw background
    drawBackgroundColors(ctx, screenWidth, screenHeight);
    backgroundSprite.draw(ctx);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    
    for (let s of spriteList){
        s.draw(ctx);
    }
    
    timer++;
}

function drawBackgroundColors(ctx, screenWidth, screenHeight){
    if (timer % 45 == 0)
        UpdateBackgroundColors(ctx);

    ctx.fillRect(0, 0, screenWidth, screenHeight);
}

function UpdateBackgroundColors(ctx){
    ctx.fillStyle = getRandomColor();

}