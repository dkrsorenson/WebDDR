import {createArrow,currentSong} from './scenes.js';
export {musicInit, musicUpdate, playBackgroundMusic};

// variables
let audioElement, analyserNode;
let NUM_SAMPLES = 256;
let musicTimer, musicTimerMax = 30;
let upArrowTimer, rightArrowTimer, leftArrowTimer, downArrowTimer;
let playing = false;

let backgroundSound = 'media/songs/backgroundmusic.mp3';
let SOUND_1 = 'media/songs/gumball.mp3';
let SOUND_2 = 'media/songs/Pokemon.mp3';
let SOUND_3 = 'media/songs/Scooby Doo.mp3';
let SOUND_4 = 'media/songs/Sponge Bob Square Pants.mp3';
let SOUND_5 = 'media/songs/Lay it down.mp3';
let SOUND_6 = 'media/songs/Lover Boy.mp3';
let SOUND_7 = 'media/songs/Outset Island.mp3';

let track = backgroundSound;

function musicInit(){
    musicTimer = musicTimerMax;
    upArrowTimer = musicTimerMax;
    downArrowTimer = musicTimerMax;
    leftArrowTimer = musicTimerMax;
    rightArrowTimer = musicTimerMax;

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
    audioElement.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audioElement.play();
    audioElement.volume = 0.3;
}

function playBackgroundMusic() {
    if(playing == false){
        playStream(audioElement,backgroundSound);
    } 
}

function musicUpdate() { 
    // this schedules a call to the update() method in 1/60 seconds
    //requestAnimationFrame(musicUpdate);
    
	// load and play default sound into audio element
	if(playing == false) {
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

    musicTimer++;
    upArrowTimer++;
    leftArrowTimer++;
    rightArrowTimer++;
    downArrowTimer++;
} 

// draw arrows based on frequency
function generateArrowsBasedOnMusic(data){
    let upNum = 3;
    let downNum = 2;
    let rightNum = 1;
    let leftNum = 4;
    //if (musicTimer >= musicTimerMax){
        for (let i = 0; i < data.length; i++) {
            // up arrow settings
            if (i == upNum && upArrowTimer >= musicTimerMax){
                if (data[i] > 50 && data[i] < 150){
                    createArrow(0);
                    upArrowTimer = 0;
                    musicTimerMax = (Math.random() * 30 + 1) + 30;
                }
            }
            // right arrow settings
            if (i == rightNum && rightArrowTimer >= musicTimerMax){
                if (data[i] > 50 && data[i] < 150){
                    createArrow(1);
                    rightArrowTimer = 0;
                    musicTimerMax = (Math.random() * 20) + 20;
                }
            }
            // down arrow settings
            if (i == downNum && downArrowTimer >= musicTimerMax){
                if (data[i] > 50 && data[i] < 150){
                    createArrow(2);
                    downArrowTimer = 0;
                    musicTimerMax = (Math.random() * 20) + 20;
                }
            }
            // left arrow settings
            if (i == leftNum && leftArrowTimer >= musicTimerMax){
                if (data[i] > 50 && data[i] < 150){
                    createArrow(3);
                    leftArrowTimer = 0;
                    musicTimerMax = (Math.random() * 20) + 20;
                }
            }
        }
        //musicTimer = 0;
    //}
}
