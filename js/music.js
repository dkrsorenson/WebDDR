import {createArrow,currentSong} from './scenes.js';
export {musicInit, musicUpdate, playBackgroundMusic };

// variables
let audioElement, analyserNode;
let NUM_SAMPLES = 256;
let musicTimerMax = 30;
let upArrowTimer, rightArrowTimer, leftArrowTimer, downArrowTimer;
let playing = false, songOver = false;
let upMusicTimerMax, downMusicTimerMax, rightMusicTimerMax, leftMusicTimerMax;

let backgroundSound = 'media/songs/backgroundmusic.mp3';
let track = backgroundSound;

function musicInit(){
    upMusicTimerMax = downMusicTimerMax = rightMusicTimerMax = leftMusicTimerMax = musicTimerMax;
    upArrowTimer = downArrowTimer = rightArrowTimer = leftArrowTimer = musicTimerMax;

	// get reference to <audio> element on page
	audioElement = document.querySelector('audio');
	
	// call our helper function and get an analyser node
	analyserNode = createAnalyserNode(audioElement);
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
    if(path == backgroundSound){
        audioElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    else {
        audioElement.addEventListener('ended', function() {
            songOver = true;
            playing = false;
        }, false);
    }
    audioElement.play();
    audioElement.volume = 0.3;
}

function playBackgroundMusic() {
    if(playing == false){
        playStream(audioElement,backgroundSound);
    } 
}

function musicUpdate() { 
	// load and play default sound into audio element
	if(playing == false && songOver == false) {
        track = 'media/songs/' + currentSong.songName + '.mp3';
        playStream(audioElement,track);
        playing = true;
    }
    
    //if(upArrowTimer >= musicTimerMax || rightArrowTimer >= musicTimerMax || leftArrowTimer >= musicTimerMax || downArrowTimer >= musicTimerMax){
        // create a new array of 8-bit integers (0-255)
        let data = new Uint8Array(NUM_SAMPLES/2); 
    
        // populate the array with the frequency data
        analyserNode.getByteFrequencyData(data);
        generateArrowsBasedOnMusic(data);
    //}

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

    for (let i = 0; i < data.length; i++) {
        // up arrow settings
        if (i == upNum && upArrowTimer >= upMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(0);
                upArrowTimer = 0;
                upMusicTimerMax = (Math.random() * 30 + 1) + 30;
            }
        }
        // right arrow settings
        if (i == rightNum && rightArrowTimer >= rightMusicTimerMax){
            if (data[i] > 25 && data[i] < 150){
                createArrow(1);
                rightArrowTimer = 0;
                rightMusicTimerMax = (Math.random() * 30 + 1) + 30;
            }
        }
        // down arrow settings
        if (i == downNum && downArrowTimer >= downMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(2);
                downArrowTimer = 0;
                downMusicTimerMax = (Math.random() * 30 + 1) + 30;
            }
        }
        // left arrow settings
        if (i == leftNum && leftArrowTimer >= leftMusicTimerMax){
            if (data[i] > 25 && data[i] < 175){
                createArrow(3);
                leftArrowTimer = 0;
                leftMusicTimerMax = (Math.random() * 30 + 1) + 30;
            }
        }
    }
}
