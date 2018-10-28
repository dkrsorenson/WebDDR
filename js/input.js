export {keysPressed,keysPressedDown}

// user Input
let keysPressed = {};
let keysPressedDown = {};

document.addEventListener("keydown", function(e) {
    if(!keysPressed[e.keyCode] && !keysPressedDown[e.keyCode]){
        keysPressedDown[e.keyCode] = true;
    }
    else{
        keysPressedDown[e.keyCode] = false;
    }
    keysPressed[e.keyCode] = true;
});

document.addEventListener("keyup", function(e) {
    keysPressed[e.keyCode] = false;
    keysPressedDown[e.keyCode] = false;
});
