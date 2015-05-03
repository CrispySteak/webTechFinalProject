<!-- index.php -->

<html>
	<head>
		<?php 
			include_once("includes.php");
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
		
		<!-- The game board itself... think divs within divs, the inner divs are all displaying part of the image and are moveable and will snap -->
		<div id="board">
		</div>
		
		
	</body>

</html>