import {ButtonSprite} from './sprites.js';
import {Song} from './song.js';
import {keysPressed,keysPressedDown} from './input.js';
export {currentScene,drawStartMenu,drawSongSelectScreen,menuScroll};

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
