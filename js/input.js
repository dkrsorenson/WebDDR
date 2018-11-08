export {keysPressed, keysPressedDown, inputCheck}

// user Input, with Daemons
let keysPressed = {};
let keysPressedDown = {};
let timer;

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

// helps ensure that the key press down is correct
function inputCheck(){
    timer++;
    for (let i = 0; i < 126; i++) {
        keysPressedDown[i] = false;
    }
}