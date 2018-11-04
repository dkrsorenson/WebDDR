export {Song};
class Song{
    constructor(songName, highScore=0, time=0, difficulty = 0, color = "red"){
        this.songName = songName;
        this.highScore = highScore;
        this.time = time;
        this.difficulty = difficulty;
        this.color = color;
    }
    
    setHighScore(highScore=0){
        this.highScore = highScore;
    }
}