/************************************************************/
/*** This file contains all controllers for the UI layers ***/
/*** Logo, Panel and keyboard elements, NOT touch on tree ***/
/************************************************************/

/* global vars */

// for button control
var button_next_action;
var button_next_var;

var button_next_action_2;
var button_next_var_2;

// for status of the control canvas
var control_canvas_status = 2; // default is 2
// 0 = nothing showing (won't use this, but include for completeness)
// 1 = Press here to start (Introductory tour)
// 2 = Evolutinary path - showing the breadcrumbs and default options
// 3 = Search the tree (typed)
// 4 = Popular species
// 5 = growth animation options open
// 6 = More options open

var control_canvas_status_search = 1; // default is 1
// 1 = keyboard - search stage 1
// 2 = search results - search stage 2

var search_sound_player = false;
// true if we want to see the soundplayer over the search page

// also has two further statuses - sound player and screensaver, these are not selected by buttons at the top though - todo

// the lists of buttons with up and down arrows need to have an index
// to show the first place in the array to be displayed on screen
var path_button_index = -1;
var search_button_index = 0;
var pop_button_index = 0;

// the search string that gets set by the keyboard on screen and then used by the rest of the code
var searchstring = "";
// are we resticting our search to searches with images or sounds
var search_sounds = false;
var search_images = false;

var first_leap = false;// this variable will store

// auomatically set button dimension parameters
// leave space for margin and right hand line
var button_width = control_width-control_line_width-control_margin*1.5;
// fit 5 alpha buttons into space of one ordinary button
var alpha_button_width = (button_width - alpha_button_gap*4)/5;

/* local settings used within this file only */

var path_button_num_limit = 12;
// tells us how many buttons can be fitted into the evolutionary path view
/*PL_edit
var pop_button_num_limit = 8; */
var pop_button_num_limit = 3;
// tells us how many buttons can be fitted into the popular species view



// up to here






var KBchange = true; // true if the KB has changed since last press of search




// Are search results showing
var search_showing = false;

// Is the keyboard showing
var keyboard_showing = false;

var myHeader; // the header canvas

var Hcontext; // the keyboard context

// mouse moving information
var HmouseX = null;
var HmouseY = null;
var Hmouse_clicking = false;
var Hmouse_clicking_done = true;

// main control panel dimensions


function control_sound_play()
{
    if (thisSound.currentTime >= thisSound.duration)
    {
        thisSound.pause();
        thisSound.currentTime = 0;
        thisSound.play();
    }
    else
    {
        thisSound.play();
    }
    drawControl();

}

function control_sound_pause()
{
    thisSound.pause();
    drawControl();

}

function control_sound_end()
{
    thisSound.pause();
    thisSound.currentTime = 0;
    thisSound.play();
    drawControl();

   // <thisSound.duration
}

function control_sound_exit()
{
    nowplaying = null;
    justplayednew = false;
    search_sound_player = false;
    soundqueue = null;
    queuestop = null;
    //last_played = null;
    if (thisSound.duration)
    {
        thisSound.currentTime = thisSound.duration;
    }
    drawControl();

}

function control_sound_open()
{
    search_sound_player = true;
    drawControl();
}

function tree_switch()
{
    if (switch_to == "altpics")
    {
        //console.log("pic change");
        if ((alt_pics_on) && (alt_pics_on == 1))
        {
            //console.log("pic change main");
            alt_pics_on = 0;
             data_pic_col = data_pic_col_main;
             data_path_pics = data_path_pics_main;
             data_path_thumbs = data_path_thumbs_main;
             data_pic_ext = data_pic_ext_main;
             data_pic_thumb_ext = data_pic_thumb_ext_main;
        }
        else
        {
            //console.log("pic alt");
             alt_pics_on = 1;
            data_pic_col = data_pic_col_alt;
              data_path_pics = data_path_pics_alt;
              data_path_thumbs = data_path_thumbs_alt;
              data_pic_ext = data_pic_ext_alt;
              data_pic_thumb_ext = data_pic_thumb_ext_alt;
            
        }
        makepic_vect2();
        Resize();
    }
    else
    {
        if (URL_parsed&&(URL_parsed != ""))
        {
            window.location.href = ("./"+URL_parsed);
        }
        else
        {
            window.location.href = ("./"+switch_to);
        }
    }
}

function init_Header()
{
    var logofoot =  document.getElementById("Logo");
    logofoot.height = 50;
    logofoot.width = 182;
    var logocontext = Logo.getContext('2d');
    var tempImage = new Image();
    tempImage.src = ("Graphics/OZ_logo5.png");
    tempImage.onload = function()
    {
        logocontext.clearRect(0,0,logofoot.width,logofoot.height);
        logocontext.fillStyle = logobackgroundcolor;
        draw_src(0,0,logofoot.width,logofoot.height,15,logocontext);
        logocontext.fill();
        logocontext.drawImage(tempImage, 20,3,142,45);
    }
    logofoot.onmousedown = AboutOZ;
    
    Hcontext= HeadCanvas.getContext('2d'); // sort out the canvas element
    myHeader = document.getElementById("HeadCanvas");
    
    myHeader.width = control_width;
    myHeader.height = 1080;
    
    myHeader.onmousedown = Hclick_on;
    myHeader.onmouseup = Hclick_off;
    myHeader.onmousemove = Hmovemouse;
    myHeader.onmouseout = Hmouse_out;
    
    myHeader.addEventListener ("touchstart", Htouchstart, false);
    myHeader.addEventListener ("touchmove", Htouchmove, false);
    myHeader.addEventListener ("touchend", Htouchend, false);
    
    var currenty = button_gap;
    
}

function Hmouse_out()
{
    Hmouse_clicking = false;
    Hmouse_clicking_done = false;
    HmouseX = null;
    HmouseY = null;
    drawControl();
}

function Htouchstart(event)
{
		first_touch = true;
	mouse_disable = true;
	event.preventDefault();
	clear_screensaver();
	  in_about = false;
    
	if(event.targetTouches.length == 1)
	{
        Hmouse_clicking = true;
        Hmouse_clicking_done = false;
        var touch = event.targetTouches[0];
        HmouseX = touch.pageX/myHeader.clientWidth*myHeader.width-myHeader.offsetLeft;
        HmouseY = touch.pageY/myHeader.clientHeight*myHeader.height-myHeader.offsetTop;
 	}
	else
	{
	HmouseX = null;
	 HmouseY = null;
	}
	 drawControl();
}

function Htouchend(event)
{
		first_touch = true;
  	mouse_disable = true;
	event.preventDefault();
	clear_screensaver();

	 if(event.targetTouches.length == 0)
	{

	HmouseX = null;
	 HmouseY = null;
	 if (button_next_action_2)
        {
        	button_next_var = button_next_var_2;
        	button_next_action = button_next_action_2;
            // then perform that action inside a timeout
            setTimeout(button_next_action+"()",1);
        }
        }
        else
	{
		 if(event.targetTouches.length == 1)
	{
	  Hmouse_clicking = true;
        Hmouse_clicking_done = false;
        var touch = event.targetTouches[0];
        HmouseX = touch.pageX/myHeader.clientWidth*myHeader.width-myHeader.offsetLeft;
        HmouseY = touch.pageY/myHeader.clientHeight*myHeader.height-myHeader.offsetTop;
	}
	}
        	Hmouse_clicking = false;
	Hmouse_clicking_done = false;
	drawControl();
}

function Htouchmove(event)
{
		first_touch = true;
   	mouse_disable = true;
	event.preventDefault();
	clear_screensaver();
    
	if(event.targetTouches.length == 1)
	{
        Hmouse_clicking = true;
        var touch = event.targetTouches[0];
        HmouseX = touch.pageX/myHeader.clientWidth*myHeader.width-myHeader.offsetLeft;
        HmouseY = touch.pageY/myHeader.clientHeight*myHeader.height-myHeader.offsetTop;
	}
	else
	{
		HmouseX = null;
	 HmouseY = null;
	}
	 drawControl();
}

function Hclick_on(event)
{
    if (!mouse_disable)
    {
    	      in_about = false;
        clear_screensaver();
        HmouseY = event.clientY/myHeader.clientHeight*myHeader.height-myHeader.offsetTop;
        HmouseX = event.clientX/myHeader.clientWidth*myHeader.width-myHeader.offsetLeft;
        Hmouse_clicking = true;
        Hmouse_clicking_done = false;
         drawControl();
    }
    
}

function Hclick_off()
{
	if (!mouse_disable)
    {
        HmouseY = event.clientY/myHeader.clientHeight*myHeader.height-myHeader.offsetTop;
        HmouseX = event.clientX/myHeader.clientWidth*myHeader.width-myHeader.offsetLeft;
        Hmouse_clicking = false;
        Hmouse_clicking_done = false;
        // if an action has been queued because the mouse was over a button when it was released
        
         if (button_next_action_2)
        {
        	button_next_var = button_next_var_2;
        	button_next_action = button_next_action_2;
            // then perform that action inside a timeout

            setTimeout(button_next_action+"()",1);
        }
        // redraw the header
        drawControl();
    }
    
}

var flight_target_EP;

function flight_EP()
{
    perform_flight_animation(flight_target_EP,EP_anim_length_in);
}

function Hmovemouse(event)
{
	if (!mouse_disable)
    {
        HmouseY = event.clientY/myHeader.clientHeight*myHeader.height-myHeader.offsetTop;
        HmouseX = event.clientX/myHeader.clientWidth*myHeader.width-myHeader.offsetLeft;
        drawControl();
    }
}

var flight_target_pop;

function flight_pop()
{
    viewReset();
    //perform_flight_animation(button_next_var,pop_anim_length_in);
    setTimeout(flight_pop2(),1);
}

function flight_pop2()
{
    //viewReset();
    perform_flight_animation(button_next_var,pop_anim_length_in);
}

function randompop()
{
    viewReset();
    //perform_flight_animation(popular_species_code[  Math.floor(Math.random()*(popular_species_list.length))+1 ],pop_anim_length_in);
   setTimeout(randompop2(),1);
    
}

function randompop2()
{
    //viewReset();
    perform_flight_animation(popular_species_code[  Math.floor(Math.random()*(popular_species_list.length))+1 ],pop_anim_length_in);
    
}


/* a suite of routines for drawing different information on the feedback panel */


// this function draws "Touch The Screen" on the feedback panel
function drawControl_SS(ypos_in)
{
    // draw the rectangle outline to stand out
    Hcontext.fillStyle = 'rgb(255,255,255)';
    //Hcontext.lineWidth = 12;
    Hcontext.fillRect(control_margin,ypos_in-320+326,button_width,65*4+33);
    
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = 'bold ' + (40.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'center';
    // draw the main text
    Hcontext.fillText  ("Touch the" , control_margin+(control_width-control_margin-2)/2, ypos_in-335+390);
    Hcontext.fillText  ("Screen to" , control_margin+(control_width-control_margin-2)/2, ypos_in-335+455);
    Hcontext.fillText  ("Explore the" , control_margin+(control_width-control_margin-2)/2, ypos_in+520-335);
    Hcontext.fillText  ("Tree of Life" , control_margin+(control_width-control_margin-2)/2, ypos_in+585-335);
    
    
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'left';
    
    skipper = 22
    
    
    header_ypos = myHeader.height-450;
    
    
    temp_txt = [" ",
                "Each leaf respresents a species.",
                "Branches show evolutionary",
                "links between these species,",
                "connecting them to common",
                "ancestors. The colours",
                "show extinction risk.",
                " ",
                "Pinch two fingers together",
                "or apart on the screen to",
                "zoom in and out and explore",
                "the tree like you would a map.",
                "You can also tap areas of",
                "the screen to zoom in there.",
                " ",
                "For more information press",
                "the 'Introduction' button.",
                "Or just start exploring",
                "and experiment with the",
                "other buttons above."];
    
    
    for (var iii = 0 ; iii < temp_txt.length ; iii ++)
    {
        //Hcontext.fillText  (temp_txt[iii] , control_margin+(control_width-control_margin-2)/2, header_ypos+skipper*iii);
        Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
    }
    
    
    
    
}

// sound player drawing on the feedback panel
function drawControl_sound(ypos_in)
{
     draw_text(control_margin,ypos_in,button_width,button_height,3,"Sound player",0,button_height*0.6,button_height*0.6,button_text_col,'bold',Hcontext);
    
    ypos_in += 30;
    
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'center';
   
    if (commonlabels&&metadata.leaf_meta[nowplaying][mc_key_l["common"]])
    {
        var vowels = ["a","e","i","o","u"];
        var use_an = false;
        for (var v = 0 ; v < vowels.length ; v++)
        {
            if ((metadata.leaf_meta[nowplaying][mc_key_l["common"]])[0].toLowerCase() == vowels[v])
            {
                use_an = true;
            }
        }
        
        if (use_an)
        {
            autotext2_context(false,false,"Now playing a recording of an" ,control_margin+(control_width-control_margin-2)/2,ypos_in-320+370,230,20.0,Hcontext,0);
            //autotext2_context(false,false,"Now playing a recording of an" ,135,ypos_in-320+370,230,30.0,Hcontext,0);
        }
        else
        {
             autotext2_context(false,false,"Now playing a recording of a" ,control_margin+(control_width-control_margin-2)/2,ypos_in-320+370,230,20.0,Hcontext,0);
        }
        
        Hcontext.fillStyle = 'rgb(0,0,0)';
        if((metadata.leaf_meta[nowplaying][mc_key_l["common"]]).length <= 12)
        {
            autotext_context(false,false,metadata.leaf_meta[nowplaying][mc_key_l["common"]],control_margin+(control_width-control_margin-2)/2,ypos_in-320+460,230,30.0,Hcontext,0);
        }
        else
        {
            autotext2_context(false,false,metadata.leaf_meta[nowplaying][mc_key_l["common"]],control_margin+(control_width-control_margin-2)/2,ypos_in-320+460,230,30.0,Hcontext,0);
        }
    }
    else
    {
        autotext2_context(false,false,"Now playing a recording of ..." ,control_margin+(control_width-control_margin-2)/2,ypos_in-320+370,230,20.0,Hcontext,0);
        
        Hcontext.fillStyle = 'rgb(0,0,0)';
        autotext2_context(false,false,meta2latin(nowplaying),control_margin+(control_width-control_margin-2)/2,ypos_in-320+460,230,30.0,Hcontext,0);
    }
    drawclock(120,ypos_in-320+565,30,thisSound.currentTime/thisSound.duration,'rgb(0,0,0)',Hcontext);
    if (thisSound.currentTime*2>thisSound.duration)
    {
        justplayednew = false;
    }
    
    drawspeaker(200,ypos_in-320+565,30,true,Hcontext,'rgb(0,0,0)');
 
    header_ypos = ypos_in + 350
    
    control_button("Pause",header_ypos,"control_sound_pause",null,!(thisSound.paused));
    draw_pause_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    control_button("Play",header_ypos,"control_sound_play",null,(thisSound.paused)||(thisSound.currentTime >= thisSound.duration));
    draw_play_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    control_button("Restart",header_ypos,"control_sound_end",null,thisSound.currentTime > 0);
    header_ypos += (button_gap+button_height);
    
    control_button("Stop and exit",header_ypos,"control_sound_exit",null,true);
    draw_stop_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    
}


/* control panel buttons and drawing */

// makes it simple to add another standard button to the control bar using the inbuilt drawing routines
function control_button(textin,ypos_in,actif,varif,active)
{
    if (draw_button(control_margin,ypos_in,button_width,button_height,Hcontext,control_button_style,button_corner,"src",active,HmouseX,HmouseY,Hmouse_clicking))
    {
        if (actif)
        {
            button_next_action_2 = actif;
        }
        if (varif)
        {
            button_next_var_2 = varif;
        }
    }
    draw_text(control_margin,ypos_in,button_width,button_height,3,textin,0,button_height*0.55,button_height*0.55,button_text_col,'',Hcontext);
}

// makes it simple to add another alphabet button to the control bar using the inbuilt drawing routines
function alpha_button(textin,xpos_in,ypos_in,widthin,actif,varif,active)
{
    if (draw_button(xpos_in,ypos_in,widthin,alpha_button_height,Hcontext,control_button_style,alpha_button_corner,"src",active,HmouseX,HmouseY,Hmouse_clicking))
    {
        if (actif)
        {
            button_next_action_2 = actif;
        }
        if (varif)
        {
            button_next_var_2 = varif;
        }
    }
    draw_text(xpos_in,ypos_in,widthin,alpha_button_height,3,textin,0,button_height*0.55,button_height*0.55,button_text_col,'',Hcontext);
}

// this is called from this file and from elsewhere - it redraws the control panel on the left
// this includes updating the button_next_action and button_next_var  tags if the focus in in the correct place
function  drawControl()
{
    if (!nowloading)
    {
        // only draw the control panel if the main page is loaded
        
        
        Hcontext.strokeStyle = control_line_col;
        Hcontext.lineWidth = 1
        
     
        // draw the control panel background
        Hcontext.clearRect(0,0,myHeader.width,myHeader.height);
        Hcontext.fillStyle = control_col;
        Hcontext.fillRect(0,0,myHeader.width,myHeader.height);
        
        Hcontext.fillStyle = control_col2;
        //Hcontext.fillRect(control_margin/2,control_margin,myHeader.width-control_margin-1,button_gap*7+button_height*6);
        Hcontext.strokeRect(control_margin/2,control_margin/2,myHeader.width-control_margin/2-1,button_gap*7+button_height*6);

        
        Hcontext.fillStyle = control_col2;
        //Hcontext.fillRect(control_margin/2,control_margin+button_gap*8+button_height*6,myHeader.width-control_margin-1,myHeader.height-control_margin*2-button_gap*8-button_height*6);
        Hcontext.strokeRect(control_margin/2,control_margin/2+button_gap*8+button_height*6,myHeader.width-control_margin/2-1,myHeader.height-control_margin-button_gap*8-button_height*6);

        
        /*
        Hcontext.beginPath();
        Hcontext.moveTo(myHeader.width-control_line_width/2,0)
        Hcontext.lineTo(myHeader.width-control_line_width/2, myHeader.height);
        Hcontext.closePath();
        Hcontext.strokeStyle = control_line_col;
        Hcontext.lineWidth = control_line_width;
        Hcontext.stroke();
        
        */
        
        
        // set up a parameter that describes how far down the y axis we are
        var header_ypos = button_gap*2;
        var selected_title;
        
        /* PL_edit
        Hlayout = [,"Introduction","Evolutionary path","Search the tree","Popular species","Growth animation","View and colour key"]; */
        Hlayout = [,"Introduction","Evolutionary path","Search the tree","Popular species","Growth animation","View and colour key"];
        
        // reset the global parameters that determine if button actions need to be taken
        button_next_action_2 = null;
         button_next_var_2 = null;

        
        // draw the buttons at the top of the control panel
        for (var i = 1 ; i < Hlayout.length ; i ++)
        {
            if ((control_canvas_status==i)&&(!(screensaver_on ||in_about))&&(!(((thisSound.currentTime)&&(thisSound.currentTime<thisSound.duration))||(justplayednew&&nowplaying))))
            {
                // we are drawing the button that's already been selected
                draw_button(control_margin,header_ypos,button_width,button_height,Hcontext,control_button_style,button_corner,"src",false,HmouseX,HmouseY,Hmouse_clicking);
                draw_text(control_margin,header_ypos,button_width,button_height,3,Hlayout[i],0,button_height*0.6,button_height*0.6,disabled_button_text_col,'bold',Hcontext);
                selected_title = i;
            }
            else
            {
                // we are drawing an unselected button
                if (draw_button(control_margin,header_ypos,button_width,button_height,Hcontext,control_button_style,button_corner,"src",true,HmouseX,HmouseY,Hmouse_clicking))
                {
                    button_next_action_2 = "Set_control_canvas_status";
                    button_next_var_2 = i;
                }
                draw_text(control_margin,header_ypos,button_width,button_height,3,Hlayout[i],0,button_height*0.6,button_height*0.6,button_text_col,'bold',Hcontext);
            }
            
            header_ypos += (button_gap+button_height);
        }
      
        header_ypos += button_height/2;

        /*
        Hcontext.beginPath();
        Hcontext.moveTo(button_width+control_margin*2, header_ypos)
        Hcontext.lineTo(03, header_ypos);
        Hcontext.closePath();
        Hcontext.strokeStyle = control_line_col;
        Hcontext.lineWidth = control_line_width;
        Hcontext.stroke();
        //*/
        //header_ypos += button_height/2;


        
     
        //control_canvas_status = 2;
        // now we're drawing the different menus in the contol panel
        // this depends on the control_canvas_status
        if (screensaver_on ||in_about)
        {
            drawControl_SS(header_ypos);
        }
        else if ((((thisSound.currentTime)&&(thisSound.currentTime<thisSound.duration))||(justplayednew&&nowplaying))&&(search_sound_player||(!((control_canvas_status == 3)&&(control_canvas_status_search == 2)))))
        {
            drawControl_sound(header_ypos); // todo
        }
        else
        {
            draw_text(control_margin,header_ypos,button_width,button_height,3,Hlayout[control_canvas_status],0,button_height*0.6,button_height*0.6,button_text_col,'bold',Hcontext);
            
            header_ypos += (button_gap+button_height);
            
            if (control_canvas_status == 1)
            {
                drawControl_intro(header_ypos);
            }
            else if (control_canvas_status == 2)
            {
                drawControl_path(header_ypos);
            }
            else if (control_canvas_status == 3)
            {
                if (control_canvas_status_search == 2)
                {
                    drawControl_search2(header_ypos);
                }
                else
                {
                    drawControl_search(header_ypos);
                }
            }
            else if (control_canvas_status == 4)
            {
                drawControl_pop(header_ypos);
            }
            else if (control_canvas_status == 5)
            {
                drawControl_grow(header_ypos);
            }
            else if (control_canvas_status == 6)
            {
                drawControl_more(header_ypos);
            }
        }
    }
}

// draw the control panel that accompanies the introductory tour
function drawControl_intro(header_ypos)
{
    // now draw the feedback panel with an appropriate sized gap
    header_ypos += (button_gap);
    
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'left';
    
    temp_txt = ["Each leaf respresents a species.",
                "Branches show evolutionary",
                "links connecting species,",
                "to common ancestors",
                " ",
                "Pinch two fingers together",
                "or apart on the screen to",
                "zoom in and out and explore",
                "the tree like you would a map.",
                "You can also tap areas of",
                "the screen to zoom in there.",
                "Zoom into any area that",
                "looks interesting to you",
                "and more details will appear.",
                " ",
                "Try the 'evolutionary path'",
                "to show where you are and",
                "help you to navigate the tree.",
                "You can also search for your",
                "favourite species, fly though",
                "the tree to popular species",
                "and watch an animation of",
                "the tree growing. You can see",
                "what the colours mean and",
                "switch between different shapes",
                "with the 'view and colour key'"
                ];
    
    
     skipper = 22
    
    for (var iii = 0 ; iii < temp_txt.length ; iii ++)
    {
        //Hcontext.fillText  (temp_txt[iii] , control_margin+(control_width-control_margin-2)/2, header_ypos+skipper*iii);
        Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
    }
    header_ypos +=  skipper*(temp_txt.length)  +15;

    control_button("Reset tree view",header_ypos,"viewReset",null,true);
    header_ypos += (button_gap+button_height);
    
    control_button("Production credits",header_ypos,"AboutOZ",null,true);


    
}

// draw the evolutionary path control panel page
function drawControl_path(header_ypos)
{
    // draw the feedback panel with an appropriate sized gap
    header_ypos += (button_gap);
   
    // reset button
    control_button("Reset tree view",header_ypos,"viewReset_ns",null,true);
    header_ypos += (button_gap+button_height);

    if (commonlabels)
    {
        control_button("Use Latin names",header_ypos,"name_change",null,true);
    }
    else
    {
        control_button("Use common names",header_ypos,"name_change",null,true);
    }
    header_ypos += (button_gap+button_height);
    
    // work out where in the tree we are
    var lastlocationtxt = locationtxt;
    var lastlocationvect = locationvect;
    var lastlocationvect_index = locationvect_index;
    locationtxt = "";
    locationvect = [];
    locationvect_index = [];
    fulltree.mylocation(); // this must not have been called elsewhere otherwise we can't detect changes here
    
    if (locationtxt == "")
    {
        locationtxt = lastlocationtxt;
        locationvect = lastlocationvect;
        locationvect_index = lastlocationvect_index;
    }
    if ( locationtxt != lastlocationtxt)
    {
        // the view has changed so reset the scrolling buttons to show the new position
        path_button_index = -1;
    }
    
    // draw the cheverons to indicate position
    if (locationvect.length >= 1)
    {
     
      
      
        
        
        // first set the parameters for the path and overflow
        var path_button_num; // number of cheverons to draw
        var draw_overflow_down; // if we need a down arrow on the end
        // path_button_index is global and stores the index of the first push button to draw
        // it can be set to -1 when we wish to force a reset of the list.
        
        
       // locationvect = locationvect.concat(["1","2","3","4","5"]);
       // for testing the overflow
        
        if (locationvect.length > path_button_num_limit)
        {
            // we don't have space for everything
            if (path_button_index == -1)
            {
                //the button index has been erased and needs to be reset
                path_button_index = locationvect.length-path_button_num_limit+1;
            }
            
            path_button_num = path_button_num_limit -1;
            draw_overflow_down = true;
            
            // draw up arrow button
            if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"src_u",(path_button_index > 0),HmouseX,HmouseY,Hmouse_clicking))
            {
                button_next_action_2 = "Path_scroll_up";
            }
            Hcontext.fillStyle = button_text_col;
            Hcontext.textAlign = 'center';
            Hcontext.textBaseline = 'middle';
            Hcontext.fillText  ("Back" , 10+button_width/2, header_ypos+button_height/2);
            header_ypos += (button_gap*2+button_height);
        }
        else
        {
            // we've got space for all the buttons, so start from zero and include all
            path_button_index = 0;
            path_button_num = locationvect.length;
            draw_overflow_down = false;
            
            // this adjustment gets everything to stay lined up with an up overflow button appears.
            header_ypos += button_gap*2-alpha_button_gap;
        }
        
        // this is where we draw the cheverons
        for (var iii = path_button_index ; iii < (path_button_index+path_button_num) ; iii ++)
        {
            if (iii == 0)
            {
                // drawing top
                if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"chev_t",true,HmouseX,HmouseY,Hmouse_clicking))
                {
                    button_next_action_2 = "flight_EP";
                    
                    flight_target_EP = locationvect_index[path_button_index];
                    //perform_flight_animation(locationvect_index[path_button_index]);
                }
                draw_text(control_margin,header_ypos,button_width,button_height+button_gap,8,locationvect[path_button_index],0,0,button_height*0.55,button_text_col,'',Hcontext);
                header_ypos += (alpha_button_gap+button_height);
            }
            else if (iii == (locationvect.length - 1))
            {
                // drowing bottom
                if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"chev_b",true,HmouseX,HmouseY,Hmouse_clicking))
                {
                    button_next_action_2 = "flight_EP";
                    
                    flight_target_EP = locationvect_index[path_button_index+path_button_num-1];
                    
                    //perform_flight_animation(locationvect_index[path_button_index+path_button_num-1])
                }
                draw_text(control_margin,header_ypos,button_width,button_height+button_gap,8,locationvect[path_button_index+path_button_num-1],0,0,button_height*0.55,button_text_col,'',Hcontext);
                header_ypos += (alpha_button_gap+button_height);
            }
            else
            {
                // drawing middle
                if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"chev",true,HmouseX,HmouseY,Hmouse_clicking))
                {
                    button_next_action_2 = "flight_EP";
                    
                    flight_target_EP = locationvect_index[iii];
                    
                    //perform_flight_animation(locationvect_index[iii]);
                }
                draw_text(control_margin,header_ypos,button_width,button_height+button_gap,8,locationvect[iii],0,0,button_height*0.55,button_text_col,'',Hcontext);
                header_ypos += (alpha_button_gap+button_height);
            }
        }
        
        // this is where we draw the down arrow if needed
        if (draw_overflow_down && (path_button_index < (locationvect.length-path_button_num_limit+1)))
        {
            
            header_ypos += button_gap*2-alpha_button_gap;
            if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"src_d",(path_button_index < (locationvect.length-path_button_num_limit+1)),HmouseX,HmouseY,Hmouse_clicking))
            {
                button_next_action_2 = "Path_scroll_down";
            }
            
            Hcontext.fillStyle = button_text_col;
            Hcontext.textAlign = 'center';
            Hcontext.textBaseline = 'middle';
            Hcontext.fillText  ("Next" , 10+button_width/2, header_ypos+button_height/2);
        }
        
        header_ypos += (button_gap*3);
        
        Hcontext.fillStyle = 'rgb(0,0,0)';
        Hcontext.font = (18.0).toString() + 'px '+fonttype;
        Hcontext.textAlign = 'left';
        
         skipper = 22
        
        if (locationvect.length <= 6)
        {
            
            header_ypos = myHeader.height-300;
            
            
            temp_txt = [" ",
                        "The location of this current view",
                        "within the tree of life is given",
                        "by the list of named groups",
                        "above. The groups are in order",
                        "of size with the largest at the",
                        "top. You can touch any group to",
                        "zoom out and see it completely."];
           
            
            for (var iii = 0 ; iii < temp_txt.length ; iii ++)
            {
                Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
            }
            
            header_ypos += skipper*temp_txt.length;
            
        }
        if (commonlabels)
        {
             header_ypos = myHeader.height-125;
            
            if (locationvect.length <= 11)
            {
                temp_txt = [" ",
                            "The groups are labeled using",
                            "common language. You can",
                            "change this by pressing the",
                            "'Use Latin names' button."," "];
                
                for (var iii = 0 ; iii < temp_txt.length ; iii ++)
                {
                    Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
                }
                
                header_ypos += skipper*temp_txt.length;
            }
            
        }
        else
        {
             header_ypos = myHeader.height-125;
            
            if (locationvect.length <= 11)
            {
                temp_txt = [" ",
                            "The groups are labeled using",
                            "scientific (Latin) names. You",
                            "can change this by pressing the",
                            "'Use common names' button."," "];
                
                
                for (var iii = 0 ; iii < temp_txt.length ; iii ++)
                {
                    Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
                }
                
                header_ypos += skipper*temp_txt.length;
            }
            
        }

        
    
    }
    else
    {
        Hcontext.fillStyle = 'rgb(0,0,0)';
        Hcontext.font = (18.0).toString() + 'px '+fonttype;
        Hcontext.textAlign = 'left';
        
        temp_txt = [" ",
                    "The location of this current view",
                    "within the tree of life is given",
                    "by the list of named groups",
                    "below. The groups are in order",
                    "of size with the largest at the",
                    "top. You can touch any group to",
                    "zoom out and see it completely."];
        skipper = 22
        
        for (var iii = 0 ; iii < temp_txt.length ; iii ++)
        {
            Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
        }
        
        header_ypos += skipper*temp_txt.length;
        header_ypos += button_gap*2-alpha_button_gap;
        
        control_button(locationvect[0],header_ypos,"viewReset_ns",null,true);
        
        /*
        
        header_ypos += button_gap*2 + button_height;
        
        Hcontext.fillStyle = 'rgb(0,0,0)';
        Hcontext.font = (18.0).toString() + 'px '+fonttype;
        Hcontext.textAlign = 'left';
        
        temp_txt = [" ",
                    "All species are catergorised in",
                    "groups of different sizes known",
                    "as 'taxa'. For example Humans",
                    "are in the Primates group and",
                    "the larger Mammals group."];
                    //"Think of the groups as being",
                    //"like a coordinate system for the",
                    //"tree of life."];
        skipper = 22
        
        for (var iii = 0 ; iii < temp_txt.length ; iii ++)
        {
            Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
        }

         */
         
        Hcontext.fillStyle = 'rgb(0,0,0)';
        Hcontext.font = (18.0).toString() + 'px '+fonttype;
        Hcontext.textAlign = 'left';
        
        header_ypos = myHeader.height-180;
        
        if (commonlabels)
        {
          //  if (locationvect.length <= 6)
         //   {
                temp_txt = [" ",
                            "The groups are labeled using",
                            "common language. Press the",
                            "button below to use scientific",
                            "(Latin) names instead."," "];
                
                for (var iii = 0 ; iii < temp_txt.length ; iii ++)
                {
                    Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
                }
                
                header_ypos += skipper*temp_txt.length;
           // }
            
            
            control_button("Use Latin names",myHeader.height-button_height-2.5*button_gap,"name_change",null,true);
        }
        else
        {
            //if (locationvect.length <= 6)
            //{
                temp_txt = [" ",
                            "The groups are labeled using",
                            "scientifc (Latin) names. Press",
                            "the button below to use common",
                            "language names instead."," "];
                
                
                for (var iii = 0 ; iii < temp_txt.length ; iii ++)
                {
                    Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
                }
                
                header_ypos += skipper*temp_txt.length;
            }
            
            
            control_button("Use common names",myHeader.height-button_height-2.5* button_gap,"name_change",null,true);
       // }
        
        

        
    }
}

function marksearchUI()
{
    control_canvas_status_search = 2;
    marksearch();
    first_leap = true;
    if (fulltree.searchin > 0)
    {

        UIcyclesearch();
    }
}

function UIcyclesearch()
{
    cyclesearch();
    first_leap = false;
}
function drawControl_search2(header_ypos)
{
    // now draw the feedback panel with an appropriate sized gap
    
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (24.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'center';
    // draw title
    
    // draw_text(control_margin,header_ypos,button_width,button_height,3,"asdf"/*searchstring*/,0,button_height*1,button_height*1,button_text_col,null,Hcontext);
    
    
    
    
    if (searchstring == "")
    {
          draw_text(control_margin,header_ypos,button_width,button_height,3,"Your search for any",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
        
        header_ypos += 25
        
        
        if (search_sounds || search_images)
        {
            if (search_sounds && search_images)
            {
                draw_text(control_margin,header_ypos,button_width,button_height,3,"species with both",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                header_ypos += 25
                draw_text(control_margin,header_ypos,button_width,button_height,3,"images and sounds",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            }
            else
            {
                if (search_images)
                {
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"species with images",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    header_ypos += 25
                }
                else
                {
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"species with sounds",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    header_ypos += 25
                }
            }
        }
        
    }
    else
    {
          draw_text(control_margin,header_ypos,button_width,button_height,3,"Your search for",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
        
        header_ypos += 25
        
        
        if (commonlabels == true)
        {

        
        if (search_sounds || search_images)
        {
            if (search_sounds && search_images)
            {
                draw_text(control_margin,header_ypos,button_width,button_height,3,"species with images,",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                header_ypos += 25
                draw_text(control_margin,header_ypos,button_width,button_height,3,"sounds and common name",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            }
            else
            {
                if (search_images)
                {
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"species with images",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    header_ypos += 25
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"and common name",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                }
                else
                {
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"species with sounds",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    header_ypos += 25
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"and common name",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                }
            }
        }
        else
        {
            draw_text(control_margin,header_ypos,button_width,button_height,3,"species with common name",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            header_ypos += 25
        }
        }
        else
        {
            
            if (search_sounds || search_images)
            {
                if (search_sounds && search_images)
                {
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"species with both images",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    header_ypos += 25
                    draw_text(control_margin,header_ypos,button_width,button_height,3,"and sounds matching",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                }
                else
                {
                    if (search_images)
                    {
                        draw_text(control_margin,header_ypos,button_width,button_height,3,"species with images",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                        header_ypos += 25
                        draw_text(control_margin,header_ypos,button_width,button_height,3,"matching",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    }
                    else
                    {
                        draw_text(control_margin,header_ypos,button_width,button_height,3,"species with sounds",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                        header_ypos += 25
                        draw_text(control_margin,header_ypos,button_width,button_height,3,"matching",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                    }
                }
            }
            else
            {
                draw_text(control_margin,header_ypos,button_width,button_height,3,"species matching",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
                header_ypos += 25
            }
        }
        
    }
    
    header_ypos += (30+button_height);
    
    if (searchstring!="")
    {
        var splitstr = searchstring.split(" ");
        if (splitstr.length == 1)
        {
            autotext2_context(false,false,'"'+searchstring+'"' ,control_margin+(control_width-control_margin)/2,header_ypos+30,230,22.0,Hcontext,0);
        }
        else
        {
            autotext2_context(false,false,'"'+searchstring+'"' ,control_margin+(control_width-control_margin)/2,header_ypos+30,230,30.0,Hcontext,0);
        }
    }
    header_ypos += (50+button_height);
    
    
    
    if (fulltree.searchin > 1)
    {
        
        draw_text(control_margin,header_ypos,button_width,button_height,3,"returned " + fulltree.searchin.toString() + " hits.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
        
        header_ypos += 50;
        
        if (first_leap)
        {
            control_button("Go to first hit",header_ypos,"UIcyclesearch",null,(fulltree.searchin > 0)&&((searchstring != "")||(search_sounds||search_images)));
        }
        else
        {
            control_button("Go to next search hit",header_ypos,"UIcyclesearch",null,(fulltree.searchin > 0)&&((searchstring != "")||(search_sounds||search_images)));
        }
        header_ypos += (button_gap+button_height);
        
        draw_text(control_margin,header_ypos,button_width,button_height,3,"You can also explore",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
        
        header_ypos += 25
        draw_text(control_margin,header_ypos,button_width,button_height,3,"the tree and follow the",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
        
        header_ypos += 25
        draw_text(control_margin,header_ypos,button_width,button_height,3,"arrows to find search hits.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
        
        header_ypos += 50;
    }
    else
    {
        if (fulltree.searchin == 1)
        {
            draw_text(control_margin,header_ypos,button_width,button_height,3,"returned one hit.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            
            header_ypos += 50;
            
            draw_text(control_margin,header_ypos,button_width,button_height,3,"You can still explore",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            
            header_ypos += 25
            draw_text(control_margin,header_ypos,button_width,button_height,3,"the tree. Arrows will",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            
            header_ypos += 25
            draw_text(control_margin,header_ypos,button_width,button_height,3,"always lead to this hit.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
            
            header_ypos += 50;

        }
        else
        {
        
          draw_text(control_margin,header_ypos,button_width,button_height,3,"returned no hits.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
         header_ypos += 50;
        }
    }
    
    
    control_button("Reset tree view",header_ypos,"viewReset_ns",null,true);
    
    header_ypos += (button_gap+button_height);
    
    //draw_text(control_margin,header_ypos,button_width,button_height,3,"Type your search",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
    
   //header_ypos += 25
   // draw_text(control_margin,header_ypos,button_width,button_height,3,"on the keyboard below.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
    

    
    // space and clear buttons
    header_xpos = control_margin;
    
    control_button("Change search",header_ypos,"edit_searchstring",null,true);

    
    header_ypos += (button_gap+button_height);

    control_button("New search",header_ypos,"clear_searchstring",null,true);
    
    header_ypos += (button_gap+button_height);
    
    if((((thisSound.currentTime)&&(thisSound.currentTime<thisSound.duration))))
    {
        
        drawclock(120,header_ypos + 50,30,thisSound.currentTime/thisSound.duration,'rgb(0,0,0)',Hcontext);
        if (thisSound.currentTime*2>thisSound.duration)
        {
            justplayednew = false;
        }
        
        drawspeaker(200,header_ypos + 50,30,true,Hcontext,'rgb(0,0,0)');
        
        header_ypos += 110
        
        //control_button("Go to sound player",header_ypos,"control_sound_open",null,true);
        
        
        control_button("Stop sound",header_ypos,"control_sound_exit",null,true);
        draw_stop_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
        Hcontext.fillStyle ='rgb(0,0,0)';
        Hcontext.fill();
        header_ypos += (button_gap+button_height);
    }
    
    
    
}


function drawControl_search(header_ypos)
{
    // now draw the feedback panel with an appropriate sized gap
    header_ypos += (button_gap);
    
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (24.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'center';
    // draw title
    
   // draw_text(control_margin,header_ypos,button_width,button_height,3,"asdf"/*searchstring*/,0,button_height*1,button_height*1,button_text_col,null,Hcontext);
    
    var splitstr = searchstring.split(" ");
    if (splitstr.length == 1)
    {
        autotext2_context(false,false,searchstring ,control_margin+(control_width-control_margin)/2,header_ypos+30,230,22.0,Hcontext,0);
    }
    else
    {
        autotext2_context(false,false,searchstring ,control_margin+(control_width-control_margin)/2,header_ypos+30,230,30.0,Hcontext,0);
    }
    
    
    
///autotext2_context(false,false,"Type your search on the keyboard below." , control_width/2 ,header_ypos+80,230,30.0,Hcontext,0);
    
    
    header_ypos += (50+button_height);
    
    
    
    control_button("See search results",header_ypos,"marksearchUI",null,(searchstring != "")||(search_sounds||search_images));
    header_ypos += (button_gap+button_height);
    
    //control_button("Reset tree view",header_ypos,"viewReset_ns",null,true);
    
   //   header_ypos += (button_gap+button_height);
    
    draw_text(control_margin,header_ypos,button_width,button_height,3,"Type your search",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
    
     header_ypos += 25
     draw_text(control_margin,header_ypos,button_width,button_height,3,"on the keyboard below.",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
    
    
    
    
    
    
    ///autotext2_context(false,false,"Type your search on the keyboard below." , control_width/2 ,header_ypos+80,230,30.0,Hcontext,0);

    
    header_ypos += 50;
    
    // keyboard
    alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","<-"];
    header_xpos = control_margin;
    var indent = true;
    for (var i = 0 ; i < alphabet.length ; i ++)
    {
        
        if (alphabet[i] == "<-")
        {
            // special symbol for backspace key
            alpha_button(" ",header_xpos,header_ypos,alpha_button_width,"append_searchstring",alphabet[i],true)
              draw_backspace(header_xpos+alpha_button_width/2,header_ypos+alpha_button_height/2,alpha_button_width*0.6,alpha_button_height*0.8,button_text_col,Hcontext);
        }
        else
        {
            // ordinary key
            alpha_button(alphabet[i],header_xpos,header_ypos,alpha_button_width,"append_searchstring",alphabet[i],true)
        }
        
        header_xpos += (alpha_button_width+alpha_button_gap);
        if (header_xpos > (button_width-(alpha_button_width+alpha_button_gap)/2))
        {
            header_xpos = control_margin;
            header_ypos += (button_height+alpha_button_gap);
            
            if (indent)
            {
                header_xpos += ((alpha_button_width+alpha_button_gap)/2);
                indent = false;
            }
            else
            {
                indent = true;
            }
        }
    }
    
    // space and clear buttons
    header_xpos = control_margin;
    alpha_button(" ",header_xpos,header_ypos,alpha_button_width*3+alpha_button_gap*2,"append_searchstring"," ",true);
    header_xpos += alpha_button_width*3+alpha_button_gap*3;
    alpha_button("Clear",header_xpos,header_ypos,alpha_button_width*2+alpha_button_gap,"clear_searchstring",null,true);
    
    // other search buttons
    header_ypos += (button_gap+button_height);
    
    draw_text(control_margin,header_ypos,button_width,button_height,3,"Your search settings are:",0,button_height*0.55,button_height*0.55,button_text_col,null,Hcontext);
    
    header_ypos += 40
    
    //    latin_search = true;
    //    common_search = true;
    
    if (!latin_search)
    {
        control_button("Common names only",header_ypos,"search_name_change",null,true);
    }
    else
    {
        control_button("Latin or common names",header_ypos,"search_name_change",null,true);
    }
    header_ypos += (button_gap+button_height);
    
    
    if (search_images)
    {
        control_button("Must have an image",header_ypos,"switch_search_images",null,true);

        header_ypos += (button_gap+button_height);
    }
    else
    {
        control_button("With or without images",header_ypos,"switch_search_images",null,true);

       header_ypos += (button_gap+button_height);
    }
    
    if (search_sounds)
    {
        control_button("Must have sound",header_ypos,"switch_search_sounds",null,true);

        header_ypos += (button_gap+button_height);
    }
    else
    {
        control_button("With or without sounds",header_ypos,"switch_search_sounds",null,true);

        header_ypos += (button_gap+button_height);
    }
 



}

function drawControl_pop(header_ypos)
{
    // now draw the feedback panel with an appropriate sized gap
    header_ypos += (button_gap);
   
    // reset & random
    control_button("Reset tree view",header_ypos,"viewReset",null,true);
    header_ypos += (button_gap+button_height);
    control_button("Random species",header_ypos,"randompop",null,true);
    header_ypos += (button_gap*2+button_height);
    
    
    // draw up arrow button
    if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"src_u",true,HmouseX,HmouseY,Hmouse_clicking))
    {
        button_next_action_2 = "Pop_scroll_up";
    }
    Hcontext.fillStyle = button_text_col;
    Hcontext.textAlign = 'center';
    Hcontext.textBaseline = 'middle';
    Hcontext.fillText  ("More" , control_margin+button_width/2, header_ypos+button_height/2+button_gap);
    header_ypos += (button_gap+alpha_button_gap+button_height);
    
    
    // examples
    for (var iii = pop_button_index ; iii < (pop_button_index+pop_button_num_limit) ; iii ++)
    {
        var tempindex = iii;
        while (tempindex <0)
        {
            tempindex += popular_species_list.length;
        }
        control_button(popular_species_list[tempindex%(popular_species_list.length)],header_ypos,"flight_pop",popular_species_code[tempindex%(popular_species_list.length)],true);
        header_ypos += (alpha_button_gap+button_height);
    }
    
    // draw down arrow button
    if (draw_button(control_margin,header_ypos,button_width,button_height+button_gap,Hcontext,control_button_style,button_corner,"src_d",true,HmouseX,HmouseY,Hmouse_clicking))
    {
        button_next_action_2 = "Pop_scroll_down";
    }
    Hcontext.fillStyle = button_text_col;
    Hcontext.textAlign = 'center';
    Hcontext.textBaseline = 'middle';
    Hcontext.fillText  ("More" , control_margin+button_width/2, header_ypos+button_height/2);
    header_ypos += (button_gap*2+alpha_button_gap+button_height);
    
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'left';
    // draw title
    
    temp_txt = [" ",
                "Choose a species from the list",
                "above to zoom into the part",
                "of the tree of life where that",
                "species is located."];
    skipper = 22
    
    for (var iii = 0 ; iii < temp_txt.length ; iii ++)
    {
        Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
    }
    

    
}

// draw the growth animation control panel page
function drawControl_grow(header_ypos)
{
    // now draw the feedback panel with an appropriate sized gap
    header_ypos += (button_gap*3);
   
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (24.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'center';
    // draw title
    
    
    if (timelim > 0 )
    {
        if (timelim >10)
        {
            Hcontext.font = (40.0).toString() + 'px '+fonttype;
            Hcontext.fillText((Math.round(timelim*10)/10.0).toString()  , 185, header_ypos);
            drawclock(80,header_ypos,20,1-(timelim/original_timelim),'rgb(0,0,0)',Hcontext);

            header_ypos += 45;
            
            Hcontext.font = (20.0).toString() + 'px '+fonttype;
            Hcontext.fillText('Million years ago' , 147, header_ypos);
        }
        else
        {
           // if (timelim >1)
           // {
                Hcontext.font = (40.0).toString() + 'px '+fonttype;
                Hcontext.fillText((Math.round(timelim*100)/100.0).toString()  , 185, header_ypos);
                drawclock(80,header_ypos,20,1-(timelim/original_timelim),'rgb(0,0,0)',Hcontext);

                header_ypos += 45;

                
                Hcontext.font = (20.0).toString() + 'px '+fonttype;
                Hcontext.fillText('Million years ago' , 147, header_ypos);
           // }
        }
        header_ypos += 30;
        Hcontext.font = (20.0).toString() + 'px '+fonttype;
        Hcontext.fillText( gpmapper(timelim) + ' period', 147, header_ypos);
        
        
    }
    else
    {
        //header_ypos += 25;
        //Hcontext.font = (30.0).toString() + 'px '+fonttype;
        //Hcontext.fillText('Present day' , 147, header_ypos);
        //header_ypos += 50;
        
        Hcontext.font = (40.0).toString() + 'px '+fonttype;
        Hcontext.fillText('0'  , 147, header_ypos);
        
        header_ypos += 45;
        
        Hcontext.font = (20.0).toString() + 'px '+fonttype;
        Hcontext.fillText('Million years ago' , 147, header_ypos);
        
        header_ypos += 30;
        Hcontext.font = (20.0).toString() + 'px '+fonttype;
        Hcontext.fillText( 'Present day', 147, header_ypos);
        
    }
    
    header_ypos += 30;
    
    // growth control buttons
    control_button("Reverse",header_ypos,"growrev",null,(!growing)||growingdir);
    draw_reverse_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    control_button("Pause",header_ypos,"growpause",null,!growingpause);
    draw_pause_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    control_button("Play",header_ypos,"growplay",null,(!growing)||(!growingdir));
    draw_play_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    control_button("End",header_ypos,"growend",null,(growing)||((growingpause)||(timelim >= 0)));
    draw_stop_symbol(control_margin+button_width*(5/6),header_ypos+button_height/2,25,Hcontext)
    Hcontext.fillStyle ='rgb(0,0,0)';
    Hcontext.fill();
    header_ypos += (button_gap+button_height);
    
    // reset button
    control_button("Reset tree view",header_ypos,"viewReset",null,true);
    header_ypos += (button_gap+button_height);

    
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'left';
    // draw title

    
    temp_txt = [" ",
                "This function shows you an",
                "animation of the tree growing",
                "over time.  The tree doesn't",
                "show extinct species, other than",
                "those where extinction has",
                "occured very recently. You can",
                "still explore the tree in the",
                "usual way during this animation."," ",
                "Touch the screen with two",
                "fingers and pinch to zoom in or",
                "out. You can also tap any of",
                "the circular images to zoom in",
                "to that area of the tree."];
    skipper = 22
    
    for (var iii = 0 ; iii < temp_txt.length ; iii ++)
    {
        Hcontext.fillText  (temp_txt[iii] , control_margin, header_ypos+skipper*iii);
    }
    
    
    
}

function name_change()
{
    if (commonlabels == true)
    {
        commonlabels = false;
        control_canvas_status_search = 1;
        performclear();
    }
    else
    {
        commonlabels = true;
        control_canvas_status_search = 1;
        performclear();
    }
    
    draw2();
}

function search_name_change()
{
    
    //    latin_search = true;
    common_search = true;
    if (latin_search == true)
    {
        latin_search = false;
        control_canvas_status_search = 1;
        performclear();
    }
    else
    {
        latin_search = true;
        control_canvas_status_search = 1;
        performclear();
    }
    
    draw2();
}





// draw the 'more options' control panel
function drawControl_more(header_ypos)
{
    // now draw the feedback panel with an appropriate sized gap
    header_ypos += (button_gap);
    //header_ypos += txtbox_height + button_gap*2;
    
    // reset button
    control_button("Reset tree view",header_ypos,"viewReset",null,true);
    header_ypos += (button_gap+button_height);
    
    control_button("Start screensaver",header_ypos,"screen_saver_restart",null,true);
    header_ypos += (button_gap+button_height);
    
    
    // latin / common label change
    if (commonlabels)
    {
        control_button("Use Latin names",header_ypos,"name_change",null,true);
    }
    else
    {
        control_button("Use common names",header_ypos,"name_change",null,true);
    }
    header_ypos += (button_gap+button_height);
    
    
    // TEMP TODO
    control_button("Change tree shape",header_ypos,"form_change",null,true);
    header_ypos += (button_gap+button_height);
    
    // TEMP TODO END

    
    if (switching_allowed)
    {
        control_button(switching_button_txt,header_ypos,"tree_switch",null,true);
    
    header_ypos += (button_gap+button_height);
    }
    header_ypos += button_gap;
    
    // set up fonts
    Hcontext.fillStyle = 'rgb(0,0,0)';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    Hcontext.textAlign = 'left';
    // draw title
    var skipper = 22
    for (var gck = 0 ; gck < global_colorkey_title.length ; gck ++)
    {
        Hcontext.fillText  (global_colorkey_title[gck], control_margin, header_ypos+skipper*(gck+1));
    }
    
    header_ypos=header_ypos+skipper*5+30
    
    // set up fonts for main key
    Hcontext.textAlign = 'left';
    Hcontext.font = (18.0).toString() + 'px '+fonttype;
    // build vector of all key elents

    // loop over key elements
    for (var hc = 0 ; hc < global_colorkey_col.length ; hc++)
    {
        // use existing red list tools to parse key information into text and colors
        Hcontext.fillStyle = global_colorkey_col[hc];
        Hcontext.fillRect(control_margin,header_ypos+hc*30,45,20);
        Hcontext.fillText  (global_colorkey_text[hc] , 80, header_ypos+10+hc*30);
    }

}


/* canvas control functions called by buttons to rearrange the control panel */

// switch the search images tag
function switch_search_images()
{
    search_images = !search_images;
    drawControl();
}

// switch the search sounds tag
function switch_search_sounds()
{
    search_sounds = !search_sounds;
    drawControl();
}

// this function clears the search string
function clear_searchstring()
{
    control_sound_exit();
    control_canvas_status_search = 1;
    searchstring = "";
    search_sounds = false;
    search_images = false;
    performclear();
    drawControl();
}

function edit_searchstring()
{
    control_sound_exit();
    control_canvas_status_search = 1;
    performclear();
    drawControl();
}

// this function appends a character to the search string
function append_searchstring()
{
    if (button_next_var == "<-")
    {
        searchstring = searchstring.substr(0,searchstring.length-1);
    }
    else
    {
        searchstring += button_next_var;
    }
    drawControl();
}

// this function scrolls the pop species list up
function Pop_scroll_up()
{
    pop_button_index = pop_button_index-pop_button_num_limit;
    drawControl();
}

// this function scrolls the pop species list down
function Pop_scroll_down()
{
    pop_button_index = pop_button_index+pop_button_num_limit;
    drawControl();
}

// this function scrolls the evolutionary path up
function Path_scroll_up()
{
    path_button_index --;
    if (path_button_index < 0)
    {
        path_button_index = 0;
    }
    drawControl();
}

// this function scrolls the evolutionary path up
function Path_scroll_down()
{
    path_button_index ++;
    if (path_button_index > locationvect.length-path_button_num_limit+2)
    {
        path_button_index = locationvect.length-path_button_num_limit+2;
    }
    drawControl();
}

// this function is called to change the canvas status based on clicking of the buttons
function Set_control_canvas_status()
{
    // reset the evolutionary path index so that if we go back to that view we get the default
    path_button_index = -1;
    
    nowplaying = null;
    justplayednew = false;
    soundqueue = null;
    queuestop = null;
    //last_played = null;
    if (thisSound.duration)
    {
        thisSound.currentTime = thisSound.duration;
    }

    
    if (control_canvas_status == 5)
    {
    	control_canvas_status = button_next_var;
        setTimeout(growend(),1);
    }
    else
    {
        control_canvas_status = button_next_var;
        if (control_canvas_status == 5)
        {
            setTimeout(growoptions(),1);
        }
    }
    drawControl();
}


