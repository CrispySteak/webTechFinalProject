// homeScript.js
// This is the JavaScript file for the homepage

//Shitty global variables
var gameCanvas;			//canvas element
var ctx;				//canvas context

var BOARD_MAX_WIDTH = 800;
var BOARD_MAX_HEIGHT = 600;

var board = {
	rows	: 3,
	columns	: 3,
	width	: BOARD_MAX_WIDTH,
	height	: BOARD_MAX_HEIGHT
}

var image = {
	source	: "",
	width	: 0,
	height	: 0
}

$(document).ready(function(){
	
//	gameCanvas=document.getElementById("gameCanvas");				//assign canvas on load
//	ctx=gameCanvas.getContext("2d");								//assign canvas
//	gameCanvas.addEventListener('click', gameCanvasClick, false);	//add click listener to canvas
//	ctx.font='20px Arial';											//sent the font of the context for text output (otherwise it is illegible)
//	ctx.fillText("Click to start the game!",50,50);					//the dimensions do not seem to line up with pixels too well
	
	
	
	
	// handler for the "Start!" button
	$("#start_button").click(function() {
		$("#game_selection").fadeOut(400);
		
		// set the board size based on the aspect ratio of the selected image
		image.source = "jellyfish.jpg";
		//image.width = $("#chosen_image").naturalWidth();
		//image.height = $("#chosen_image").naturalHeight();
		
		var newSize = scaleSize(board.width,board.height,800,600);
		
		image.width = newSize[0];
		image.height = newSize[1];
		

		// set the rows/columns based on the difficulty
		var difficulty = $("input[name=radio1]:checked").val();
		
		if(difficulty == 0)
		{
			board.rows = 3;
			board.columns = 3;
		}
		else if(difficulty == 1)
		{
			board.rows = 5;
			board.columns = 5;
		}
		else if(difficulty == 2)
		{
			board.rows = 7;
			board.columns = 7;
		}
		else if(difficulty == 3)
		{
			board.rows = 9;
			board.columns = 9;
		}
		
		// do something based on the game mode selected (show a timer or don't)
		
		// cut up the image
		for(var i = 0;i<board.rows;i++)
		{
			for(var j = 0;j<board.columns;j++)
			{
				var newDiv = document.createElement("div");
				newDiv.className = "piece_class";
				newDiv.id = "piece" + ((i * board.rows) + j);
				newDiv.width = board.width / board.columns;
				newDiv.height = board.height / board.rows;
				
				document.getElementById("gameboard").appendChild(newDiv);
				
				var newImage = document.createElement("img");
				newImage.src = image.source;
				newImage.width = image.width;
				newImage.height = image.height;
				
				newDiv.appendChild(newImage);
			}
		}
		
	});
});


function scaleSize(maxW, maxH, currW, currH){

	var ratio = currH / currW;
	alert(currW + " " + currH);
	if(currW >= maxW && ratio <= 1){
		currW = maxW;
		currH = currW * ratio;
	} else if(currH >= maxH)
	{
		currH = maxH;
		currW = currH / ratio;
	}
	alert(currW + " " + currH);
	return [currW, currH];
}


function gameCanvasClick(e)
{
	ctx.clearRect(0, 0, 512, 512);									//clear screen from top left to bottom right
}//end of gameCanvasClick