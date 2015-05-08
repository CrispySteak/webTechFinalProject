// homeScript.js
// This is the JavaScript file for the homepage

//Shitty global variables
var gameCanvas;			//canvas element
var ctx;				//canvas context


var current_time=0;
var timer;

var leaderboardXML;

var BOARD_MAX_WIDTH = 800;
var BOARD_MAX_HEIGHT = 600;

var CHOOSE_WIDTH = 400;
var CHOOSE_HEIGHT = 300;

var SNAP_DISTANCE = 20;

var TIMER = false;

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
var imagesArray = ["jellyfish.jpg","tree.jpg","IMG_1627.jpg","gto.jpg","city.jpg","cat.jpg"];
var current_image = 0;


//-------------------------------------------------------------
// Document Ready Function
//-------------------------------------------------------------
$(document).ready(function(){
	
	$("#win_screen").hide();
	$("#gameboard").width(board.width);
	$("#gameboard").height(board.height);
	setupWindow();	
	
	//-------------------------------------------------------------
	// handler for the "Start!" button
	//-------------------------------------------------------------
	$("#start_button").click(startGame);
	$("#previous_button").click(previousImage);
	$("#next_button").click(nextImage);
	$("#win_button").click(restartGame);
	$("#enter_button").click(fadeSplash);
	$("#leaderboard_button").click(showLeaderboard);
	$("#return_button").click(restartGame);
	$("#leaderboard_button_endgame").click(showLeaderboard);
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
	$("#image_chooser_wrapper").width(CHOOSE_WIDTH + 6);
	$("#image_chooser_wrapper").height(CHOOSE_HEIGHT + 6);
	$("#chosen_image").width(chooseSize[0]);
	$("#chosen_image").height(chooseSize[1]);
	$("#game_selection").height($(window).height() - 50);
	$("#game_selection").width($(window).width() - 20);
	$("#win_screen").height($(window).height() - 50);
	$("#win_screen").width($(window).width() - 20);
	$("#splash_screen").height($(window).height());
	$("#splash_screen").width($(window).width());
	
	chooseSize = scaleSize(800,600,document.getElementById("splash_image").naturalWidth,document.getElementById("splash_image").naturalHeight);
	
	$("#title_div").width(chooseSize[0]);
	$("#title_div").height(chooseSize[1]);
	$("#splash_image").width(chooseSize[0]);
	$("#splash_image").height(chooseSize[1]);
	
	//make ajax xmlhttprequest for leaderboard_button
	var request= new XMLHttpRequest();
	request.onreadystatechange=function()
	{
		if (request.readyState==4 && request.status==200)
		{
			leaderboardXML=request.responseXML;
		}//end of if
	}//end of inline function
	request.open("GET","highscores.xml",true);
	request.send();
}
//-------------------------------------------------------------

function fadeSplash()
{
	$("#splash_screen").slideUp(500);
}
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
	
	if(current_image == 0)
		current_image = imagesArray.length;
	
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
		clearInterval(timer);//stop the timer
		document.getElementById("timer").innerHTML ="";					//stop displaying timer here as it should be on the win screen anyways
		document.getElementById("time_value").innerHTML = current_time;
		document.getElementById("win_header").innerHTML = "Nice Job!";
		
		if(!TIMER)
		{
			$("#time_value").hide();
			$("#time_label").hide();
			$("#text_input_div").hide();
			$("#submit_score_div").hide();
		}
		else
		{
			//wern't doing anything
			//$("#time_value").show();
			//$("#time_label").show();
			//$("#text_input_div").show();
			//$("#submit_score_div").show();
			showLeaderboard();
		}
		
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
	$("#highscore_container").hide();
	
	TIMER = false;	//reset the timer
	
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
		timer=setInterval(function () {
			current_time++;//change time
			document.getElementById("timer").innerHTML = current_time;
		}, 1000);//every 1000 milliseconds
		
		TIMER = true;
	}//end of if
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
	$("#highscore_container").fadeOut(250);
	$("#game_selection").delay(250).fadeIn(250);
	current_time=0;//reset the time
}

function showLeaderboard()
{
	//var difficultys = response.getElementsByTagName('difficulty')[0].firstChild.data;
	//get current image and query xml for the relevent <img><imgname>...</..
	var currentDifficulty = $("input[name=radio1]:checked").val(); //get the difficulty the user has selected
	var difficultyName;
	
	switch (currentDifficulty) 
	{
    case "0":
        difficultyName="easy";
        break;
	case "1":
        difficultyName="medium";
        break;
	case "2":
        difficultyName="hard";
        break;
	case "3":
        difficultyName="expert";
        break;
    default:
        alert("error"+currentDifficulty);
        break;
	}
	
	
	//note that leaderboardXML is a XML DOM object
	var imageArray=leaderboardXML.getElementsByTagName('imgname');
	var currentImageXML;
	for (var i=0;i<imageArray.length;i++)//determine the image
	{
		if (imagesArray[current_image].textContent ==imageArray[i].data)
		{
			currentImageXML=imageArray[i];
		}//end of if
	}//end of for
	//determine the difficulty node
	var difficulty = currentImageXML.parentNode.getElementsByTagName(difficultyName);
	var outputHTML="<table>";
	var members=difficulty[0].childNodes;
	for(var i=1; i<13;i=i+2)//6 is the number of xml members (member0,member1...) 13 is because of some weird text nodes
	{
		outputHTML +=  "<tr>"+"<td>";
		outputHTML += members[i].childNodes[0].textContent;
		outputHTML += "</td>"+"<td>";
		outputHTML +=  members[i].childNodes[1].textContent;
		outputHTML += "</td>"+"<\tr>";
	}
	outputHTML+= "</table>";
	$("#highscore_table").innerHTML=outputHTML;
	
	
	fadeSplash();
	$("#win_screen").fadeOut(250);
	$("#game_selection").fadeOut(250);
	$("#highscore_container").delay(250).fadeIn(250);
}