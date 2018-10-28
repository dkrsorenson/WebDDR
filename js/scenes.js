import { createArrowSprite, createRectSprite, createBackgroundSprite } from './sprites.js'
import { getRandomColor } from './utilities.js'
import { keysPressed } from './input.js'
export { currentScene, drawStart, startInit, gameInit, drawGame }

let currentScene = "game";
let spriteList = [];
let backgroundSprite;
let timer;

function startInit(){
    spriteList = [];
    backgroundSprite = createBackgroundSprite();
    timer = 0;
}

function drawStart(ctx, screenWidth, screenHeight){
    // draw background
    drawBackgroundColors(ctx, screenWidth, screenHeight);
    backgroundSprite.draw(ctx);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    
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

function gameInit(){
    spriteList = [];

    // goal Arrow locations
    spriteList.push(createArrowSprite(122, 130, "green", 75, 100, 0 , true));
    spriteList.push(createArrowSprite(225, 250, "blue", 75, 100, (90 * Math.PI / 180), true));
    spriteList.push(createArrowSprite(125, 380, "red", 75, 100, (180 * Math.PI / 180), true));
    spriteList.push(createArrowSprite(25, 250, "orange", 75, 100, (270 * Math.PI / 180), true));
}

function drawGame(ctx, screenWidth, screenHeight){
    // drawing the static arrows
	ctx.clearRect(0, 0, screenWidth, screenHeight);

    for (let s of spriteList){
        s.draw(ctx);
    }
}