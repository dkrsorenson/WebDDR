import { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite, ImageSprite, SpriteSheetSprite } from './sprites.js'
import {Song} from './song.js';
import { getRandomColor, generateRandColor } from './utilities.js';
import { setHealth, getHealth, getMaxHealth } from './gameManager.js'
import { keysPressed, keysPressedDown } from './input.js';
export { currentScene, drawStart, startInit, gameInit, drawGame, drawSongSelectScreen, menuScroll, 
         songSelectInit, checkForEscape, createArrow, endInit, drawEnd, currentSong  }

let currentScene = "start";
let spriteList = [];
let backgroundSprite;
let timer;

// variables for song select screen
let songs = [];
let songButtons = [];
let currentSong;

// menu scroll stuff
let currentPos = 0;
let up,down,enter,escape;

// variables for start menu
let menuButtons = [];
let bgImage;
let titleFillColor;

// variables for arrow locations
let upArrowY = 220;
let rightArrowY = 350;
let downArrowY = 480;
let leftArrowY = 610;
let upAngle = 0;
let rightAngle = 90 * Math.PI / 180;
let downAngle = 180 * Math.PI / 180;
let leftAngle = 270 * Math.PI / 180;

// variables for game stuff
let score = 0;

// variables for the dancing sprite
let dancerSprite;
let danceTimer, danceTimerMax;
let danceFrame, danceFrameMax;
let dancerState;

function startInit(){
    spriteList = [];

    bgImage = new ImageSprite(0,0,1200,800,'media/bg3.jpg');
    backgroundSprite = createBackgroundSprite();
    timer = 0;   
    
    // buttons
    let startButton = new ButtonSprite(50,300,"cornflowerblue","navy","black",250,70,"Start",90,35);
    let optionsButton = new ButtonSprite(50,270,"cornflowerblue","navy","black",250,70,"Options",70,35);
    
    menuButtons.push(startButton);
    menuButtons.push(optionsButton);

    danceTimer = 0;
    danceFrame = 0;
    danceFrameMax = 52;
    danceTimerMax = 4;
    dancerSprite = new SpriteSheetSprite(-50, 100, 500, 500, "media/SpriteSheet.png", danceFrameMax);
    dancerState = "";
}

function drawStart(ctx, screenWidth, screenHeight){
    if (dancerState != currentScene){
        dancerSprite.SetPosition(-50, 100);
        dancerSprite.SetScale(1, 1);
        dancerState = currentScene;
    }

    let yIncrement = -100;
    // draw background
    drawBackgroundImage(ctx);
    drawTitle(ctx,screenWidth,screenHeight);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    //backgroundSprite.draw(ctx);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    
    for (let i = 0; i < menuButtons.length; i++){
        if(i == currentPos) menuButtons[i].setFillColor("lightblue");
        else menuButtons[i].setFillColor("cornflowerblue");
        
        menuButtons[i].setRectPos(screenWidth/2 - menuButtons[i].width/2,screenHeight/2 + yIncrement);
        menuButtons[i].draw(ctx);
        yIncrement += 100;
    }
    
    menuScroll(menuButtons);

    dancerSprite.draw(ctx, danceFrame);
    
    timer++;    
    DancerUpdate();
}

function DancerUpdate(){
    danceTimer++;
    if (danceTimer > danceTimerMax) {
        danceTimer = 0;
        danceFrame++;
        if (danceFrame > danceFrameMax - 1){
            danceFrame = 0;
        }
    }
}

function drawTitle(ctx,screenWidth,screenHeight){
    ctx.save();
    if(timer % 45 == 0){
        titleFillColor = getRandomColor();
    }
    ctx.fillStyle = titleFillColor;
    ctx.font = "120px Anton";
    ctx.fillText("WEB DDR", screenWidth/2 - 200, 200);
    ctx.restore();
}
function drawBackgroundImage(ctx){
    bgImage.draw(ctx);
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
    timer = 0;
    spriteList = [];
    score = 0;

    // goal arrows
    spriteList.push(createArrowSprite(60, upArrowY, "green", 75, 100, upAngle , true));
    spriteList.push(createArrowSprite(60, rightArrowY, "blue", 75, 100, rightAngle, true));
    spriteList.push(createArrowSprite(60, downArrowY, "red", 75, 100, downAngle, true));
    spriteList.push(createArrowSprite(60, leftArrowY, "orange", 75, 100, leftAngle, true));
}

function drawGame(ctx, screenWidth, screenHeight){
    console.dir(dancerState);
    if (dancerState != currentScene){
        console.dir("HIT");
        dancerSprite.SetPosition(450, -20);
        dancerSprite.SetScale(2, 2);
        dancerState = currentScene;
        setHealth(getMaxHealth());
        spriteList = [];
    }

    ctx.save();
    ctx.fillStyle = "black";

    // drawing the static arrows
	ctx.clearRect(0, 0, screenWidth, screenHeight);
    drawBackgroundImage(ctx);
    drawGameText(ctx, screenWidth, screenHeight, score, getHealth());

    // drawing in between lines
    ctx.fillRect(0, upArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, rightArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, downArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, leftArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, leftArrowY + 110, screenWidth, 5);

    // drawing the arrows
    for (let s of spriteList){
        s.move();
        s.draw(ctx);
        if (spriteList.indexOf(s) > 3) {
            // collision and hit check on arrow over goal arrow
            if (keysPressedDown[s.getKey()] || keysPressedDown[s.getKey2()]){
                if (s.checkDistance(60, 25)) {
                    s.setPosition(-100, -100);
                    score += 25;
                    s.setHit();
                    setHealth(getHealth() + 1);
                }
            }
        }
    }

    // loop through the list of arrows
    for (let i = 0; i < spriteList.length; i++)
    {
        // if this is the one we are deleting
        if (spriteList[i].x < -50 || spriteList[i].y < -50) {
            let check = spriteList[i].getHit();
            for (let j = i; j < spriteList.length; j++) {
                if (j < spriteList.length - 1){
                    spriteList[j] = spriteList[j+1];
                }
                else{
                    if (!check) {
                        setHealth(getHealth() - 2);
                    }
                    spriteList.pop();
                }
            }
        }
    }

    dancerSprite.draw(ctx, danceFrame);

    timer++;
    DancerUpdate();
    
    ctx.restore();
}

function drawGameText(ctx, screenWidth, screenHeight, score){
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "40px Anton";

    // score text
    ctx.fillText("Score:",screenWidth/50,50);
    ctx.fillText(score,screenWidth/50 + 110,50);

    // health
    ctx.fillRect(screenWidth / 50, 63, 250, 40); // background of health bar
    ctx.fillStyle = "cornflowerblue";
    ctx.fillRect(screenWidth / 50 + 10, 68, (getHealth() / getMaxHealth()) * 230, 30); // background of health bar

    if(getHealth() <= 0) {
        if(score > currentSong.highScore) currentSong.highScore == score;
        currentScene = "end";
    }

    ctx.restore()
}
   
function songSelectInit(){
    createSongs();

    for(let s of songs){
        let newBtn = new ButtonSprite(50,50,"white",s.color,s.color,350,70,s.songName,20,25);
        songButtons.push(newBtn);
    }
}

function createArrow(num=Math.floor(Math.random() * 4)){
    let spawnX = 1200;
    if (num == 0){
        let newSprite = createArrowSprite(spawnX, upArrowY, "white", 75, 100, 0);
        spriteList.push(newSprite);
    }
    if (num == 1){
        let newSprite = createArrowSprite(spawnX, rightArrowY, "white", 75, 100, rightAngle);
        spriteList.push(newSprite);
    }
    if (num == 2){
        let newSprite = createArrowSprite(spawnX, downArrowY, "white", 75, 100, downAngle);
        spriteList.push(newSprite);
    }
    if (num == 3){
        let newSprite = createArrowSprite(spawnX, leftArrowY, "white", 75, 100, leftAngle);
        spriteList.push(newSprite);
    }
}

function createSongs(){

    let arrSongNames = [ "Aint No Mountain High Enough", "Lay it down", "Lover Boy", "Outset Island", "Pokemon", 
                         "Scooby Doo", "Spongebob Square Pants"];

    for (let i = 0; i < arrSongNames.length; i++){
        let imageSrc = "media/songcovers/" + arrSongNames[i] + ".jpg";
        let imgSprite = new ImageSprite(0,0,300,300,imageSrc);

        let s = new Song(arrSongNames[i],0,0,0,"navy",imgSprite);
        songs.push(s);
    }

}

function menuScroll(arr=[]){
    // up key
    if(keysPressed["38"] && !up){
        up = true;
        if(currentPos <= 0){
            currentPos = arr.length - 1;
        }
        else currentPos--;
    }
    else if(!keysPressed["38"] && up){
        up = false;
    }
    
    // down key
    if(keysPressed["40"] && !down){
        down = true;
        if(currentPos >= arr.length - 1){
            currentPos = 0;
        }
        else currentPos++;
    }
    else if(!keysPressed["40"] && down){
        down = false;
    }
    
    // enter key
    if(keysPressed["13"] && !enter){
        enter = true;
        if(currentScene == "start"){
            if(arr[currentPos].getName() == "Start"){
                currentScene = "songSelect";
            }
        }
        else if(currentScene == "songSelect"){
            //currentSong = songs[currentPos].songName;
            currentScene = "game";
        }
        else if(currentScene == "end"){
            currentScene = "start";
            resetValues();
        }
    }
    else if(!keysPressed["13"] && enter){
        enter = false;
    }
}

function checkForEscape(){
    // escape key
    if(keysPressed["27"] && !escape){
        escape = true;
        if(currentScene == "songSelect"){
            currentScene = "start";
        }
        else if(currentScene == "game" || currentScene == "end"){
            currentScene = "start";
        }
    }
    else if(!keysPressed["27"] && escape){
        escape = false;
    }
}

function drawSongSelectScreen(ctx,screenWidth,screenHeight){
    menuScroll(songButtons);
    let x = 75, y = screenHeight/2;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,screenWidth,screenHeight);

    drawBackgroundImage(ctx);

    let drawPos = 0;
    
    let btnNum = currentPos;
    drawPos = -2;

    for(let i = 0; i < songButtons.length; i++){   
        if(btnNum > songButtons.length - 1){
            btnNum = 0;
        }
        
        if(drawPos == 0){
            x = 75;
            y = screenHeight/2;
        }
        else if(drawPos == 1){
            x = 45;
            y = screenHeight/2 + 85;
        }
        else if(drawPos == 2){
            x = 15;
            y = screenHeight/2 + 170;
        }
        else if(drawPos == -2){
            x = 15;
            y = screenHeight/2 - 170;
        }
        else if(drawPos == -1){
            x = 45;
            y = screenHeight/2 - 85;
        }
        
        if(drawPos <= 2){
            if(drawPos == 0) songButtons[btnNum].setFillColor("cornflowerblue");
            else songButtons[btnNum].setFillColor("lightblue");
            songButtons[btnNum].setRectPos(x,y);
            songButtons[btnNum].draw(ctx);
            drawPos++;
            btnNum++;
        }
    }

    // // draw around the center position 
    // let centerButton = new ButtonSprite(75,screenHeight/2 - 5,"none","gold","black",380,75,"",0,0,10);
    // centerButton.draw(ctx);
    // ctx.restore();

    let tempPos = currentPos; 
    tempPos += 2;
    currentSong = songs[tempPos % songButtons.length];
    
    drawSongSelectText(ctx,screenWidth,screenHeight);
}

function drawSongSelectText(ctx,screenWidth,screenHeight) {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "70px Anton";
    ctx.fillText("Select a song:",screenWidth/50,100);
    ctx.restore();

    // info
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "30px Anton";
    ctx.fillText("Current Song: " + currentSong.songName,screenWidth/2 + 75,screenHeight/2 + 50);  
    // ctx.fillText("Time: " + currentSong.time,screenWidth/2,screenHeight/2 + 100);
    ctx.fillText("High Score: " + currentSong.highScore,screenWidth/2 + 75,screenHeight/2 + 100);
    ctx.fillText("Difficulty: " + currentSong.difficulty,screenWidth/2 + 75,screenHeight/2 + 150);
    ctx.restore();
    
    // draw current song data
    ctx.save();
    let img = currentSong.image;
    img.setRectPos(screenWidth/2 + 75, screenHeight/2 - img.height);
    img.draw(ctx);

    // ctx.fillStyle = currentSong.color;
    // ctx.font = "30px Anton";
    // ctx.fillText(currentSong.songName,screenWidth/2 + 175,screenHeight/2 + 50);
    // ctx.fillText(currentSong.time,screenWidth/2 + 75,screenHeight/2 + 100);
    // ctx.fillText(currentSong.highScore,screenWidth/2 + 150,screenHeight/2 + 150);
    // ctx.fillText(currentSong.difficulty,screenWidth/2 + 125,screenHeight/2 + 200);
    // ctx.restore();
}

function drawOptionsMenu(){
    
}

// End functions
function endInit(){
    
}

function drawEnd(ctx, screenWidth, screenHeight){
    menuScroll();
    // empty screen
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,screenWidth,screenHeight);
    ctx.restore();

    // draw bg image
    drawBackgroundImage(ctx);

    // draw end game text
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "70px Anton";
    ctx.fillText("Game Over",screenWidth/2 - 150, screenHeight/2 - 100);

    ctx.font = "30px Anton";
    ctx.fillText("Song: " + currentSong.songName, screenWidth/2 - 100,screenHeight/2 - 50);
    ctx.fillText("High Score: " + currentSong.highScore, screenWidth/2 - 100,screenHeight/2);

    ctx.font = "20px Anton";
    ctx.fillText("Press [Enter] to return to main menu.", screenWidth/2 - 150,screenHeight/2 + 150);
    ctx.restore();
}

function resetValues() {
    score = 0;
}