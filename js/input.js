export {keysPressed}

// user Input
let keysPressed = {};

document.addEventListener("keydown", function(e) {
    keysPressed[e.keyCode] = true;
});
document.addEventListener("keyup", function(e) {
    keysPressed[e.keyCode] = false;
});