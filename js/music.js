import {createArrow,currentSong, currentScene, resetValues, volume } from './scenes.js';
export { musicInit, musicUpdate, playBackgroundMusic, songOver, resetMusic, playBeep };

// variables
let audioElement, analyserNode;
let NUM_SAMPLES = 256;

// arrow timing variables
let musicTimerMax = 240;   
let upArrowTimer, rightArrowTimer, leftArrowTimer, downArrowTimer;
let playing = false;
let songOver = false;
let upMusicTimerMax, downMusicTimerMax, rightMusicTimerMax, leftMusicTimerMax;

let backgroundSound = 'media/songs/backgroundmusic.mp3';
let srcBeepSound = 'media/beep.mp3';
let beepSound;
let track = backgroundSound;

function musicInit(){
    upMusicTimerMax = (Math.random() * musicTimerMax + 1);
    downMusicTimerMax = (Math.random() * musicTimerMax + 1);
    rightMusicTimerMax = (Math.random() * musicTimerMax + 1);
    leftMusicTimerMax = (Math.random() * musicTimerMax + 1);
    upArrowTimer = downArrowTimer = rightArrowTimer = leftArrowTimer = musicTimerMax;

	// get reference to <audio> element on page
	audioElement = document.querySelector('audio');
	
	// call our helper function and get an analyser node
    analyserNode = createAnalyserNode(audioElement);

    // making the menu changing sound
    beepSound = new Sound(srcBeepSound);
}

function createAnalyserNode(audioElement) {
    let audioCtx, analyserNode, sourceNode;
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext);
    
    // create an analyser node
    analyserNode = audioCtx.createAnalyser();

    
    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = NUM_SAMPLES;
    
    // this is where we hook up the <audio> element to the analyserNode
    sourceNode = audioCtx.createMediaElementSource(audioElement); 
    sourceNode.connect(analyserNode);
    
    // here we connect to the destination i.e. speakers
    analyserNode.connect(audioCtx.destination);
    return analyserNode;
}

function playStream(audioElement,path){
    audioElement.src = path;
    audioElement.addEventListener('ended', function() {
        if(path == backgroundSound){
            this.currentTime = 0;
            this.play();
        }
        else {
            songOver = true;
            playing = false;
        }
    }, false);
    audioElement.play();
    audioElement.volume = volume / 100;
}

function playBackgroundMusic() {
    if(playing == false){
        playStream(audioElement,backgroundSound);
    } 
}

function resetMusic(){
    playing = false;
    songOver = false;
}

function musicUpdate() { 
	// load and play default sound into audio element
	if(playing == false && songOver == false && currentScene == "game") {
        track = 'media/songs/' + currentSong.songName + '.mp3';
        playStream(audioElement,track);
        playing = true;
    }

    if(playing == true && songOver == false){
        // create a new array of 8-bit integers (0-255)
        let data = new Uint8Array(NUM_SAMPLES/2); 
    
        // populate the array with the frequency data
        analyserNode.getByteFrequencyData(data);
        generateArrowsBasedOnMusic(data);
    }

    upArrowTimer++;
    leftArrowTimer++;
    rightArrowTimer++;
    downArrowTimer++;
} 

// draw arrows based on frequency
function generateArrowsBasedOnMusic(data){
    let upNum = 4;
    let downNum = 0;
    let rightNum = 6;
    let leftNum = 5;

    let safetyNum = 60;

    for (let i = 0; i < data.length; i++) {
        // up arrow settings
        if (i == upNum && upArrowTimer >= upMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(0);
                upArrowTimer = 0;
                upMusicTimerMax = (Math.random() * musicTimerMax + 1);
                if (upMusicTimerMax < safetyNum) {
                    upMusicTimerMax = safetyNum;
                }
            }
        }
        // right arrow settings
        if (i == rightNum && rightArrowTimer >= rightMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(1);
                rightArrowTimer = 0;
                rightMusicTimerMax = (Math.random() * musicTimerMax + 1);
                if (rightMusicTimerMax < safetyNum){
                    rightMusicTimerMax = safetyNum;
                }
            }
        }
        // down arrow settings
        if (i == downNum && downArrowTimer >= downMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(2);
                downArrowTimer = 0;
                downMusicTimerMax = (Math.random() * musicTimerMax + 1);
                if (downMusicTimerMax < safetyNum){
                    downMusicTimerMax = safetyNum;
                }
            }
        }
        // left arrow settings
        if (i == leftNum && leftArrowTimer >= leftMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(3);
                leftArrowTimer = 0;
                leftMusicTimerMax = (Math.random() * musicTimerMax + 1);
                if (leftMusicTimerMax < safetyNum){
                    leftMusicTimerMax = safetyNum;
                }
            }
        }
    }
}

class Sound{
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.sound.volume = .2;
        document.body.appendChild(this.sound);
    }

    play(){
        this.sound.play();        
    }

    stop(){
        this.sound.pause();        
    }
}

function playBeep(){
    beepSound.play();
}
