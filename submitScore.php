<?php
	$dom=new DOMDocument();
	$dom->load("highscores.xml");

	$root=$dom->documentElement;
	$images=$root->getElementsByTagName('imgname');
	$currentImage;
	for ($i=0;i<$images.length;i++)
	{
		if ($images->item(i)->textContent==$_POST[image])
		{
			$currentImage=$images->item(i);
		}
	}
	//determine difficulty
	$difficulty=$currentImage->getElementsByTagName($_POST[difficulty]);
	$members=$difficulty->item(0)->childNodes;
	$found=false
	//determine where to insert the username and score
	for($i=1; i<13&&!found;i=i+2)
	{
		if($members->item(i)->childNodes->item(3)<=$_POST[score])
		{
			for($j=13; j>i;j=j-2)//loop and move successive entries "down"
			{
				$members->item(j-2)->childNodes->item(1)=$members->item(j-2)->childNodes->item(1);
				$members->item(j-2)->childNodes->item(3)=$members->item(j-2)->childNodes->item(3);
			}
			$members->item(i)->childNodes->item(3)=$_POST[score];
			$members->item(i)->childNodes->item(1)=$_POST[username];
			$found=true;
		}
	}//end of for
	
?>