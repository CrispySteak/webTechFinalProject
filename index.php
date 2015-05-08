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
		
		<div id="game_selection">
		
			<div id="image_selection">
				<div id="image_chooser_wrapper">
					<div id="image_chosen_div">
						<img id="chosen_image" src="jellyfish.jpg" alt="image"/>
					</div>
				</div>
		
				<div id="image_select_button_container">
					<div id="image_select_button_div">
						<button type="button" class="button_class" id="previous_button">Previous</button>
						<button type="button" class="button_class" id="next_button">Next</button>
					</div>
				</div>
					
			</div>
			
			<div id="game_selection_form">
				<div id="difficulty_selection">
					<div class="radio_class difficulty_radio">
						<input type="radio" name="radio1" id="easy_radio" class="radio" value=0 checked/>
						<label for="easy_radio">Easy</label>
					</div>

					<div class="radio_class difficulty_radio">
						<input type="radio" name="radio1" id="medium_radio" class="radio" value=1 />
						<label for="medium_radio">Medium</label>
					</div>

					<div class="radio_class difficulty_radio">	
						<input type="radio" name="radio1" id="hard_radio" class="radio" value=2 />
						<label for="hard_radio">Hard</label>
					</div>

					<div class="radio_class difficulty_radio">	
						<input type="radio" name="radio1" id="expert_radio" class="radio" value=3 />
						<label for="expert_radio">Expert</label>
					</div>
				</div>
				
				<div id="mode_selection">
					<div class="radio_class mode_radio">
						<input type="radio" name="radio" id="casual_radio" class="radio" value=0 checked/>
						<label for="casual_radio">Casual</label>
					</div>

					<div class="radio_class mode_radio">
						<input type="radio" name="radio" id="timed_radio" class="radio" value=1 />
						<label for="timed_radio">Timed</label>
					</div>
					
				</div>
				
				<div id="game_start">
					<div class="start_class">
						<button type="button" class="button_class" id="start_button">Start!</button>
					</div>
				</div>
			</div>
			
		</div>
		
		<div id="win_screen">
			<h1 id="win_header"></h1>
			<div id="highscore_container">
				<div id="highscore_list">
				</div>
				<div id="time_label">
					Time:
				</div>
				<div id="time_value">
				</div>
				<div id="text_input_div">
					<input type="text" name="username" value="Name"/>
				</div>
				<div id="submit_score_div">
					<button type="button" class="button_class" id="submit_score_button">Submit</button>
				</div>
			</div>
			<div id="win_button_container">
				<div id="win_button_div">
					<button type="button" class="button_class" id="win_button">Play Again!</button>
				</div>
			</div>
		</div>
		
		<!-- The game board itself... think divs within divs, the inner divs are all displaying part of the image and are moveable and will snap -->
		<div id="gameboard">
		</div>
		<div id="timer" contenteditable="true">
		</div>
	</body>

</html>