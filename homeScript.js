// homeScript.js
// This is the JavaScript file for the homepage

//Shitty global variables
var gameCanvas;			//canvas element
var ctx;				//canvas context

var BOARD_MAX_WIDTH = 800;
var BOARD_MAX_HEIGHT = 600;

var CHOOSE_WIDTH = 300;
var CHOOSE_HEIGHT = 100;

var SNAP_DISTANCE = 20;

var board = {
	rows	: 3,
	columns	: 3,
	width	: BOARD_MAX_WIDTH,
	height	: BOARD_MAX_HEIGHT
}

var selectedImage = {
	source	: "",
	width	: 0,
	height	: 0
}


// PuzzlePiece Object
function PuzzlePiece(in_row,in_column,in_object)
{
	this.x = in_row;
	this.y = in_column;
	this.object = in_object;	
}

// the array of pieces
var pieces = [];

// images to choose from
var imagesArray = ["jellyfish.jpg","tree.jpg"];
var current_image = 0;

// win variable
var correct_placed = 0;

//-------------------------------------------------------------
// Document Ready Function
//-------------------------------------------------------------
$(document).ready(function(){
	
	$("#chosen_image").hide();
	
	setupWindow();	
	
	//-------------------------------------------------------------
	// handler for the "Start!" button
	//-------------------------------------------------------------
	$("#start_button").click(function() {
		$("#game_selection").fadeOut(400);
		
		// set the image properties based on the selected image
		selectedImage.source = document.getElementById("chosen_image").src;
		selectedImage.width = document.getElementById("chosen_image").naturalWidth;
		selectedImage.height = document.getElementById("chosen_image").naturalHeight;
		
		// adjust the image to a proper size
		var newSize = scaleSize(board.width,board.height,selectedImage.width,selectedImage.height);
		
		selectedImage.width = newSize[0];
		selectedImage.height = newSize[1];
		
		// set board to aspect ratio
		board.width = selectedImage.width;
		board.height = selectedImage.height;
		
		$("#gameboard").width(board.width);
		$("#gameboard").height(board.height);

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
				
				// the div that contains the image
				var newDiv = document.createElement("div");
				newDiv.className = "piece_div_class";
				newDiv.id = "piece_div" + ((i * board.rows) + j);
				newDiv.width = board.width / board.columns;
				newDiv.height = board.height / board.rows;
				
				document.getElementById("gameboard").appendChild(newDiv);
				
				// the image to put in the div (with the correct offset applied
				var newImage = document.createElement("img");
				newImage.className = "piece_image_class";
				newImage.id = "piece_image" + ((i * board.rows) + j);
				
				newImage.src = selectedImage.source;
				newImage.width = selectedImage.width;
				newImage.height = selectedImage.height;
				
				newDiv.appendChild(newImage);
				
				// set the css of the specific piece
				$("#piece_image" + ((i * board.rows) + j)).css({"position":"absolute",
					"left":"-" + Math.floor((newDiv.width * j)) + "px",
					"top":"-" + Math.floor((newDiv.height * i)) + "px"});
				
				// set the click listener for the piece
				$("#piece_image" + ((i * board.rows) + j)).mouseup(pieceRelease);
				//$("#piece_image" + ((i * board.rows) + j)).click(pieceClicked);
				
				// add the piece to the array of pieces
				var tempPiece = new PuzzlePiece(j,i,newImage);
				pieces.push(tempPiece);
			}
		}
		
		$(".piece_div_class").width(board.width/board.columns);
		$(".piece_div_class").height(board.height/board.rows);
		$(".piece_div_class").draggable();
		$("#gameboard").delay(400).fadeIn(400);
		
	}); // end Start! button handler
	//-------------------------------------------------------------
});
//-------------------------------------------------------------


function setupWindow()
{
	$("#gameboard").hide();
	
	//$("#chosen_image").attr('src',imagesArray[1]);
	// adjust the image to a proper size
	//alert(document.getElementById("chosen_image").naturalWidth);
	var chooseSize = scaleSize(CHOOSE_WIDTH,CHOOSE_HEIGHT,document.getElementById("chosen_image").naturalWidth,document.getElementById("chosen_image").naturalHeight);
	$("#image_chosen_div").width(chooseSize[0]);
	$("#image_chosen_div").height(chooseSize[1]);
	$("#chosen_image").width(chooseSize[0]);
	$("#chosen_image").height(chooseSize[1]);
	$("#game_selection").height($(window).height() - 20);
	$("#game_selection").width($(window).width() - 20);
	$("#chosen_image").show();
	//alert(document.getElementById("chosen_image").naturalWidth);
}

//-------------------------------------------------------------
// Function to scale the image size to the board size
//-------------------------------------------------------------
function scaleSize(maxW, maxH, currW, currH){

	var ratio = currH / currW;
	//alert(currW + " " + currH);
	if(currW >= maxW && ratio <= 1){
		currW = maxW;
		currH = currW * ratio;
	} else 
	{
		if(currH >= maxH)
		{
			currH = maxH;
			currW = currH / ratio;
		}
	}
	//alert(currW + " " + currH);
	return [currW, currH];
}
//-------------------------------------------------------------


//-------------------------------------------------------------
// Piece Click Function
//-------------------------------------------------------------
function nextImage(event){	
	
	current_image = ( current_image + 1 ) % imagesArray.length;
	$("#chosen_image").attr("src",imagesArray[current_image]);
	
	var chooseSize = scaleSize(CHOOSE_WIDTH,CHOOSE_HEIGHT,document.getElementById("chosen_image").naturalWidth,document.getElementById("chosen_image").naturalHeight);
	$("#image_chosen_div").width(chooseSize[0]);
	$("#image_chosen_div").height(chooseSize[1]);
	$("#chosen_image").width(chooseSize[0]);
	$("#chosen_image").height(chooseSize[1]);
}
//-------------------------------------------------------------


//-------------------------------------------------------------
// Piece Clicked Function
//-------------------------------------------------------------
function pieceClicked(event){	
	correct_placed -= 1;
}
//-------------------------------------------------------------


//-------------------------------------------------------------
// Piece Release Function
//-------------------------------------------------------------
function pieceRelease(event){	
	
	if(Math.abs(parseInt(event.target.parentNode.style.left,10)) < SNAP_DISTANCE && Math.abs(parseInt(event.target.parentNode.style.top,10)) < SNAP_DISTANCE)
	{
		event.target.parentNode.style.left = 0;
		event.target.parentNode.style.top = 0;
	}
	
	if(checkWinner())
	{
		// WINNER
		alert("Winner!");
	}
}
//-------------------------------------------------------------

//-------------------------------------------------------------
// Function to check the winner
//-------------------------------------------------------------
function checkWinner()
{
	
	for(var i = 1;i < document.getElementById("gameboard").childNodes.length; i++)
	{
		if(parseInt(document.getElementById("gameboard").childNodes[i].style.left,10) != 0 || parseInt(document.getElementById("gameboard").childNodes[i].style.top,10) != 0)
		{
			return false;
		}
	}
	
	return true;
}
//-------------------------------------------------------------