//import {} from './classes.js';
export {init};

// variables
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const screenWidth = 600;
const screenHeight = 400;

function init(){
 
    // call game loop
    loop();
}


function loop(){
    // schedule a call to loop() in 1/60th of a second
	requestAnimationFrame(loop);
}