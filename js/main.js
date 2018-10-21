import {currentScene, drawStart, startInit} from './scenes.js';
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
        default:
            break;
    }
    
}