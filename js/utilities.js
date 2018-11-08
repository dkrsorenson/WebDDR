export {getRandomUnitVector, getRandomColor, generateRandColor};

// these 2 helpers are used by classes.js
function getRandomUnitVector(){
	let x = getRandom(-1,1);
	let y = getRandom(-1,1);
	let length = Math.sqrt(x*x + y*y);
	if(length == 0){ // very unlikely
		x=1; // point right
		y=0;
		length = 1;
	} else{
		x /= length;
		y /= length;
	}

	return {x:x, y:y};
}

// gets a random number
function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

// gets a random color
function getRandomColor(){
	const getByte = _ => 55 + Math.round(Math.random() * 200);
	return `rgba(${getByte()}, ${getByte()}, ${getByte()}, .8`;
}

// generates a random color
function generateRandColor() {
	var hue = 'rgb(' + (Math.floor(Math.random() * 256)) 
	+ ',' + (Math.floor(Math.random() * 256)) 
	+ ',' + (Math.floor(Math.random() * 256)) + ')';

	return hue;
}