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

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomColor(){
	const getByte = _ => 55 + Math.round(Math.random() * 200);
	return `rgba(${getByte()}, ${getByte()}, ${getByte()}, .8`;
}

function generateRandColor() {
	var hue = 'rgb(' + (Math.floor(Math.random() * 256)) 
	+ ',' + (Math.floor(Math.random() * 256)) 
	+ ',' + (Math.floor(Math.random() * 256)) + ')';

	return hue;
}