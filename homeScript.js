// homeScript.js
// This is the JavaScript file for the homepage

//Shitty global variables
var gameCanvas;			//canvas element
var ctx;				//canvas context

$(document).ready(function(){
	gameCanvas=document.getElementById("gameCanvas");				//assign canvas on load
	ctx=gameCanvas.getContext("2d");								//assign canvas
	gameCanvas.addEventListener('click', gameCanvasClick, false);	//add click listener to canvas
	ctx.font='20px Arial';											//sent the font of the context for text output (otherwise it is illegible)
	ctx.fillText("Click to start the game!",50,50);					//the dimensions do not seem to line up with pixels too well
});

function gameCanvasClick(e)
{
	ctx.clearRect(0, 0, 512, 512);									//clear screen from top left to bottom right
}//end of gameCanvasClick