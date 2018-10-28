export {Song};
class Song{
    constructor(songName, highScore=0, time=0, difficulty = 0){
        this.songName = songName;
        this.highScore = highScore;
        this.time = time;
        this.difficulty = difficulty;
    }
    
    setHighScore(highScore=0){
        this.highScore = highScore;
    }
}