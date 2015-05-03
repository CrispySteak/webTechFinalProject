<!-- index.php -->

<html>
	<head>
		<?php 
			include_once("includes.php");
			echo "Hello";
		?>
		<script src="homeScript.js"></script>	
	</head>
	
	<body>
		<?php
			include_once("header.php");
			//include_once("navigation.php");
			
		?>
		<!-- Comment this out for now... lets try div-ception first...
		<canvas id="gameCanvas"">
		</canvas> -->
		
		<!-- The image selection slider at the top of the page -->
		<div id="image_selection">
		</div>
		
		<div id="game_selection">
			
			<div id="image_selection">
			</div>
			
			<div id="game_selection_form">
				<div id="difficulty_selection">
					<input type="radio" name="radio" id="radio1" class="radio" checked/>
					<label for="radio1">Easy</label>
					</div>

					<div>
					<input type="radio" name="radio" id="radio2" class="radio"/>
					<label for="radio2">Medium</label>
					</div>

					<div>	
					<input type="radio" name="radio" id="radio3" class="radio"/>
					<label for="radio3">Hard</label>
					</div>

					<div>	
					<input type="radio" name="radio" id="radio4" class="radio"/>
					<label for="radio4">Expert</label>
					</div>
				</div>
				<button type="button">Timed</button>
			</div>
			
		</div>
		
		<!-- The game board itself... think divs within divs, the inner divs are all displaying part of the image and are moveable and will snap -->
		<div id="board">
		</div>
		
		
	</body>

</html>