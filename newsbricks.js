/*
 * Newsbricks Jquery Plugin by Martin Fredriksson
 * http://martinfredriksson.com
 *
 * Copyright 2013, Martin Fredriksson
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

 $.fn.massyCarousel = function(options) {

 	var config = {
 		//Enter the default settings here
 	    'blockSizeX' : 200, 
 	    'blockSizeY' : 200,
 	    'entryEffect': 'bounceDown',
 	    'hoverEffect': 'fade',
 	    'textEntryEffect': 'bounceUp',
 	    //Should the plugin create a box over each image?
 	    'overlay': 'enabled',
 	    //Decide wheter or not to display the progress bar
 	    'progressBar': 'enabled',
 	    //Time displaying each item
 	    'switchTime': 5000,
 	};

 	if (options){$.extend(config, options);}



 	//Div that the script should be applied to (In case of demo: massy-featured)
 	var pluginContainer = this.attr("id");


/* SNIPPETS THAT CAN GET USEFUL */
 	//Get an array of all the image sources
 	var arr = $("#" + pluginContainer +" img").map(function() { return this.src; }).get()
 	//Count the images
 	var noOfBlocks = $("#" + pluginContainer +" .massy-block").length;

 	var noOfRows = $("#" + pluginContainer + " .massy-row").length;

 	var imgPerRow = noOfBlocks / noOfRows;
/* END SNIPPETS THAT CAN GET USEFUL */



 	$( document ).ready(function() {
 	// Things to do when the document is ready

 	//Add first and last classes to the first and last block
 	$('.massy-block').first().addClass("current-block");
 	$('.massy-block').last().addClass("newsbricks-last");

 	//Now give all the boxes an ID
 		var count = 1; 
 		$('.massy-block').each(function(i, obj) {
 		 		$(this).attr('id', "newsbricks-block-" + count);
 		 		count++;
 		});


	 //Create the overlays for the images by looping through the rows
	if(config.overlay == 'enabled'){
		 var count = 1; 
		$('.massy-block').each(function(i, obj) {
		 		$(this).append("<div class='massy-overlay' id='newsbricks-overlay-" + count + "' style='width: " + config.blockSizeX + "px; height: " + config.blockSizeY + "px;'></div>");
		 		count++;
		});
		//Hide the overlays to begin with
		$("#" + pluginContainer + " .massy-overlay").css("display", "none");
	}

	//Create the boxes displaying the content
		 var count = 1; 
		$('.massy-block').each(function(i, obj) {
		 		$('#massy-featured').append("<div class='massy-content' id='newsbricks-content-" + count + "'></div>");
		 		var content = $(this).html();
		 		$("#newsbricks-content-" + count).append(content);
		 		$('.massy-content').find('img').remove();
		 		count++;
		});
		//Hide the overlays to begin with
		//$("#" + pluginContainer + " .massy-overlay").css("display", "none");




		var count = 1; 
		$('.massy-block').each(function(i, obj){
			//Create a progress bar for every block
			$(this).append("<div class='massy-progress-bar' id='newsbricks-progress-" + count + "'></div>");
			count++;
		});

		//Animate the currently displayed blocks progress bar
	 	 $(".current-block").find('.massy-progress-bar').animate({
		 	 width: "+=" + config.blockSizeX,
		 	 }, config.switchTime, function(){ 
				//Animation complete, switch block
				switchBlock();
			});

	 	//If the progressbar is disabled, hide it by adding "display:none"
	 	 if(config.progressBar != "enabled"){
	 	 	$('.massy-progress-bar').each(function(i, obj){
	 	 		$(this).css("display", "none");
	 	 	});
	 	 }

	//$('.massy-block current').find('.massy-progress-bar').append("")



 	//Make a fabulous entry with an animation as long as entryEffect is not 'none'
 	 if(config.entryEffect != 'none'){
 		switch(config.entryEffect){

 			case 'bounceDown' : 

 				 		//Bounce in from top
 					 	 $("#" + pluginContainer + " #massy-rows").css("top", "-200px");
 					 	 $("#" + pluginContainer + " #massy-rows").animate({
 						 	 top: "+=200",
 						 	 }, 1000, 'easeOutBounce');
 						//Animation complete.
 			break;

 			case 'bounceUp' : 

	 			 		//Bounce in (inverted)
	 				 	 $("#" + pluginContainer + " #massy-rows").css("bottom", "-200px");
	 				 	 $("#" + pluginContainer + " #massy-rows").animate({
	 					 	 bottom: "+=200",
	 					 	 }, 1000, 'easeOutBounce');
	 					//Animation complete.
	 		break;
		}
	 }


	 //Add an animation for the text part of the plugin
	 if(config.textEntryEffect != 'none'){
	 	 		switch(config.textEntryEffect){

	 	 			case 'bounceDown' : 

	 	 				 		//Bounce in from top
	 	 					 	 $("#" + pluginContainer + " #massy-content").css("top", "-200px");
	 	 					 	 $("#" + pluginContainer + " #massy-content").animate({
	 	 						 	 top: "+=200",
	 	 						 	 }, 1000, 'easeOutBounce');
	 	 						//Animation complete.
	 	 			break;

	 	 			case 'bounceUp' : 

	 		 			 		//Bounce in (inverted)
	 		 				 	 $("#" + pluginContainer + " #massy-content").css("bottom", "-200px");
	 		 				 	 $("#" + pluginContainer + " #massy-content").animate({
	 		 					 	 bottom: "+=200",
	 		 					 	 }, 1000, 'easeOutBounce');
	 		 					//Animation complete.
	 		 		break;

				 }

	}


 	});


//Add some hover effects for maximum awesome if hoverEffect is not "none"
if(config.hoverEffect != 'none'){
 	
 	switch(config.hoverEffect){

 		case 'fade':

 		 	$("#" + pluginContainer +" .massy-block").hover(function(){
 		 	  //On hover make the image fade to 1
 		 	  		$(this).find("img").stop().fadeTo(250, 1);
 		 	}, function(){
 		 		//When leaving the image, make sure it fades back to 0.5 opacity, but only if it's not the currently displayed
 			 	if(!$(this).hasClass("current-block")){
 			 		$(this).find("img").stop().fadeTo(250, 0.5);
 			 	}
 		 	});

 		 	break;

 		 	//Add other hover animations here

 	}
}
//End hover effects

//Add events for when a block is clicked
$("#" + pluginContainer +" .massy-block").click(function() {
	//alert( "Handler for .click() called." );
	
	//Loop through all elements and remove class "current-block" from all blocks that has it
	//Also make sure these images fade away
	$('.massy-block').each(function(i, obj) {
	 		if($(this).hasClass("current-block")){
	 			$(this).find("img").stop().fadeTo(250, 0.5);
	 			$(this).removeClass("current-block");

	 			//Set the progress-bar to 0 again since this block is no longer active
	 			$(this).find(".massy-progress-bar").stop().width(0, 0);

	 		}
	});

	$(this).addClass("current-block");

	//Make this block the one that is fully lit
		$(this).find("img").stop().fadeTo(250, 1);

		//Animate the currently displayed blocks progress bar
	 	 $(this).find('.massy-progress-bar').animate({
		 	 width: "+=" + config.blockSizeX,
		 	 }, config.switchTime, function(){
				//Animation complete, code to switch block goes here.
				switchBlock();
			});

		//Then change the content to this block
			//Code for that goes here
});


//Function to switch block, should be called whenever the plugin automatically switches block by time
function switchBlock(){
  //alert("Switch block naow");
  //Look for the current block...

  currentBlockFound = false;
  done = false;
  currentBlock = 1;
  $('.massy-block').each(function(i, obj) {

  	if(currentBlockFound && !done){
  		$(this).find("img").stop().fadeTo(250, 1);
  		$(this).addClass("current-block");

  		 	 $(this).find('.massy-progress-bar').animate({
  			 	 width: "+=" + config.blockSizeX,
  			 	 }, config.switchTime, function(){
  					//Animation complete, code to switch block goes here.
  					switchBlock();
  				});

  		done = true;
  	}	

   		if($(this).hasClass("current-block") && !done){
   			currentBlockFound = true;
   			$(this).find("img").stop().fadeTo(250, 0.5);
   			$(this).removeClass("current-block");
   			$(this).find(".massy-progress-bar").stop().width(0, 0);

   			//Is this the last block? Then restart the cycle
   			if($(this).hasClass( "newsbricks-last"))
   				restartBlockCycle();
   			//alert("Current block found, stop it from being current, saving next as current");
   		}
  });

}

function restartBlockCycle(){
	//Add current-block to first block
	$('.massy-block').first().addClass("current-block");
	$('.massy-block').first().find("img").stop().fadeTo(250, 1);
	$('.massy-block').first().find('.massy-progress-bar').animate({
		 	 width: "+=" + config.blockSizeX,
		 	 }, config.switchTime, function(){
				//Animation complete, code to switch block goes here.
				switchBlock();
			});
}


//DEBUG
//Print the variable out in the text field.
 	//$("#massy-content").html(something);
 	//alert(config.color);
 	//alert(noOfBlocks);



 //END DEBUG


 };

