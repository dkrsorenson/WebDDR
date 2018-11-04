import { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite } from './sprites.js'
import {Song} from './song.js';
import { getRandomColor } from './utilities.js';
import { keysPressed, keysPressedDown } from './input.js';
export { currentScene, drawStart, startInit, gameInit, drawGame, drawSongSelectScreen, menuScroll, songSelectInit, checkForEscape }

let currentScene = "game";
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
let startX = 50;
let startY = 200;

// variables for arrow locations
let upArrowY = 220;
let rightArrowY = 350;
let downArrowY = 480;
let leftArrowY = 610;
let upAngle = 0;
let rightAngle = 90 * Math.PI / 180;
let downAngle = 180 * Math.PI / 180;
let leftAngle = 270 * Math.PI / 180;

function startInit(){
    spriteList = [];
    backgroundSprite = createBackgroundSprite();
    timer = 0;   
    
    // buttons
    let startButton = new ButtonSprite(50,300,"cornflowerblue","navy","black",250,70,"Start",90,30);
    let optionsButton = new ButtonSprite(50,270,"cornflowerblue","navy","black",250,70,"Options",70,30);
    
    menuButtons.push(startButton);
    menuButtons.push(optionsButton);
}

function drawStart(ctx, screenWidth, screenHeight){
    let yIncrement = -100;
    // draw background
    drawBackgroundColors(ctx, screenWidth, screenHeight);
    backgroundSprite.draw(ctx);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    
    for (let i = 0; i < menuButtons.length; i++){
        if(i == currentPos) menuButtons[i].setFillColor("lightblue");
        else menuButtons[i].setFillColor("cornflowerblue");
        
        menuButtons[i].setRectPos(screenWidth/2 - menuButtons[i].width/2,screenHeight/2 + yIncrement);
        menuButtons[i].draw(ctx);
        yIncrement += 100;
    }
    
    menuScroll(menuButtons);
    
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
    timer = 0;
    spriteList = [];

    // goal arrows
    spriteList.push(createArrowSprite(60, upArrowY, "green", 75, 100, upAngle , true));
    spriteList.push(createArrowSprite(60, rightArrowY, "blue", 75, 100, rightAngle, true));
    spriteList.push(createArrowSprite(60, downArrowY, "red", 75, 100, downAngle, true));
    spriteList.push(createArrowSprite(60, leftArrowY, "orange", 75, 100, leftAngle, true));
}

function drawGame(ctx, screenWidth, screenHeight){
    // drawing the static arrows
	ctx.clearRect(0, 0, screenWidth, screenHeight);

    drawGameText(ctx, screenWidth, screenHeight);

    // drawing in between lines
    ctx.fillRect(0, upArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, rightArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, downArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, leftArrowY - 15, screenWidth, 5);
    ctx.fillRect(0, leftArrowY + 110, screenWidth, 5);

    for (let s of spriteList){
        s.move();
        s.draw(ctx);
        if (spriteList.indexOf(s) > 3) {
            if (keysPressedDown[s.getKey()]){
                if (s.checkDistance(60, 15)) {
                    s.setPosition(-100, -100);
                }
            }
        }
    }

    for (let i = 0; i < spriteList.length; i++)
    {
        if (spriteList[i].x < -50 || spriteList[i].y < -50) {
            for (let j = i; j < spriteList.length; j++) {
                if (j < spriteList.length - 1){
                    spriteList[j] = spriteList[j+1];
                }
                else
                    spriteList.pop();
            }
        }
    }
    
    // create random arrows
    timer++;

    if (timer % 30 == 0)
        createRandomArrow();
}

function drawGameText(ctx, screenWidth, screenHeight, score = "0000000", health = 50){
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "40px Anton";

    // score text
    ctx.fillText("Score:",screenWidth/50,50);
    ctx.fillText(score,screenWidth/50 + 110,50);

    // Hits text
    ctx.fillRect(screenWidth / 50, 63, 250, 40); // background of health bar
    ctx.fillStyle = "red";
    ctx.fillRect(screenWidth / 50 + 10, 68, (health / 100) * 230, 30); // background of health bar

    ctx.restore()
}
   
function songSelectInit(){
    createSongs();
    for(let s of songs){
        let newBtn = new ButtonSprite(50,50,"white",s.color,s.color,200,50,s.songName,15);
        songButtons.push(newBtn);
    }
}

function createRandomArrow(){
    let ranNum = Math.floor(Math.random() * 4);
    let spawnX = 1200;
    if (ranNum == 0){
        let newSprite = createArrowSprite(spawnX, upArrowY, "white", 75, 100, 0);
        spriteList.push(newSprite);
    }
    if (ranNum == 1){
        let newSprite = createArrowSprite(spawnX, rightArrowY, "white", 75, 100, rightAngle);
        spriteList.push(newSprite);
    }
    if (ranNum == 2){
        let newSprite = createArrowSprite(spawnX, downArrowY, "white", 75, 100, downAngle);
        spriteList.push(newSprite);
    }
    if (ranNum == 3){
        let newSprite = createArrowSprite(spawnX, leftArrowY, "white", 75, 100, leftAngle);
        spriteList.push(newSprite);
    }
}

function createSongs(){
    let s1 = new Song("song 1", 0, 10, 1,"red");
    let s2 = new Song("song 2", 0, 15, 2,"orange");
    let s3 = new Song("song 3", 0, 20, 3,"gold");
    let s4 = new Song("song 4", 0, 25, 4,"green");
    let s5 = new Song("song 5", 0, 30, 5,"blue");
    let s6 = new Song("song 6", 0, 25, 4,"purple");
    let s7 = new Song("song 7", 0, 30, 5,"violet");
    
    songs.push(s1);
    songs.push(s2);
    songs.push(s3);
    songs.push(s4);
    songs.push(s5);
    songs.push(s6);
    songs.push(s7);
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
            //currentSong = arr[currentPos].getName();
            currentScene = "game";
        }
    }
    else if(!keysPressed["13"] && enter){
        enter = false;
    }
}

function checkForEscape(){
    // escape key
    if(keysPressed["27"] && !escape){
        console.log("escaped");
        escape = true;
        if(currentScene == "songSelect"){
            currentScene = "start";
        }
        else if(currentScene == "game"){
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
            y = screenHeight/2 + 70;
        }
        else if(drawPos == 2){
            x = 15;
            y = screenHeight/2 + 140;
        }
        else if(drawPos == -2){
            x = 15;
            y = screenHeight/2 - 140;
        }
        else if(drawPos == -1){
            x = 45;
            y = screenHeight/2 - 70;
        }
        
        if(drawPos <= 2){
            songButtons[btnNum].setRectPos(x,y);
            songButtons[btnNum].draw(ctx);
            drawPos++;
            btnNum++;
        }
    }
    
    let tempPos = currentPos; 
    tempPos += 2;
    currentSong = songs[tempPos % songButtons.length];
    
    // info
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "30px Anton";
    ctx.fillText("Current Song:",screenWidth/2,screenHeight/2 - 100);  
    ctx.fillText("Time:",screenWidth/2,screenHeight/2 - 50);
    ctx.fillText("High Score:",screenWidth/2,screenHeight/2);
    ctx.fillText("Difficulty:",screenWidth/2,screenHeight/2 + 50);
    ctx.restore();
    
    // draw current song data
    ctx.save();
    ctx.fillStyle = currentSong.color;
    ctx.font = "30px Arial";
    ctx.fillText(currentSong.songName,screenWidth/2 + 200,screenHeight/2 - 100);
    ctx.fillText(currentSong.time,screenWidth/2 + 90,screenHeight/2 - 50);
    ctx.fillText(currentSong.highScore,screenWidth/2 + 170,screenHeight/2);
    ctx.fillText(currentSong.difficulty,screenWidth/2 + 130,screenHeight/2 + 50);
    ctx.restore();
    
}

function drawOptionsMenu(){
    
}
