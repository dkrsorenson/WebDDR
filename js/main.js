import {currentScene, drawStart, startInit, gameInit, drawGame,drawSongSelectScreen,menuScroll, songSelectInit } from './scenes.js';
export {init};

// variables
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let screenWidth;
let screenHeight;

function init(){
    screenWidth = canvas.width;
    screenHeight = canvas.height;
  
    // initialize scenes
    startInit();
    gameInit(ctx);
    songSelectInit();

    // call game loop
    loop();
}


function loop(){
    // schedule a call to loop() in 1/60th of a second
    requestAnimationFrame(loop);

    switch (currentScene){
        case "start":
            drawStart(ctx, screenWidth, screenHeight);
            break;
        case "songSelect":
            drawSongSelectScreen(ctx,screenWidth,screenHeight);
            break;
        case "game":
            drawGame(ctx, screenWidth, screenHeight);
            break;
        default:
            break;
    }
    
    
}