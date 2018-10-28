import { createArrowSprite, createRectSprite, createBackgroundSprite, ButtonSprite } from './sprites.js'
import {Song} from './song.js';
import { getRandomColor } from './utilities.js'
import { keysPressed, keysPressedDown } from './input.js'
export { currentScene, drawStart, startInit, gameInit, drawGame, drawSongSelectScreen, menuScroll }

let currentScene = "game";
let spriteList = [];
let backgroundSprite;
let timer;

function startInit(){
    spriteList = [];
    backgroundSprite = createBackgroundSprite();
    timer = 0;
}

function drawStart(ctx, screenWidth, screenHeight){
    // draw background
    drawBackgroundColors(ctx, screenWidth, screenHeight);
    backgroundSprite.draw(ctx);
    //drawBackgroundColors(ctx, screenWidth, screenHeight);
    
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


let currentScene = "songSelect";

// variables for song select screen
let songs = [];
let buttons = [];
let currentSong;
let currentPos = 0;
let up,down;

function drawStartMenu(){
    
}

function drawPlayScreen(){
    
}

function drawSongSelectScreen(ctx,screenWidth,screenHeight){
    let s1 = new Song("song 1", 0, 10, 1);
    let s2 = new Song("song 2", 0, 15, 2);
    let s3 = new Song("song 3", 0, 20, 3);
    let s4 = new Song("song 4", 0, 25, 4);
    let s5 = new Song("song 5", 0, 30, 5);
    
    
    let s6 = new Song("song 6", 0, 25, 4);
    let s7 = new Song("song 7", 0, 30, 5);
    songs.push(s1);
    songs.push(s2);
    songs.push(s3);
    songs.push(s4);
    songs.push(s5);
    
    songs.push(s6);
    songs.push(s7);
    
    currentSong = songs[0];
    
    for(let s of songs){
        let newBtn = new ButtonSprite(50,50,"green","white","black",200,50,s.songName);
        buttons.push(newBtn);
    }
    
    drawSongMenuItems(ctx,screenWidth,screenHeight);
}

function menuScroll(){
//    // up key
//    if(keysPressed["38"] && !up){
//        up = true;
//        if(currentPos <= 0){
//            currentPos = buttons.length - 1;
//        }
//        else currentPos--;
//    }
//    else if(!keysPressed["38"] && up){
//        up = false;
//    }
//    
//    // down key
//    if(keysPressed["40"] && !down){
//        down = true;
//        if(currentPos >= buttons.length - 1){
//            currentPos = 0;
//        }
//        else currentPos++;
//    }
//    else if(!keysPressed["40"] && down){
//        down = false;
//    }
    
        // up key
    if(keysPressedDown["38"]){
        if(currentPos <= 0){
            currentPos = buttons.length - 1;
        }
        else currentPos--;
    }
    
    // down key
    if(keysPressedDown["40"]){
        if(currentPos >= buttons.length - 1){
            currentPos = 0;
        }
        else currentPos++;
    }
}

function drawSongMenuItems(ctx,screenWidth,screenHeight){
    menuScroll();
    let x = 75, y = screenHeight/2;
    ctx.fillRect(0,0,screenWidth,screenHeight);
    let drawPos = 0;
    
    let btnNum = currentPos;
    drawPos = -2;
    for(let i = 0; i < buttons.length; i++){   
        if(btnNum > buttons.length - 1){
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
            buttons[btnNum].setRectPos(x,y);
            buttons[btnNum].draw(ctx);
            drawPos++;
            btnNum++;
        }
    }
    
    let tempPos = currentPos; 
    tempPos += 2;
    currentSong = songs[tempPos%buttons.length];
    
    
    ctx.save();
    ctx.fillStyle = "White";
    ctx.font = "30px Arial";
    ctx.fillText("Current Song:",screenWidth/2,200);
    ctx.fillText(currentSong.songName,screenWidth/2 + 200,200);
    
    ctx.fillText("Time:",screenWidth/2,250);
    ctx.fillText(currentSong.time,screenWidth/2 + 90,250);
    
    ctx.fillText("High Score:",screenWidth/2,300);
    ctx.fillText(currentSong.highScore,screenWidth/2 + 170,300);
    
    ctx.fillText("Difficulty:",screenWidth/2,350);
    ctx.fillText(currentSong.difficulty,screenWidth/2 + 130,350);
    ctx.restore();
    
}

function drawOptionsMenu(){
    
}
