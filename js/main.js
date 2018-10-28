import {currentScene,drawStartMenu,drawSongSelectScreen,menuScroll} from './scenes.js';
export {init};

// variables
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let screenWidth;
let screenHeight;

function init(){
    screenWidth = canvas.width;
    screenHeight = canvas.height;
    

    // call game loop
    loop();
}


function loop(){
    // schedule a call to loop() in 1/60th of a second
    requestAnimationFrame(loop);

    switch (currentScene){
        case "start":
            
            break;
        case "game":
            break;
        case "songSelect":
            drawSongSelectScreen(ctx,screenWidth,screenHeight);
            break;
        default:
            break;
    }
    
    
}