import {currentScene, drawStart, startInit, gameInit, drawGame,drawSongSelectScreen,menuScroll, 
        songSelectInit, checkForEscape, endInit, drawEnd, optionsInit, drawOptionsMenu } from './scenes.js';
import { musicInit, musicUpdate, playBackgroundMusic } from './music.js';
import { inputCheck } from './input.js';
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
    musicInit();
    endInit();
    optionsInit();
    playBackgroundMusic();

    // call game loop
    loop();
}


function loop(){
    // schedule a call to loop() in 1/60th of a second
    requestAnimationFrame(loop);
    checkForEscape();
    
    // draws a certain scene
    switch (currentScene){
        case "start":
            drawStart(ctx, screenWidth, screenHeight);
            break;
        case "options":
            drawOptionsMenu(ctx,screenWidth,screenHeight);
            break;
        case "songSelect":
            drawSongSelectScreen(ctx,screenWidth,screenHeight);
            break;
        case "game":
            drawGame(ctx, screenWidth, screenHeight);
            break;
        case "end":
            drawEnd(ctx, screenWidth, screenHeight);
            break;
        default:
            break;
    }
    
    musicUpdate();
    
    // ensures on hit is only once
    inputCheck();
}