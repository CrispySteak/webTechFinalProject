// homeScript.js
// This is the JavaScript file for the homepage

//Shitty global variables
var gameCanvas;			//canvas element
var ctx;				//canvas context


var current_time=60;

var BOARD_MAX_WIDTH = 800;
var BOARD_MAX_HEIGHT = 600;

var CHOOSE_WIDTH = 400;
var CHOOSE_HEIGHT = 300;

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


//-------------------------------------------------------------
// Document Ready Function
//-------------------------------------------------------------
$(document).ready(function(){
	
	$("#win_screen").hide();
	//$("#chosen_image").hide();
	$("#gameboard").width(board.width);
	$("#gameboard").height(board.height);
	//setupImageChoices();
	setupWindow();	
	
	//-------------------------------------------------------------
	// handler for the "Start!" button
	//-------------------------------------------------------------
	$("#start_button").click(startGame);
	$("#previous_button").click(previousImage);
	$("#next_button").click(nextImage);
	$("#win_button").click(restartGame);
	//-------------------------------------------------------------
});
//-------------------------------------------------------------

//-------------------------------------------------------------
// Function to set up window
//-------------------------------------------------------------
function setupImageChoices()
{
	for(var i = 0;i < imagesArray.length;i++)
	{
		
	}
}
//-------------------------------------------------------------

//-------------------------------------------------------------
// Function to set up window
//-------------------------------------------------------------
function setupWindow()
{
	// adjust the image to a proper size
	var chooseSize = scaleSize(CHOOSE_WIDTH,CHOOSE_HEIGHT,document.getElementById("chosen_image").naturalWidth,document.getElementById("chosen_image").naturalHeight);
	$("#image_chosen_div").width(chooseSize[0]);
	$("#image_chosen_div").height(chooseSize[1]);
	$("#chosen_image").width(chooseSize[0]);
	$("#chosen_image").height(chooseSize[1]);
	$("#game_selection").height($(window).height() - 50);
	$("#game_selection").width($(window).width() - 20);
	$("#win_screen").height($(window).height() - 50);
	$("#win_screen").width($(window).width() - 20);
	//$("#chosen_image").show();
	//alert(document.getElementById("chosen_image").naturalWidth);
}
//-------------------------------------------------------------

//-------------------------------------------------------------
// Function to scale the image size to the board size
//-------------------------------------------------------------
function scaleSize(maxW, maxH, currW, currH){

	var ratio = currH / currW;
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
	return [currW, currH];
}
//-------------------------------------------------------------

//-------------------------------------------------------------
// Next Image Function
//-------------------------------------------------------------
function nextImage(event){	
	
	$("#chosen_image").remove();
	current_image = ( current_image + 1 ) % imagesArray.length;
	
	showNewImage();
	
}
//-------------------------------------------------------------

//-------------------------------------------------------------
// Previous Image Function
//-------------------------------------------------------------
function previousImage(event){	
	
	$("#chosen_image").remove();
	current_image = ( current_image - 1 ) % imagesArray.length;
	
	showNewImage();
	
}
//-------------------------------------------------------------

function showNewImage()
{
	var newImage = document.createElement("img");
	newImage.src = imagesArray[current_image];
	newImage.id = "chosen_image";
	
	document.getElementById("image_chosen_div").appendChild(newImage);
	
	var chooseSize = scaleSize(CHOOSE_WIDTH,CHOOSE_HEIGHT,document.getElementById("chosen_image").naturalWidth,document.getElementById("chosen_image").naturalHeight);
	$("#image_chosen_div").width(chooseSize[0]);
	$("#image_chosen_div").height(chooseSize[1]);
	$("#chosen_image").width(chooseSize[0]);
	$("#chosen_image").height(chooseSize[1]);
}
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
		document.getElementById("win_header").innerHTML = "Nice Job!";
		$("#win_screen").fadeIn(500);
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

//-------------------------------------------------------------
// Function to start the game
//-------------------------------------------------------------
function startGame() 
{
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
		SNAP_DISTANCE=50;
	}
	else if(difficulty == 1)
	{
		board.rows = 5;
		board.columns = 5;
		SNAP_DISTANCE=30;
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
	if ($("input[name=radio]:checked").val()==1)//if timer checked
	{
		//setup timer function to countdown every second
		setInterval(function () {
			current_time--;//change time
			document.getElementById("timer").innerHTML = current_time;
		}, 1000);//every 1000 milliseconds
	}
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
			
			// add the piece to the array of pieces
			var tempPiece = new PuzzlePiece(j,i,newImage);
			pieces.push(tempPiece);
		}
	}
	
	$(".piece_div_class").width(board.width/board.columns);
	$(".piece_div_class").height(board.height/board.rows);
	$(".piece_div_class").draggable();
	
	shuffle();
	
	//$("#gameboard").delay(400).fadeIn(400);
	
}
//-------------------------------------------------------------

//-------------------------------------------------------------
// Shuffle Pieces
//-------------------------------------------------------------
function shuffle() 
{
	var offset_left = $("#piece_div0").offset().left;
	var offset_top = $("#piece_div0").offset().top;
	var piece_width = board.width / board.columns;
	var piece_height = board.height / board.rows;
	
	for(var i = 0;i < board.rows*board.columns; i++)
	{
		document.getElementById("piece_div" + i).style.left = ((Math.random() * ($(document).width() - piece_width))) - $("#piece_div" + i).offset().left;
		document.getElementById("piece_div" + i).style.top = ((Math.random() * ($(window).height() - piece_height))) - $("#piece_div" + i).offset().top;
	}
}
//-------------------------------------------------------------

function restartGame()
{
	for(var i = 0;i < board.rows*board.columns; i++)
	{
		$("#piece_div" + i).remove();
	}
	
	$("#win_screen").fadeOut(250);
	$("#game_selection").delay(250).fadeIn(250);
}