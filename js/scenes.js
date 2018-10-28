import { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite } from './sprites.js'
import {Song} from './song.js';
import { getRandomColor } from './utilities.js';
import { keysPressed, keysPressedDown } from './input.js';
export { currentScene, drawStart, startInit, gameInit, drawGame, drawSongSelectScreen, menuScroll, songSelectInit }

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
let up,down,enter;

// variables for start menu
let menuButtons = [];
let startX = 50;
let startY = 200;

function startInit(){
    spriteList = [];
    backgroundSprite = createBackgroundSprite();
    timer = 0;   
    
    // buttons
    let startButton = new ButtonSprite(50,200,"cornflowerblue","navy","black",200,50,"Start",75);
    let optionsButton = new ButtonSprite(50,270,"cornflowerblue","navy","black",200,50,"Options",65);
    
    menuButtons.push(startButton);
    menuButtons.push(optionsButton);
}

function drawStart(ctx, screenWidth, screenHeight){
    
    // draw background
    drawBackgroundColors(ctx, screenWidth, screenHeight);
    backgroundSprite.draw(ctx);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    
    for (let i = 0; i < menuButtons.length; i++){
        if(i == currentPos) menuButtons[i].setFillColor("lightblue");
        else menuButtons[i].setFillColor("cornflowerblue");
        menuButtons[i].draw(ctx);
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
    spriteList = [];

    // goal Arrow locations
    spriteList.push(createArrowSprite(122, 130, "green", 75, 100, 0 , true));
    spriteList.push(createArrowSprite(225, 250, "blue", 75, 100, (90 * Math.PI / 180), true));
    spriteList.push(createArrowSprite(125, 380, "red", 75, 100, (180 * Math.PI / 180), true));
    spriteList.push(createArrowSprite(25, 250, "orange", 75, 100, (270 * Math.PI / 180), true));
}

function drawGame(ctx, screenWidth, screenHeight){
    // drawing the static arrows
	ctx.clearRect(0, 0, screenWidth, screenHeight);

    for (let s of spriteList){
        s.draw(ctx);
    }
}

function songSelectInit(){
    createSongs();
    for(let s of songs){
        let newBtn = new ButtonSprite(50,50,"white",s.color,s.color,200,50,s.songName,15);
        songButtons.push(newBtn);
    }
}

function createSongs(){
    let s1 = new Song("song 1", 0, 10, 1,"red");
    let s2 = new Song("song 2", 0, 15, 2,"orange");
    let s3 = new Song("song 3", 0, 20, 3,"yellow");
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
    ctx.font = "30px Arial";
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
