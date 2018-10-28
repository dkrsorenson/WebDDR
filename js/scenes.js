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
    let upArrowY = 240;
    let downArrowY = 480;
    let rightArrowY = 360;
    let leftArrowY = 600;
    let rightAngle = 90 * Math.PI / 180;
    let downAngle = 180 * Math.PI / 180;
    let leftAngle = 270 * Math.PI / 180;
    spriteList.push(createArrowSprite(60, upArrowY, "green", 75, 100, 0 , true));
    spriteList.push(createArrowSprite(60, rightArrowY, "blue", 75, 100, rightAngle, true));
    spriteList.push(createArrowSprite(60, downArrowY, "red", 75, 100, downAngle, true));
    spriteList.push(createArrowSprite(60, leftArrowY, "orange", 75, 100, leftAngle, true));

    for (let i = 0; i < 120; i++)
    {
        if (i % 4 == 0){
            let newSprite = createArrowSprite(900 + (i * 100), upArrowY, "white", 75, 100, 0);
            spriteList.push(newSprite);
        }
        if (i % 4 == 1){
            let newSprite = createArrowSprite(900 + (i * 100), rightArrowY, "white", 75, 100, rightAngle);
            spriteList.push(newSprite);
        }
        if (i % 4 == 2){
            let newSprite = createArrowSprite(900 + (i * 100), downArrowY, "white", 75, 100, downAngle);
            spriteList.push(newSprite);
        }
        if (i % 4 == 3){
            let newSprite = createArrowSprite(900 + (i * 100), leftArrowY, "white", 75, 100, leftAngle);
            spriteList.push(newSprite);
        }
    }
}

function drawGame(ctx, screenWidth, screenHeight){
    // drawing the static arrows
	ctx.clearRect(0, 0, screenWidth, screenHeight);

    for (let s of spriteList){
        s.move();
        s.draw(ctx);
    }

}