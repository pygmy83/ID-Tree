/* global variables */

// these variables will define the columns of the metadata for leaves.
var mc_key_l; // for leaves
var mc_key_n; // for nodes
// indexes that are used in the code a * indicates it must be present to avoid an error
// "common" *
// "picfile" now data_pic_col
// "sound"
// "latin" * (note can use _ which will be replaced by " "
// "piccredit"

// for storin the location in the tree
var locationtxt = "my location";
var locationvect = []; // this will store the hierarchy location as a vector
var locationvect_index = []; // this will store the hierarchy location position as a number using negative numbers to indicate leaves

/* end of global variables */

// this is the logic that draws the leaves and could be edited or added to with additional functions
var popuptext = null;
var popuptext2 = null;
var justopened = true;
var zoominnum;
var zoomoutnum;
var timer4fps;
var counter4pfs;


var pics_unloaded = false; // this will be true if we are waitng for pics to be loaded

var popupin;
var last_searched = null;
var postaction_since_reset = 0;

function user_screen_saver_start()
{
    location.reload();
}

function screen_saver_start()
{
    searchstring = "";
    //KBshift = false;
    //search_sounds = false;
    //search_images = false;
    manusersearchclear();
    //document.getElementById("KBCanvas").style.display = 'none';
    //KBdisplayed = false;
    
    screensaver_on = true;
    touch_rem = true;

   
    if (((!flying) && (!growing)) &&(!mousehold))
    {
    clearTimeout(tout_ss);
    viewchange_due = false;
    tout_sw = setTimeout('viewchange_due_on()',screen_saver.switch_wait*1000);
     screen_saver_preaction();
    }
    else
    {
            clear_screensaver();
    }
}

function clear_screensaver()
{
   
    if (!flying_2)
    {
        flying = false;
        clearTimeout(t);
    }
   // flying_2 = false;

    
    
    clearTimeout(tout_ss);
    clearTimeout(tout_sw);
    clearTimeout(tout_aw);
    if (screensaver_on)
    {
        growend();
        screensaver_on = false; // screen saver in use right now
        viewchange_due = false; // view change is due soon
        if (thisSound.duration)
        {
            thisSound.currentTime = thisSound.duration;
            nowplaying = null;
        }
    }
    
   
    
    tout_ss = setTimeout('screen_saver_restart()',screen_saver.kickin_wait*1000);
    tout_sw = setTimeout('viewchange_due_on()',screen_saver.switch_wait*1000);
}

function screen_saver_restart()
{
    //if (restart_flag)
    //{
    //    chrome.send('restartBrowser');
    //}
    if (URL_parsed&&(URL_parsed != ""))
    {
        window.location.href = ("./"+URL_parsed);
    }
    else
    {
        location.reload();
    }
}

function screen_saver_preaction()
{
    if (viewchange_due)
    {

        random_switch();
        viewchange_due = false;
        tout_sw = setTimeout('viewchange_due_on()',screen_saver.switch_wait*1000);
    }
    else
    {

        var randtemp5 = Math.random();
        if (randtemp5 < (screen_saver.zoomin__+screen_saver.zoomin_random+screen_saver.slideshow))
        {

            if (randtemp5 < (screen_saver.zoomin__+screen_saver.zoomin_random))
            {

                slideshow_progress = -1;
                highlight_search = true;
                //if((viewtype ==1)||(viewtype == 4))
                //{
                    //    performleap();
                    //}
                    //else
                    //{
                    performfly();
               // }
                draw2();
            }
            else
            {
                slideshow_progress = screen_saver.sslength;
                highlight_search = false;
                performleap();
                draw2();
            }
        }
        else
        {
            ResetSS();
            draw2();
            growplay();
        }
    }
}

var slideshow_progress = 0;

function viewchange_due_on()
{
    viewchange_due = true;
}

function random_switch()
{
    
    var randtemp = Math.random();
    if (randtemp < (screen_saver.natural_prop))
    {
        viewtype = 2;
    }
    else
    {
        if (randtemp < ((screen_saver.natural_prop)+(screen_saver.spiral_prop)))
        {
            viewtype = 1;
        }
        else
        {
           if (randtemp < ((screen_saver.natural_prop)+(screen_saver.spiral_prop)+(screen_saver.feather_prop)))
            {
                viewtype = 3;
            }
            else
            {
                viewtype = 4;
            }
        }
    }
    
    /*
    var randtemp2 = Math.random();
    if (randtemp2 < (screen_saver.plain_prop))
    {
        colourtype = 1;
    }
    else
    {
        if (randtemp2 < ((screen_saver.plain_prop)+(screen_saver.time_prop)))
        {
            colourtype = 2;
        }
        else
        {
            colourtype = 3;
        }
    }

    
    var randtemp3 = Math.random();
    if (randtemp3 < (screen_saver.common_prop))
    {
        commonlabels = true;
    }
    else
    {
         commonlabels = false;
    }
    */
    
    draw_loading();
    setTimeout('form_change2()',1);
}


function screen_saver_postaction()
{
    //todo
    draw2();
    postaction_since_reset ++;
    if (postaction_since_reset < 10)
    {
        tout_aw = setTimeout('screen_saver_preaction()',screen_saver.animation_wait*1000);
    }
    else
    {
        location.reload();
    }
}

function screen_saver_postaction2()
{
    
fulltree.deanchor();
fulltree.graphref = true;
fulltree.clearsearch();
fulltree.clearonroute();
fulltree.setxyr3r(40,widthres-40,40,heightres-40);
wsinit = ws;
    draw2();
     postaction_since_reset ++;
    if (postaction_since_reset < 10)
    {
        tout_aw = setTimeout('screen_saver_preaction()',screen_saver.animation_wait*1000);
    }
    else
    {
        location.reload();
    }
}

	midnode.prototype.drawleaf1 = function(x,y,r)
	{
		context.beginPath();
		context.arc(x,y,r*(1-partl2*1.5),0,Math.PI*2,true);
		context.lineWidth = r*(partl2*3);
		context.stroke();
		context.fill();
	}
	
	midnode.prototype.drawleaf2 = function(x,y,r,angle)
	{
		var tempsinpre = Math.sin(angle);
		var tempcospre = Math.cos(angle);
		var tempsin90pre = Math.sin(angle + Math.PI/2.0);
		var tempcos90pre = Math.cos(angle + Math.PI/2.0);
		
		var startx = x-r*(1-partl2*1)*tempcospre;
		var endx = x+r*(1-partl2*1)*tempcospre;
		var starty = y-r*(1-partl2*1)*tempsinpre;
		var endy = y+r*(1-partl2*1)*tempsinpre;
		var midy = (endy-starty)/3;
		var midx = (endx-startx)/3;
		
		context.beginPath();
		context.moveTo(startx,starty);
		context.bezierCurveTo(startx+midx+2*r/2.4*tempcos90pre,starty+midy+2*r/2.4*tempsin90pre,startx+2*midx+2*r/2.4*tempcos90pre,starty+2*midy+2*r/2.4*tempsin90pre,endx,endy);
		context.bezierCurveTo(startx+2*midx-2*r/2.4*tempcos90pre,starty+2*midy-2*r/2.4*tempsin90pre,startx+midx-2*r/2.4*tempcos90pre,starty+midy-2*r/2.4*tempsin90pre,startx,starty);
		context.lineWidth = r*(partl2*3);
		context.stroke();
		context.fill();
	}

midnode.prototype.drawleaf3 = function(x,y,r,angle)
{
    var tempsinpre = Math.sin(angle);
    var tempcospre = Math.cos(angle);
    var tempsin90pre = Math.sin(angle + Math.PI/2.0);
    var tempcos90pre = Math.cos(angle + Math.PI/2.0);
    
    
    context.beginPath();
    context.lineTo( x + r*(0.6)*tempcospre,y + r*(0.6)*tempsinpre,20,0,Math.PI*2);
    context.lineTo(x - r*(0.5)*tempcospre - r*(0.7)*tempcos90pre,y - r*(0.5)*tempsinpre - r*(0.7)*tempsin90pre,20,0,Math.PI*2,true);
    context.lineTo(x - r*(0.3)*tempcospre ,y - r*(0.3)*tempsinpre ,20,0,Math.PI*2,true);
    context.lineTo(x - r*(0.5)*tempcospre + r*(0.7)*tempcos90pre,y - r*(0.5)*tempsinpre + r*(0.7)*tempsin90pre,20,0,Math.PI*2,true);
    context.lineTo( x + r*(0.6)*tempcospre,y + r*(0.6)*tempsinpre,20,0,Math.PI*2);
    context.fillStyle = this.branchcolor();
    context.fill();
    context.strokeStyle = this.branchcolor();
    context.stroke();
    //context.strokeStyle = this.barccolor();
    //context.stroke();
}

	// INITIALISERS


    var URL_parsed


    function init2()
	{
        // first sort out the mc_key_l and mc_key_n objects.
     
        mc_key_l = {};
        
        for (jj = 0 ; jj < (metadata.leaf_meta[0].length) ; jj ++)
        {
            mc_key_l[metadata.leaf_meta[0][jj]] = jj;
        }
        
        mc_key_n = {};
        
        for (jj = 0 ; jj < (metadata.node_meta[0].length) ; jj ++)
        {
            mc_key_n[metadata.node_meta[0][jj]] = jj;
        }
        
        // now on to the rest of the initialisation
        
        var search;
        if( window.location.search.length > 1)
        {
            search = window.location.search;
        }
        else
        {
            search = window.location.hash;
            search = search.split("%20").join(" ");
        }
        URL_parsed = search.split("?")[1];
        
        
        nowloading = true;
		touchX.length = 2;
		touchY.length = 2;
        popupin = true;
        shapechanged = false;
        zoominnum = 7;
        zoomoutnum = 7;
		buttonoptions = 0;
        postaction_since_reset = 0;
        
		
        //init_KB();
        init_Header();
       

        makepic_vect2();
        
		// sort out event listeners for zoom and pan
		myCanvas.onmousedown = holdon;
		myCanvas.onmouseup = holdoff;
		myCanvas.onmouseout = holdoff2;
		myCanvas.onmousemove = movemouse;
		myCanvas.onmousein = domousein;
		if (myCanvas.addEventListener)
		{
			myCanvas.addEventListener ("mousewheel", mousewheel, false);
			myCanvas.addEventListener ("DOMMouseScroll", mousewheel, false);
		}
		else
		{
			if (myCanvas.attachEvent)
			{
				myCanvas.attachEvent ("onmousewheel", mousewheel);
			}
		}
		
		myCanvas.addEventListener ("touchstart", touch_start, false);
		myCanvas.addEventListener ("touchmove", touch_move, false);
		myCanvas.addEventListener ("touchend", touch_end, false);
		
        
		datahastraits = true;
		// read in information from text input
		fulltree = null;
        
		//userdata();
        fulltree = new midnode(rawData);
        
		if (!datahastraits)
		{
			colourtype = 2;
		}
		// calculate species richness at all nodes
		fulltree.richness_calc();
		if (datahastraits)
		{
            fulltree.concalc(); // calculation of metadata stats
		}
        if (auto_interior_node_labels)
        {
            
            // check all names and find monophyletic genera groups
            fulltree.name_calc();
        }
        // calculate ages
		fulltree.phylogeneticdiv_calc();
		fulltree.age_calc();
		// calculate labels
        if (auto_interior_node_labels)
        {
            fulltree.inlabel_calc(null);
		}
        
        // pics
        fulltree.pic_calc();
        
        fulltree.picsort();
        fulltree.numgp_counter();
        
        fulltree.soundsort();
        
        fulltree.spsort(2,2,2); // every other node has a pic unless next to a name
        // the first number is the frequency of SP the second is the current count for common names
        // the third is the current count for latin names
        
        // update fractal form and do all precalculations
		update_form();
        
        setTimeout('init3();',1);

	}
	
	function init3()
	{
        
        
		// resize canvas to fit
		Resize();
        
        // note makepic_vect cannot be called after here.
        
		// centre view on IFIG
		fulltree.setxyr3r(40,widthres-40,40,heightres-40);
		// store initial zoom level
		wsinit = ws;
        
        Reset(); // set the canvas size and draw the IFIG initial view
        drawControl();

        touch_rem_time = setTimeout('touch_rem_switch()',4500);
		screen_saver_start();
        nowloading = false;
	}

var pic_vect_l = new Array; // full length stores the number -1 if not initialised, stores the index in the pic_cache if initialised
var pic_loading_l = new Array; // full length stores bool to indicate if we are waiting for the image to load or not
var pic_pos_l = new Array; // the position back in pic_vect_l that points to this place in cache
var pic_cache_l = new Array; // set of pictures
var pic_pos_recyc_l = new Array; // index in recycler
var pic_recycler_l = new Array; // free places in the cache
var cache_size_l = 40; // size of cache
var top_cache_size_l = 30; // portion of cache that we keep all recently loaded images in
// note: make this too small and things get swapped regularly,
// note: make it too large compared to cache_size_l and recently used images will drop out of cache too soon


var pic_vect_s = new Array; // full length stores the number -1 if not initialised, stores the index in the pic_cache if initialised
var pic_loading_s = new Array; // full length stores bool to indicate if we are waiting for the image to load or not
var pic_pos_s = new Array; // the position back in pic_vect_l that points to this place in cache
var pic_cache_s = new Array; // set of pictures
var pic_pos_recyc_s = new Array; // index in recycler
var pic_recycler_s = new Array; // free places in the cache
var cache_size_s = 80; // size of cache
var top_cache_size_s = 50; // portion of cache that we keep all recently loaded images in
// note: make this too small and things get swapped regularly,
// note: make it too large compared to cache_size_l and recently used images will drop out of cache too soon

function load_image_l(index_to_load)
{
    
    // loads a large image into the cache ready for drawing in a moment
    // index_to_load is an index in leaf_meta that we are preparing for
    if (index_to_load && (index_to_load > 0) && ((mc_key_l[data_pic_col])&&(metadata.leaf_meta[index_to_load][mc_key_l[data_pic_col]])))
    {
        var pic_file_code = metadata.leaf_meta[index_to_load][mc_key_l[data_pic_col]];
        // index in pic_vect_l and pic_loading_l
        if (pic_file_code)
        {
            // there is an image to be cached
            // first find out if it is already loaded
            if ((pic_vect_l[index_to_load]<0))
            {
                // the image is not in cache already
                if (!pic_loading_l[index_to_load])
                {
                    
                    // we have checked and we are not waiting for it to load
                    
                    var posin_cache = pic_recycler_l[pic_recycler_l.length-1];
                    // this is the position in the cache of the thing to be deleted to make space for this
                    
                    
                    var ii = 2;
                    while (pic_loading_l[pic_pos_l[posin_cache]])
                    {
                        posin_cache = pic_recycler_l[pic_recycler_l.length-ii];
                        if (ii >= (pic_recycler_l.length-top_cache_size_l))
                        {
                            ii = 1;
                        }
                        else
                        {
                            ii ++;
                        }
                        // warning: could end up in infinite loop here if cache is not large enough
                    }
                    
                   // if (posin_cache != pic_recycler_l[pic_recycler_l.length-1] )
                   // {
                   //     alert ("using cache overflow code");
                   // }
                    
                    // now we're ready to order loading of the image into posin_cache
                    
                    
                    if ((pic_pos_l[posin_cache])&&(pic_pos_l[posin_cache] > 0))
                    {
                        // we need to perge another item from the vectors
                        pic_vect_l[pic_pos_l[posin_cache]] = -1;
  
                        pic_pos_l[posin_cache] = null;
                        pic_cache_l[posin_cache] = null;
                        pic_recycler_l[pic_pos_recyc_l[posin_cache]] = null;
                        //pic_pos_recyc_l[posin_cache] = null;
                        
                    }
                    
                    for (jj = pic_pos_recyc_l[posin_cache] ; jj > 0 ; jj --)
                    {
                        pic_pos_recyc_l[pic_recycler_l[jj-1]] ++ ;
                        pic_recycler_l[jj]=pic_recycler_l[jj-1];
                    }
                    pic_recycler_l[0] = posin_cache;
                    //pic_pos_l[posin_cache] = index_to_load;
                    pic_pos_recyc_l[posin_cache] = 0;
                    pic_loading_l[index_to_load] = true;
                    pic_vect_l[index_to_load] = null;
                    pic_pos_l[posin_cache] = null;
                    pic_cache_l[posin_cache] = new Image();
                    pic_cache_l[posin_cache].onload = function(){
                        
                        pic_vect_l[index_to_load] = posin_cache;
                        pic_pos_l[posin_cache] = index_to_load;
                        pic_loading_l[index_to_load] = false;
                        //check_cache();
                        
                    }
                    pic_cache_l[posin_cache].onerror = function()
                    {
                        pic_loading_l[index_to_load] = false;
                    }
                    pic_cache_l[posin_cache].src = (data_path_pics+pic_file_code+data_pic_ext);
                }
            }
            else
            {
                
                
                // the image is in cache but we need to promote it
                // to ensure it doesn't drop out of cache too soon
                if ((pic_pos_recyc_l[pic_vect_l[index_to_load]] > top_cache_size_l ))
                {
                    var promoteindex = pic_pos_recyc_l[pic_vect_l[index_to_load]];
                    var promoteval = pic_recycler_l[promoteindex];
                    // we need to promote the image
                    // it's impossible for other images to drop off the end because we're just rearranging
                    for (i = promoteindex ; i > 0 ; i -- )
                    {
                        pic_pos_recyc_l[pic_recycler_l[i-1]] ++;
                        pic_recycler_l[i] = pic_recycler_l[i-1];
                    }
                    pic_recycler_l[0] = promoteval;
                    pic_pos_recyc_l[promoteval] = 0;
                }
                //check_cache();
            }
        }
       
    }
  
   
}



function load_image_s(index_to_load)
{
    
    // loads a large image into the cache ready for drawing in a moment
    // index_to_load is an index in leaf_meta that we are preparing for
    if (index_to_load && (index_to_load > 0) && ((mc_key_l[data_pic_col])&&(metadata.leaf_meta[index_to_load][mc_key_l[data_pic_col]])))
    {
        
        var pic_file_code = metadata.leaf_meta[index_to_load][mc_key_l[data_pic_col]];
        // index in pic_vect_l and pic_loading_l
        if (pic_file_code)
        {
            // there is an image to be cached
            // first find out if it is already loaded
            if ((pic_vect_s[index_to_load]<0))
            {
                // the image is not in cache already
                if (!pic_loading_s[index_to_load])
                {
                    
                    // we have checked and we are not waiting for it to load
                    
                    var posin_cache = pic_recycler_s[pic_recycler_s.length-1];
                    // this is the position in the cache of the thing to be deleted to make space for this
                    
                    
                    var ii = 2;
                    while (pic_loading_s[pic_pos_s[posin_cache]])
                    {
                        posin_cache = pic_recycler_s[pic_recycler_s.length-ii];
                        if (ii >= (pic_recycler_s.length-top_cache_size_s))
                        {
                            ii = 1;
                        }
                        else
                        {
                            ii ++;
                        }
                        // warning: could end up in infinite loop here if cache is not large enough
                    }
                    
                    //if (posin_cache != pic_recycler_s[pic_recycler_s.length-1] )
                    //{
                    //    alert ("using cache overflow code");
                    //}
                    
                    // now we're ready to order loading of the image into posin_cache
                    
                    
                    if ((pic_pos_s[posin_cache])&&(pic_pos_s[posin_cache] > 0))
                    {
                        // we need to perge another item from the vectors
                        pic_vect_s[pic_pos_s[posin_cache]] = -1;
                     
                        pic_pos_s[posin_cache] = null;
                        pic_cache_s[posin_cache] = null;
                        pic_recycler_s[pic_pos_recyc_s[posin_cache]] = null;
                        //pic_pos_recyc_l[posin_cache] = null;
                        
                    }
                    
                    for (jj = pic_pos_recyc_s[posin_cache] ; jj > 0 ; jj --)
                    {
                        pic_pos_recyc_s[pic_recycler_s[jj-1]] ++ ;
                        pic_recycler_s[jj]=pic_recycler_s[jj-1];
                    }
                    pic_recycler_s[0] = posin_cache;
                    //pic_pos_s[posin_cache] = index_to_soad;
                    pic_pos_recyc_s[posin_cache] = 0;
                    pic_loading_s[index_to_load] = true;
                    pic_vect_s[index_to_load] = null;
                    pic_pos_s[posin_cache] = null;
                    pic_cache_s[posin_cache] = new Image();
                    pic_cache_s[posin_cache].onload = function(){
                        
                        
                        pic_vect_s[index_to_load] = posin_cache;
                        pic_pos_s[posin_cache] = index_to_load;
                        pic_loading_s[index_to_load] = false;
                        
                    }
                    pic_cache_s[posin_cache].onerror = function()
                    {
                        pic_loading_s[index_to_load] = false;
                    }
                    pic_cache_s[posin_cache].src = (data_path_thumbs+pic_file_code+data_pic_thumb_ext);
                }
            }
            else
            {
                
                
                // the image is in cache but we need to promote it
                // to ensure it doesn't drop out of cache too soon
                if ((pic_pos_recyc_s[pic_vect_s[index_to_load]] > top_cache_size_s ))
                {
                    var promoteindex = pic_pos_recyc_s[pic_vect_s[index_to_load]];
                    var promoteval = pic_recycler_s[promoteindex];
                    // we need to promote the image
                    // it's impossible for other images to drop off the end because we're just rearranging
                    for (i = promoteindex ; i > 0 ; i -- )
                    {
                        pic_pos_recyc_s[pic_recycler_s[i-1]] ++;
                        pic_recycler_s[i] = pic_recycler_s[i-1];
                    }
                    pic_recycler_s[0] = promoteval;
                    pic_pos_recyc_s[promoteval] = 0;
                }
                //check_cache();
            }
        }
      
    }
  
}



function makepic_vect2()
{
    pic_vect_l.length = (metadata.leaf_meta).length;
    pic_loading_l.length = (metadata.leaf_meta).length;
    
    for (i = 0 ; i < pic_vect_l.length ; i ++)
    {
        pic_vect_l[i] = -1;
        pic_loading_l[i] = false;
    }
    
    pic_cache_l.length = cache_size_l;
    pic_recycler_l.length = cache_size_l;
    pic_pos_l.length = cache_size_l;
    pic_pos_recyc_l.length = cache_size_l;
    
    for (i = 0 ; i < pic_recycler_l.length ; i ++)
    {
        pic_recycler_l[i] = i;
        pic_pos_recyc_l[i] = i;
        pic_cache_l[i] = null;
        pic_pos_l[i] = null;
    }





    pic_vect_s.length = (metadata.leaf_meta).length;
    pic_loading_s.length = (metadata.leaf_meta).length;
    
    for (i = 0 ; i < pic_vect_s.length ; i ++)
    {
        pic_vect_s[i] = -1;
        pic_loading_s[i] = false;
    }
    
    pic_cache_s.length = cache_size_s;
    pic_recycler_s.length = cache_size_s;
    pic_pos_s.length = cache_size_s;
    pic_pos_recyc_s.length = cache_size_s;
    
    for (i = 0 ; i < pic_recycler_s.length ; i ++)
    {
        pic_recycler_s[i] = i;
        pic_pos_recyc_s[i] = i;
        pic_cache_s[i] = null;
        pic_pos_s[i] = null;
    }



}

var thisSound = new Audio;
var nowplaying = null;
var justplayednew = false;

function play_sound(index)
{
    if(screensaver_on)
    {
        touch_rem = false;
        clearTimeout(touch_rem_time);
        touch_rem_time = setTimeout('touch_rem_switch()',1000*touch_rem_wait);
    }
    
   // plays a sound if it can given a leaf metadata index
    // if called again it will change to the new animal or do nothing if it's called again for the same animal and is already in the midddle of playing the sound
    // userreset will stop the sound and erase the memory of what was playing
    if (((mc_key_l["sound"])&&(metadata.leaf_meta[index][mc_key_l["sound"]]))&&(metadata.leaf_meta[index][mc_key_l["sound"]] == "1"))
    {
        if ((thisSound.duration)&&(thisSound.currentTime<thisSound.duration))
        {
            if (nowplaying != index)
            {
                thisSound.pause;
                thisSound.setAttribute("src",(data_path_sounds+metadata.leaf_meta[index][mc_key_l["latin"]]+".mp3"));
                thisSound.play();
                nowplaying = index
                last_played = index;
                justplayednew = true;
                fulltree.check_sound();
            }
        }
        else
        {
            thisSound.setAttribute("src",(data_path_sounds+metadata.leaf_meta[index][mc_key_l["latin"]]+".mp3"));
            thisSound.play();
            nowplaying = index
            last_played = index;
            justplayednew = true;
            fulltree.check_sound();
        }
    }
}

midnode.prototype.check_sound = function()
{
    this.playing_sound = false;
    if (this.child1)
    {
        this.playing_sound = (this.child1.check_sound()|this.child2.check_sound());
    }
    else
    {
        if (nowplaying&&(nowplaying == this.metacode))
        {
            this.playing_sound = true;
        }
    }
    return (this.playing_sound);
}

midnode.prototype.soundsort = function()
{
    if (this.child1)
    {
        this.num_sounds = (this.child1.soundsort() + this.child2.soundsort());
    }
    else
    {
        if (((mc_key_l["sound"])&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]]))&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]] == "1"))
        {
            this.num_sounds = 1;
        }
        else
        {
            this.num_sounds = 0;
        }
    }
    return this.num_sounds;
}




	function Resize()
	{
		Resize_only();
		draw2();
	}


function manusersearchclear()
{
    clear_screensaver();

	clearTimeout(t);
	flying = false;
    flying_2 = false;
	performclear();
	fulltree.clearsearch();
	fulltree.clearonroute();
	searchtext = "";
}

function searchfocus()
{
	    clear_screensaver();
}

function userReset()
{
    if (!nowloading)
    {
    	// todo
    	// variables for touch use
    	first_touch = true;
	touchX = [null,null]; // position of first touch
	touchY = [null,null];
	
	touchhold = false;
	pinchhold = false;

	touch_click = false;
	last_x_touch = null;
	last_y_touch = null;
    	
        mouse_disable = false;
         
        searchstring = "";
       // KBshift = false;
        //search_sounds = false;
       // search_images = false;
       // document.getElementById("KBCanvas").style.display = 'none';
       // KBdisplayed = false;
        
        justopened = false;
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
        }
        
        Reset();
    }
}

function viewReset_ns()
{
    // doesn't reset the search information
    viewReset_b(false);
}

function viewReset()
{
    commonlabels = true;
    viewReset_b(true);
}

function viewReset_b(do_search_clear)
{
    if (!nowloading)
    {
    	    	first_touch = true;
    	// todo
    	// variables for touch use
        touchX = [null,null]; // position of first touch
        touchY = [null,null];
        
        touchhold = false;
        pinchhold = false;
        
        touch_click = false;
        last_x_touch = null;
        last_y_touch = null;
    	
        mouse_disable = false;
        
        justopened = false;
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
        }
        
        clear_screensaver();
        
        searchtext = "";
        calculating = false;
        clearTimeout(t);
        flying = false;
        flying_2 = false;
        if (do_search_clear){
            performclear();
        }
        fulltree.deanchor();
        fulltree.graphref = true;
        
        fulltree.clear_leafpic_drawn();
        //fulltree.clearsearch();
        //fulltree.clearonroute();
        // xmin xmax ymin ymax
        //fulltree.setxyr3r(40,widthres-40,40,heightres-40);
        fulltree.setxyr3r(40,widthres-40,40,heightres-40);
        
        
        nowplaying = null;
        justplayednew = false;
        soundqueue = null;
        queuestop = null;
        tap2zoom = null;
        last_played = null;
        if (thisSound.duration)
        {
            thisSound.currentTime = thisSound.duration;
        }
        
        wsinit = ws;
        Resize();
        


    }

}


	// reset the search and view to its start position
function Reset()
{
            clear_screensaver();

       ResetSS();
}

function ResetSS()
{
    
    //threshold =2;
    if ((growing)||(growingpause))
    {
        clearTimeout(t2);
        draw2();
        timelim = -1;
        Resize();
        growing = false;
        growingpause = false;
        Resize();
    }
    popupboxabout = false;
    popupboxlicense = false;
    
    if (!screensaver_on)
    {
        clear_screensaver();
    }

    commonlabels = true;
 //   document.getElementById("latinbutton").style.display = '';
 //   document.getElementById("commonbutton").style.display = 'none';
    
 //   document.getElementById("pausebutton").style.display = 'none';
 ///   document.getElementById("growbutton").style.display = '';
 //   document.getElementById("continuebutton").style.display = 'none';
    
    searchtext = "";
    calculating = false;
    clearTimeout(t);
    flying = false;
    flying_2 = false;
    clearTimeout(t2);
    performclear();
    timelim = -1;
    fulltree.deanchor();
    fulltree.graphref = true;
    fulltree.clearsearch();
    fulltree.clearonroute();
    // xmin xmax ymin ymax
    //fulltree.setxyr3r(40,widthres-40,65,heightres-40);
    fulltree.setxyr3r(40,widthres-40,40,heightres-40);

   
    nowplaying = null;
    justplayednew = false;
    soundqueue = null;
    queuestop = null;
    tap2zoom = null;
    last_played = null;
    if (thisSound.duration)
    {
        thisSound.currentTime = thisSound.duration;
    }
    
    wsinit = ws;
    Resize();
    
   
    
}

	// MOUSE CONTROL, PAN AND ZOOM
	
	var clicking;
	var mousehold = false;

	var mouseX;
	var mouseY; 
	var oldyp; // old y position for moving
	var oldxp; // old x position for moving
	
	// variables for touch use
	var touchX = []; // position of first touch
	var touchY = [];
	var touchID = null; // the ID of the touch reference
	
	var touch_XS;
	var touch_XY;
	
	
	var touchhold = false;
	var pinchhold = false;
	var touch_button = false;
	
	var oldws; // old scale for pinching 

	var touch_click = false;
	var last_x_touch = null;
	var last_y_touch = null;
	
	var mouse_disable = false;
	var click2zoomnum;

	// if holding down left mouse button - prepare to pan

	var first_touch = true; // this is true until the first touch start action since the last reset



function holdon(event)
{
    // set menu back to navigation assistant
    //if (control_canvas_status ==6)
    //{
    //    control_canvas_status =2;
   // }
    
    if (in_about)
    {
        in_about = false;
        introlock = false;
        clearTimeout(about_anim);
    }
    
    clear_screensaver();
    
	if (!mouse_disable)
	{
        
        if (!touchhold)
        {
            
            clearTimeout(t);
            flying = false;
            flying_2 = false;
            mouseY = event.clientY-myCanvas.offsetTop;
            mouseX = event.clientX-myCanvas.offsetLeft;
            
            if (soundqueue||queuestop||tap2zoom)
            {
                mousehold = false;
                draw2();
            }
            else
            {
                clicking = true;
                oldyp = yp;
                oldxp = xp;
                setTimeout('clicktoolate()',200);
                draw2();
                mousehold = true;
            }
            
           
        }
	}
}

function clicktoolate()
{
    clicking = false;
}

function domousein()
{
    popupin = true;
}

// if releasing left mouse button
function holdoff()
{
    
    if ((!mouse_disable)&&(!screensaver_on))
	{
        //clear_screensaver();

        if (soundqueue)
        {
            play_sound(soundqueue);
            soundqueue = null;
            draw2();
        }
        else
        {
            if (queuestop)
            {
                thisSound.currentTime = thisSound.duration;
                nowplaying = null;
                queuestop = null;
                draw2();
            }
            else
            {
                if (tap2zoom)
                {
                    // tap2zoom function here
                    perform_flight_animation(tap2zoom,EP_anim_length_in);
                }
                else
                {
                    if(clicking)
                    {
                        click2zoomnum = 4;
                        click2zoom();
                    }
                }
            }
        }
		mousehold = false;
		calculating = false;
	}
}

// if moving mouse out of canvas e.g. onto control canvas
function holdoff2()
{
    
    if ((!mouse_disable)&&(!screensaver_on))
	{
		mousehold = false;
		calculating = false;
        mouseX = null;
        mouseY = null;
        draw2();
	}
}


// mouse move, so if left button held redraw
function movemouse(event)
{
	if (!mouse_disable)
	{
        domousein();
		if (mousehold)
		{
            clear_screensaver();
            
			yp = oldyp + (-mouseY+event.clientY -myCanvas.offsetTop);
			xp = oldxp + (-mouseX+event.clientX -myCanvas.offsetLeft);
			if (Math.pow(yp-oldyp,2)>9)
			{
				clicking = false;
			}
			if (Math.pow(xp-oldxp,2)>9)
			{
				clicking = false;
            }
            draw2();
		}
        else
        {
            mouseY = event.clientY -myCanvas.offsetTop;
            mouseX = event.clientX -myCanvas.offsetLeft;
            draw2();
            
        }
	}
	else
	{
		mouse_disable = false;
	}
}


function touch_start(event)
{
	clearTimeout(touch_click2zoom_to);
	first_touch = false;
    // set menu back to navigation assistant
    //if (control_canvas_status ==6)
    //{
    //    control_canvas_status =2;
   // }
    
    touch_XS = null;
    touch_YS = null;

	event.preventDefault();
    soundqueue = null;
    queuestop = null;
    tap2zoom = null;
    if (in_about)
    {
        in_about = false;
        introlock = false;
        clearTimeout(about_anim);
    }
    
    mouse_disable = true;
    holdoff();
    justopened = false;
    clearTimeout(t);
    flying = false;
    flying_2 = false;
    clear_screensaver();
    
    if(event.targetTouches.length > 1)
    {
        touch_click = false;
        if(event.targetTouches.length == 2)// might need to fix this
        {
            touch_button = false;
            soundqueue = null;
            queuestop = null;
            tap2zoom = null;
            oldyp = yp;
            oldxp = xp;
            oldws = ws;
            touchhold = false;
            pinchhold = true;
            var touch = event.targetTouches[0];
            touchX[0] = touch.pageX-myCanvas.offsetLeft;
            touchY[0] = touch.pageY-myCanvas.offsetTop;
            touchID = touch.identifier;
            touch = event.targetTouches[1];
            touchX[1] = touch.pageX-myCanvas.offsetLeft;
            touchY[1] = touch.pageY-myCanvas.offsetTop;
            draw2();
        }
    }
    else
    {
        if(event.targetTouches.length == 1)
        {
            soundqueue = null;
            queuestop = null;
            tap2zoom = null;
            oldyp = yp;
            oldxp = xp;
            touchhold = true;
            pinchhold = false;
            var touch = event.targetTouches[0];
            touchX[0] = touch.pageX-myCanvas.offsetLeft;
            touchY[0] = touch.pageY-myCanvas.offsetTop;
            touchID = touch.identifier;
            last_x_touch = touchX[0];
            last_y_touch = touchY[0];
            touch_XS = touchX[0];
            touch_YS = touchY[0];
            draw2();
            touch_click = true;
            setTimeout('touch_clicktoolate()',500);
            draw2();
        }
    }
}


function touch_clicktoolate()
{
    touch_click = false;
}


function touch_move(event)
{
	
	
	if (!first_touch) {
    mouse_disable = true;
    
    event.preventDefault();
    clearTimeout(t);
    clearTimeout(touch_click2zoom_to);
    
    flying = false;
    flying_2 = false;
    clear_screensaver();
    
    if(event.targetTouches.length > 1)// might need to fix this
    {
        last_x_touch = null;
        last_y_touch = null;
        if(event.targetTouches.length == 2)// might need to fix this
        {
            
            soundqueue = null;
            queuestop = null;
            tap2zoom = null;
            
            var touch = event.targetTouches[0];
            if ((touch.identifier != touchID)&&(event.targetTouches[1].identifier == touchID))
            {
                
                touch = event.targetTouches[1];
            }
            
            yp = oldyp + (-touchY[0]+touch.pageY -myCanvas.offsetTop);
            xp = oldxp + (-touchX[0]+touch.pageX -myCanvas.offsetLeft);
            var zoomaroundX = touch.pageX -myCanvas.offsetLeft;
            var zoomaroundY = touch.pageY -myCanvas.offsetTop;
            var zoomfactor;
            
            zoom_num = Math.pow((((touchX[0]-touchX[1])*(touchX[0]-touchX[1]))+((touchY[0]-touchY[1])*(touchY[0]-touchY[1]))),0.5);
            zoom_den = Math.pow((((event.targetTouches[0].pageX - event.targetTouches[1].pageX)*(event.targetTouches[0].pageX - event.targetTouches[1].pageX))+((event.targetTouches[0].pageY - event.targetTouches[1].pageY)*(event.targetTouches[0].pageY - event.targetTouches[1].pageY))),0.5);
            
            if (zoom_den>0)
            {
                zoomfactor = (zoom_num)/(zoom_den);
                ws = oldws/zoomfactor;
                xp = zoomaroundX + (xp-zoomaroundX)/zoomfactor;
                yp = zoomaroundY + (yp-zoomaroundY)/zoomfactor;
            }
            draw2();
        }
        
    }
    else
    {
        if(event.targetTouches.length == 1)
        {
            var touch = event.targetTouches[0];
            if (touch_button)
            {
                last_x_touch =  touch.pageX -myCanvas.offsetLeft;
                last_y_touch = touch.pageY -myCanvas.offsetTop;
            }
            else
            {
                if (touchID == touch.identifier)
                {
                    yp = oldyp + (-touchY[0]+touch.pageY -myCanvas.offsetTop);
                    xp = oldxp + (-touchX[0]+touch.pageX -myCanvas.offsetLeft);
                    
                    if (Math.pow(yp-oldyp,2)>100)
                    {
                        touch_click = false;
                    }
                    if (Math.pow(xp-oldxp,2)>100)
                    {
                        touch_click = false;
                    }
                    last_x_touch =  touch.pageX -myCanvas.offsetLeft;
                    last_y_touch = touch.pageY -myCanvas.offsetTop;
                }
                else
                {
                    soundqueue = null;
                    queuestop = null;
                    tap2zoom = null;
                    oldyp = yp;
                    oldxp = xp;
                    touchhold = true;
                    pinchhold = false;
                    touchX[0] = touch.pageX-myCanvas.offsetLeft;
                    touchY[0] = touch.pageY-myCanvas.offsetTop;
                    touchID = touch.identifier;
                    last_x_touch = touchX[0];
                    last_y_touch = touchY[0];
                }
            }
            draw2();
        }
        }
        }
}


function touch_end(event)
{
	if (!first_touch){
    // set menu back to navigation assistant
    //if (control_canvas_status ==6)
    //{
    //    control_canvas_status =2;
   // }
    
	mouse_disable = true;

	event.preventDefault();
    
    if(event.targetTouches.length == 0)
    {
        if (soundqueue)
        {
            play_sound(soundqueue);
            soundqueue = null;
            last_x_touch = null;
            last_y_touch = null;
        }
        else
        {
            if (queuestop)
            {
                thisSound.currentTime = thisSound.duration;
                nowplaying = null;
                queuestop = null;
            }
            else
            {
                if (tap2zoom)
                {
                    // tap2zoom action to add here.
                    perform_flight_animation(tap2zoom,EP_anim_length_in);
                }
                else
                {
                    if ((touch_click)&&(!touch_button))
                    {
                        click2zoomnum = 4;
                        touch_click2zoom_to = setTimeout('touch_click2zoom()',150);
                    }
                }
            }
        }
        touch_button = false;
        touchhold = false;
        pinchhold = false;
        last_x_touch = null;
        last_y_touch = null;
        soundqueue = null;
        tap2zoom = null;
        queuestop = null;
        touch_click = false;
        
        
         if(!((((fulltree).rvar*(fulltree.hxmax-fulltree.hxmin))>(widthres*0.5))||(((fulltree).rvar*(fulltree.hymax-fulltree.hymin))>(heightres*0.5))))
        {
        	perform_flight_animation(1,EP_anim_length_in/40); // fly back to root
        }
        else
        {
        	draw2();
        }
    }
    else
    {
        touch_click = false;
        if(event.targetTouches.length == 1)
        {
            soundqueue = null;
            queuestop = null;
            tap2zoom = null;
            oldyp = yp;
            oldxp = xp;
            touchhold = true;
            pinchhold = false;
            var touch = event.targetTouches[0];
            touchX[0] = touch.pageX-myCanvas.offsetLeft;
            touchY[0] = touch.pageY-myCanvas.offsetTop;
            touchID = touch.identifier;
            last_x_touch = touchX[0];
            last_y_touch = touchY[0];
            draw2();
        }
        if(event.targetTouches.length == 2)
        {
            soundqueue = null;
            tap2zoom = null;
            queuestop = null;
            last_x_touch = null;
            last_y_touch = null;
            touch_button = false;
            oldyp = yp;
            oldxp = xp;
            oldws = ws;
            touchhold = false;
            pinchhold = true;
            var touch = event.targetTouches[0];
            touchX[0] = touch.pageX-myCanvas.offsetLeft;
            touchY[0] = touch.pageY-myCanvas.offsetTop;
            touchID = touch.identifier;
            touch = event.targetTouches[1];
            touchX[1] = touch.pageX-myCanvas.offsetLeft;
            touchY[1] = touch.pageY-myCanvas.offsetTop;
            draw2();
        }
    }
    	}
}
	
	// need to zoom in or out
	function mousewheel(event)
	{
        // set menu back to navigation assistant
        //if (control_canvas_status ==6)
       // {
        //    control_canvas_status =2;
        //}
        
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
        }
        
		mouse_disable = false;
        clear_screensaver();

        justopened = false;
		popupboxabout = false;
        popupboxlicense = false;
		if (!calculating)
		{
			clearTimeout(t);
			flying = false;
            flying_2 = false;

			if (!mousehold)
			{
				var delta = 0;
				if ('wheelDelta' in event) 
				{
					delta = event.wheelDelta;
				}
				else 
				{
					delta = -event.detail / 2;
				}
				
				if ((parseFloat(delta)) > 0.0)
				{
					calculating = true;
					zoomin(event)
				}
				else
				{
					calculating = true;
					zoomout(event)
				}
			}
			setTimeout('calcfalse()',1);
			// there is a tiny delay here to force redraw in all browsers when zooming a lot
		}
	}
	
	// handles the calculating flag
	function calcfalse()
	{
		calculating = false;
	}
	
	// zoom in function
	function zoomin(event)
	{
             clear_screensaver();

		clearTimeout(t);
		mouseY = event.clientY -myCanvas.offsetTop;
        mouseX = event.clientX -myCanvas.offsetLeft;
		flying = false;
        flying_2 = false;

		ws = ws/sensitivity;
		xp = mouseX + (xp-mouseX)/sensitivity;
		yp = mouseY + (yp-mouseY)/sensitivity;
		draw2();
       
	}
	
	// zoom out function
	function zoomout(event)
	{
            clear_screensaver();

		mouseY = event.clientY -myCanvas.offsetTop;
        mouseX = event.clientX -myCanvas.offsetLeft;
		clearTimeout(t);
		flying = false;
        flying_2 = false;

        
        if((((fulltree).rvar*(fulltree.hxmax-fulltree.hxmin))>(widthres*0.7))||(((fulltree).rvar*(fulltree.hymax-fulltree.hymin))>(heightres*0.7)))
        {
            ws = ws*sensitivity;
            xp = mouseX + (xp-mouseX)*sensitivity;
            yp = mouseY + (yp-mouseY)*sensitivity;
            draw2();

        }
        
 	}

var touch_click2zoom_to; // timeout event for delaying the click to zoom a moment after touch end
 	
function touch_click2zoom()
{
        clear_screensaver();

    clearTimeout(t);
    flying = false;
    flying_2 = false;

    if (touch_XS&&touch_YS)
    {
    ws = ws/sensitivity3;
    xp = touch_XS + (xp-touch_XS)/sensitivity3;
    yp = touch_YS + (yp-touch_YS)/sensitivity3;
    draw2();
    click2zoomnum --;
    if (click2zoomnum >= 0)
    {
         t = setTimeout('touch_click2zoom()',33);
    }
    }
}

function click2zoom()
{
        clear_screensaver();

    clearTimeout(t);
    flying = false;
    flying_2 = false;

    ws = ws/sensitivity3;
    xp = mouseX + (xp-mouseX)/sensitivity3;
    yp = mouseY + (yp-mouseY)/sensitivity3;
    draw2();
    click2zoomnum --;
    if (click2zoomnum >= 0)
    {
         t = setTimeout('click2zoom()',33);
    }
    
}

// zoom in function
function CZoomin()
{
        clear_screensaver();

    if (zoominnum > 0)
    {
        zoominnum --;
    }
    click2zoomnum = 4;
    
    CZoomin2();
}

// zoom out function
function CZoomout()
{
        clear_screensaver();

    if (zoomoutnum > 0)
    {
        zoomoutnum --;
    }
    click2zoomnum = 4;
   
    CZoomout2();
}

// zoom in function
function CZoomin2()
{
        clear_screensaver();

    clearTimeout(t);
    flying = false;
    flying_2 = false;

    ws = ws/sensitivity2;
    xp = widthres/2 + (xp-widthres/2)/sensitivity2;
    yp = heightres/2 + (yp-heightres/2)/sensitivity2;
    draw2();
    click2zoomnum --;
    if (click2zoomnum >= 0)
    {
        t = setTimeout('CZoomin2()',33);
    }
}

// zoom out function
function CZoomout2()
{
        clear_screensaver();

    clearTimeout(t);
    flying = false;
    flying_2 = false;

    
    if((((fulltree).rvar*(fulltree.hxmax-fulltree.hxmin))>(widthres*0.7))||(((fulltree).rvar*(fulltree.hymax-fulltree.hymin))>(heightres*0.7)))
    {
        ws = ws*sensitivity2;
        xp = widthres/2 + (xp-widthres/2)*sensitivity2;
        yp = heightres/2 + (yp-heightres/2)*sensitivity2;
        draw2();
        
    }
    click2zoomnum --;
    if (click2zoomnum >= 0)
    {
        t = setTimeout('CZoomout2()',33);
    }
}

// zoom out animation

function zoomout_animation()
{
 
    
    if((((fulltree).rvar*(fulltree.hxmax-fulltree.hxmin))>(widthres*0.001))||(((fulltree).rvar*(fulltree.hymax-fulltree.hymin))>(heightres*0.001)))
    {
        ws = ws*screen_saver.zosens;
        xp = widthres/2 + (xp-widthres/2)*screen_saver.zosens;
        yp = heightres/2 + (yp-heightres/2)*screen_saver.zosens;
        draw2();
        t = setTimeout('zoomout_animation()',50);
    }
    else
    {
        screen_saver_preaction();
    }
}

// BUTTON CONTROL

    function viewoptions()
	{
        if (!nowloading)
        {
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
        }
        
        clear_screensaver();

		justopened = false;
		if (commonlabels)
		{
			commonlabels = false;
		
		}
		else
		{
			commonlabels = true;

		}

		justopened = false;
		clearTimeout(t);
		flying = false;
            flying_2 = false;

		performclear();
		fulltree.clearsearch();
		fulltree.clearonroute();
		searchtext = "";
		draw2();
        }

	}
    
	function growoptions()
	{
        if (!nowloading)
        {
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
        }
        
		    clear_screensaver();

		justopened = false;
		if (!growing)
		{
            viewReset();
			growplay();
			
		}
        }
	}

function searchoptions()
{
    if (!nowloading)
    {
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
            draw2();
        }
        
        clear_screensaver();
        
       // KBmouseX = null;
       // KBmouseY = null;
       // drawKB();
       // if (KBdisplayed)
      //  {
       //     document.getElementById("KBCanvas").style.display = 'none';
       //     KBdisplayed = false;
       // }
       // else
       // {
       //     document.getElementById("KBCanvas").style.display = '';
       //     KBdisplayed = true;
       // }
    }
}

	// change fractal form of display
	function form_change()
	{
        if (!nowloading)
        {
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
        }
        
		shapechanged = true;
		clearTimeout(t);
		    clear_screensaver();

		flying = false;
            flying_2 = false;

		if (viewtype == 1)
		{
			viewtype = 2;
		}
		else
		{
			if (viewtype == 2)
			{
				viewtype = 3;
			}
			else
			{
				if (viewtype == 3)
                {
                    viewtype = 4;
                }
                else
                {
                    viewtype = 1;
                }
			}
		}
		draw_loading();
		setTimeout('form_change2()',1);
        }
	}

	function form_change2()
	{
		update_form();
        viewReset();
        if (screensaver_on)
        {
            setTimeout('screen_saver_postaction2()',1);
        }
        else
        {
            Resize();
        }
	}

 

	// TEXT DRAWING TOOLS
	

// text tool
function autotext_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt,context_in,mintextsize_extra)
{
    var drawntext = false;
    if (defpt > mintextsize)
    {
        // draws text within a bounding width but only if possible with font size > 1
        // if possible uses the defpt font size and centres the text in the box
        // otherwise fills the box
        context_in.textBaseline = 'middle';
        context_in.textAlign = 'left';
        if (initalic)
        {
            context_in.font = 'italic ' + (defpt).toString() + 'px '+fonttype;
        }
        else
        {
            context_in.font = (defpt).toString() + 'px '+ fonttype;
        }
        var testw = context_in.measureText(texttodisp).width;
        if (testw > textw)
        {
            if (((defpt*textw/testw) > mintextsize)&&((defpt*textw/testw) > mintextsize_extra))
            {
                if (initalic)
                {
                    context_in.font = 'italic ' + (defpt*textw/testw).toString() + 'px '+fonttype;
                }
                else
                {
                    context_in.font = (defpt*textw/testw).toString() + 'px '+fonttype;
                }
                if (dostroke)
                {
                     context_in.strokeText  (texttodisp , textx - textw/2.0,texty);
                }
                context_in.fillText  (texttodisp , textx - textw/2.0,texty);
                drawntext = true;
            }
        }
        else
        {
            if (dostroke)
            {
                context_in.strokeText  (texttodisp , textx - (testw)/2.0,texty);
            }
            context_in.fillText  (texttodisp , textx - (testw)/2.0,texty);
            drawntext = true;
        }
    }
    return drawntext;
}

function autotext2_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt,context_in,mintextsize_extra)
{
    var drawntext = false;
    // x and y are the centres
    if (defpt >mintextsize)
    {
        // draws text within a bounding width but only if possible with font size > 1
        // if possible uses the defpt font size and centres the text in the box
        // otherwise fills the box
        context_in.textBaseline = 'middle';
        context_in.textAlign = 'center';
        if (initalic)
        {
            context_in.font = 'italic ' + (defpt).toString() + 'px '+fonttype;
        }
        else
        {
            context_in.font = (defpt).toString() + 'px '+ fonttype;
        }
        
        var centerpoint = (texttodisp.length)/3;
        var splitstr = texttodisp.split(" ");
        var print1 = " ";
        var print2 = " ";
        if (splitstr.length == 1)
        {
            drawntext = autotext_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt*1.5,context_in,mintextsize_extra);
        }
        else
        {
            if (splitstr.length == 2)
            {
                print1  = (splitstr[0]);
                print2  = (splitstr[1]);
            }
            else
            {
                for (var ii = (splitstr.length -1) ; ii >= 0 ; ii--)
                {
                    if ((print2.length)>centerpoint)
                    {
                        print1  = (" " + splitstr[ii] + print1);
                    }
                    else
                    {
                        print2 = (" " + splitstr[ii] + print2);
                    }
                }
            }
            var testw = context_in.measureText(print2).width;
            if (testw < (context_in.measureText(print1).width))
            {
                testw = context_in.measureText(print1).width;
            }
            if (testw > textw)
            {
                if ((defpt*textw/testw) > mintextsize)
                {
                    
                    if(mintextsize_extra<(defpt*textw/testw))
                    {
                    
                    if (initalic)
                    {
                        context_in.font = 'italic ' + (defpt*textw/testw).toString() + 'px '+fonttype;
                    }
                    else
                    {
                        context_in.font = (defpt*textw/testw).toString() + 'px '+fonttype;
                    }
                    if (dostroke)
                    {
                        context_in.strokeText  (print1 , textx ,texty-defpt*textw/testw/1.7);
                        context_in.strokeText  (print2 , textx ,texty+defpt*textw/testw/1.7);
                        
                    }
                    context_in.fillText  (print1 , textx ,texty-defpt*textw/testw/1.7);
                    context_in.fillText  (print2 , textx ,texty+defpt*textw/testw/1.7);
                    drawntext = true;
                    }
                }
            }
            else
            {
                if(mintextsize_extra<(defpt*textw/testw))
                {
                if (dostroke)
                {
                    context_in.strokeText  (print1 , textx ,texty-defpt/1.7);
                    context_in.strokeText  (print2 , textx ,texty+defpt/1.7);
                }
                context_in.fillText  (print1 , textx ,texty-defpt/1.7);
                context_in.fillText  (print2 , textx ,texty+defpt/1.7);
                drawntext = true;
                }
            }
        }
    }
    return drawntext;
}

function autotext3_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt,context_in)
{
    var drawntext = false;
    // x and y are the centres
    if (defpt >mintextsize)
    {
        
        // draws text within a bounding width but only if possible with font size > 1
        // if possible uses the defpt font size and centres the text in the box
        // otherwise fills the box
        context_in.textBaseline = 'middle';
        context_in.textAlign = 'center';
        if (initalic)
        {
            context_in.font = 'italic ' + (defpt).toString() + 'px '+fonttype;
        }
        else
        {
            context_in.font = (defpt).toString() + 'px '+ fonttype;
        }
        
        var centerpoint = (texttodisp.length)/4;
        var splitstr = texttodisp.split(" ");
        var print1 = " ";
        var print2 = " ";
        var print3 = " ";
        
        if (splitstr.length == 1)
        {
            drawntext = autotext_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt*1.5,context_in,0);
        }
        else
        {
            if (splitstr.length == 2)
            {
                drawntext = autotext2_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt*1.2,context_in,0);
            }
            else
            {
                if (splitstr.length == 3)
                {
                    print1  = (splitstr[0]);
					print2  = (splitstr[1]);
                    print3  = (splitstr[2]);
                }
                else
                {
                    for (var ii = (splitstr.length -1) ; ii >= 0 ; ii--)
                    {
                        if ((print3.length)>=centerpoint)
                        {
                            if ((print2.length)>=centerpoint)
                            {
                                print1  = (" " + splitstr[ii] + print1);
                            }
                            else
                            {
                                print2 = (" " + splitstr[ii] + print2);
                            }
                        }
                        else
                        {
                            print3 = (" " + splitstr[ii] + print3);
                        }
                    }
                }
            }
            
            if ((print3.length >= (print1.length+print2.length))||(print1.length >= (print3.length+print2.length)))
            {
                drawntext = autotext2_context(dostroke,initalic,texttodisp,textx,texty,textw,defpt,context_in,0);
            }
            else
            {
                
                var testw = context_in.measureText(print2).width;
                if (testw < (context_in.measureText(print1).width))
                {
                    testw = context_in.measureText(print1).width;
                }
                if (testw < (context_in.measureText(print3).width))
                {
                    testw = context_in.measureText(print3).width;
                }
                if (testw > textw)
                {
                    if ((defpt*textw/testw) > mintextsize)
                    {
                        
                        if (initalic)
                        {
                            context_in.font = 'italic ' + (defpt*textw/testw).toString() + 'px '+fonttype;
                        }
                        else
                        {
                            context_in.font = (defpt*textw/testw).toString() + 'px '+fonttype;
                        }
                        if (dostroke)
                        {
                            context_in.strokeText  (print1 , textx ,texty-defpt*textw/testw*1.2);
                            context_in.strokeText  (print2 , textx ,texty);
                            context_in.strokeText  (print3 , textx ,texty+defpt*textw/testw*1.2);
                        }
                        context_in.fillText  (print1 , textx ,texty-defpt*textw/testw*1.2);
                        context_in.fillText  (print2 , textx ,texty);
                        context_in.fillText  (print3 , textx ,texty+defpt*textw/testw*1.2);
                        drawntext = true;
                    }
                }
                else
                {
                    if (dostroke)
                    {
                        context_in.strokeText  (print1 , textx ,texty-defpt*1.2);
                        context_in.strokeText  (print2 , textx ,texty);
                        context_in.strokeText  (print3 , textx ,texty+defpt*1.2);
                    }
                    context_in.fillText  (print1 , textx ,texty-defpt*1.2);
                    context_in.fillText  (print2 , textx ,texty);
                    context_in.fillText  (print3 , textx ,texty+defpt*1.2);
                    drawntext = true;
                }
            }
        }
        
    }
    return drawntext;
}


function autotext(initalic,texttodisp,textx,texty,textw,defpt)
{
    autotext_context(false,initalic,texttodisp,textx,texty,textw,defpt,context,0);
}

function autotext2(initalic,texttodisp,textx,texty,textw,defpt)
{
    autotext2_context(false,initalic,texttodisp,textx,texty,textw,defpt,context,0);
}

function autotext3(initalic,texttodisp,textx,texty,textw,defpt)
{
    autotext3_context(false,initalic,texttodisp,textx,texty,textw,defpt,context);
}



	function tutorialstart()
	{
            clear_screensaver();

        justopened = false;
        mywindow = window.open("http://www.onezoom.org/tutorial2.htm");
        popup_out();
	}
	
	// DRAWING ROUTINES


function meta2latin(indexin)
{
    var stringtoret = "";
    if ((mc_key_l["latin"])&&(metadata.leaf_meta[indexin][mc_key_l["latin"]]))
    {
    var tempstring = (metadata.leaf_meta[indexin][mc_key_l["latin"]]).split("_");
   
    stringtoret = tempstring[0]
    for (kk = 1 ; kk < tempstring.length ; kk ++)
    {
        stringtoret += (" " + tempstring[kk]);
    }
    return stringtoret;
    }
    else
    {
        return null;
    }
}



function draw2()
{
    
    soundqueue = null;
    queuestop = null;
    tap2zoom = null;
    pics_unloaded = false;
    leaf_sound_playing = false;
    if (in_about)
    {
        about_draw();
    }
    else
    {
        clearTimeout(timer4fps);
        draw3();
    }
  
}

var leaf_sound_playing = false;
var syswatch;
var touch_rem = true;
var touch_rem_time;

function touch_rem_switch()
{
    touch_rem = (!touch_rem);
    clearTimeout(touch_rem_time);
    touch_rem_time = setTimeout('touch_rem_switch()',1000*touch_rem_wait);
}

function draw3()
{
    drawControl();

    
    clearTimeout(syswatch);
    if (!in_about)
    {
        counter4pfs ++;
        fulltree.drawreg(xp,yp,220*ws);
        
        // todo - I've cut out the reanchor altogether
        // this is only because it screws up the zooming automatically from viewtype 2 - even then it's only a problem when zooming out. as a tempory fix I've just removed this altogether until later.
        
  
         
        context.clearRect(0,0,widthres,heightres);

        if (backgroundcolor)
        {
            context.fillStyle = backgroundcolor;
            context.fillRect(0,0,widthres,heightres);
        }
        fulltree.draw();
        var lastlocationtxt = locationtxt;
        var lastlocationvect = locationvect;
        locationtxt = "";
        locationvect = [];
        locationvect_index = [];
        //fulltree.mylocation();
        if (locationtxt == "")
        {
            locationtxt = lastlocationtxt;
            locationvect = lastlocationvect;
        }
        
        fulltree.draw_sp_back(false); // don't force draw
        //fulltree.draw_sp_txt(); // not used any more
        
        if (pics_unloaded)
        {
            syswatch = setTimeout('draw3()',100);
            // try again much sooner if we are waiting for pics to load
        }
        else
        {
            if (((fulltree.playing_sound)&&nowplaying&&((thisSound.duration&&(thisSound.currentTime<thisSound.duration))||justplayednew)))             {
                syswatch = setTimeout('draw3()',250);
                // try again much sooner if we are waiting for pics to load
            }
        }
    }
}



var credits_roll_speed = 2.3;
var about_height = 12;

var in_about = false;
var about_upto = null;
var about_target = null;
var about_anim;
var introlock = false;
var creditsText_pos = [];

function AboutOZ()
{
    if (!nowloading)
    {
        
       // document.getElementById("KBCanvas").style.display = 'none';
        
        clear_screensaver();
        creditsText_pos.length = creditsText.length;
        var offset_about = 0;
        for (i = 0 ; i < creditsText.length ; i ++)
        {
            creditsText_pos[i] = offset_about;
            offset_about += about_height*creditsText[i][0]*1.5;
        }
        
        
        about_target = 0;
        for (i = 0 ; i < creditsText.length ; i ++)
        {
            about_target += creditsText[i][0];
        }
        about_target = about_target * about_height * 1.5;
        
        if (in_about)
        {
            in_about = false;
            introlock = false;
            clearTimeout(about_anim);
            draw2();
        }
        else
        {
            about_upto = myCanvas.height*0.25;
            in_about = true;
            introlock = true;
            about_draw_anim();
        }
    }
};

function about_draw_anim()
{
    if (about_upto >= (heightres*0.25-about_target))
    {
        draw2();
        about_upto -= credits_roll_speed;
        about_anim = setTimeout('about_draw_anim()',33);
    }
    else
    {
        clearTimeout(about_anim);
        in_about = false;
        introlock = false;
        draw2();
    }
}

function about_draw()
{
    context.fillStyle = backgroundcolor;
    context.fillRect(0,0,widthres,heightres);
    
    context.fillStyle = 'rgb(0,0,0)';
    for (i = 0 ; i < creditsText.length ; i ++)
    {
        if (creditsText[i][1])
        {
            autotext(false, creditsText[i][1] , widthres / 2, creditsText_pos[i] + about_upto , widthres *0.8 , about_height*creditsText[i][0]);
        }
    }
    
}
	
	// FRACTAL FORM ALGORITHMS AND PRECALCULATIONS
	
	// variables that were used for all fractal forms
	var partc = 0.4;
	var partcint = 0.165;
	var partl1 = 0.55; // size of line
	var partl2 = 0.1;
	var ratio1 = 0.77; // size of larger branch
	var ratio2 = 0.47; // size of smaller branch
	var Tsize = 1.1;
	var Twidth = 1;
	var Psize = 0.70
	var leafmult = 3.2;
	var posmult = leafmult -2;
	
	midnode.prototype.precalc = function(x,y,r,angle)
	{
		this.arca = angle;
		var tempsinpre = Math.sin(angle);
		var tempcospre = Math.cos(angle);
		var tempsin90pre = Math.sin(angle + Math.PI/2.0);
		var tempcos90pre = Math.cos(angle + Math.PI/2.0);
		var atanpre;
		var atanpowpre;
		
		if (this.child1)
		{
			atanpre = Math.atan2((this.child1).richness_val,(this.child2).richness_val);
			atanpowpre = Math.atan2(Math.pow((this.child1).richness_val,0.5),Math.pow(((this.child2).richness_val),0.5));
		}
		
		var thisangleleft = 0.46;
		var thisangleright = 0.22;
		var thisratio1 = 1/1.3;;
		var thisratio2 = 1/2.25;
		
		var tempsin2 = Math.sin(angle + Math.PI*thisangleright);
		var tempcos2 = Math.cos(angle + Math.PI*thisangleright);
		var tempsin3 = Math.sin(angle - Math.PI*thisangleleft);
		var tempcos3 = Math.cos(angle - Math.PI*thisangleleft);
		
		if (this.child1)
		{
			
			if ((this.child1.richness_val) >= (this.child2.richness_val))
			{
				
				this.nextr1 = thisratio1; // r (scale) reference for child 1
				this.nextr2 = thisratio2; // r (scale) reference for child 2
				
				(this.child1).bezsx = -(0.3)*(tempcospre)/thisratio1;
				(this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio1;
				(this.child1).bezex = tempcos2;
				(this.child1).bezey = tempsin2;
				(this.child1).bezc1x = -0.3*(tempcospre)/thisratio1;
				(this.child1).bezc1y = -0.3*(tempsinpre)/thisratio1;
				(this.child1).bezc2x = 0.15*(tempcospre)/thisratio1;
				(this.child1).bezc2y = 0.15*(tempsinpre)/thisratio1;
				(this.child1).bezr = partl1;
				
				(this.child2).bezsx = -(0.3)*(tempcospre)/thisratio2;
				(this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio2;
				(this.child2).bezex = tempcos3;
				(this.child2).bezey = tempsin3;
				(this.child2).bezc1x = 0.1*(tempcospre)/thisratio2;
				(this.child2).bezc1y = 0.1*(tempsinpre)/thisratio2;
				(this.child2).bezc2x = 0.9*tempcos3;
				(this.child2).bezc2y = 0.9*tempsin3;
				(this.child2).bezr = partl1;
				
				this.nextx1 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty1 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
				this.nextx2 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty2 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
			}
			else
			{
				this.nextr2 = thisratio1; // r (scale) reference for child 1
				this.nextr1 = thisratio2; // r (scale) reference for child 2
				
				(this.child2).bezsx = -(0.3)*(tempcospre)/thisratio1;
				(this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio1;
				(this.child2).bezex = tempcos2;
				(this.child2).bezey = tempsin2;
				(this.child2).bezc1x = -0.2*(tempcospre)/thisratio1;
				(this.child2).bezc1y = -0.2*(tempsinpre)/thisratio1;
				(this.child2).bezc2x = 0.15*(tempcospre)/thisratio1;
				(this.child2).bezc2y = 0.15*(tempsinpre)/thisratio1;
				(this.child2).bezr = partl1;
				
				(this.child1).bezsx = -(0.3)*(tempcospre)/thisratio2;
				(this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio2;
				(this.child1).bezex = tempcos3;
				(this.child1).bezey = tempsin3;
				(this.child1).bezc1x = 0.1*(tempcospre)/thisratio2;
				(this.child1).bezc1y = 0.1*(tempsinpre)/thisratio2;
				(this.child1).bezc2x = 0.9*tempcos3;
				(this.child1).bezc2y = 0.9*tempsin3;
				(this.child1).bezr = partl1;
				
				this.nextx2 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty2 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
				this.nextx1 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty1 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
			}
			
			this.arcx = this.bezex;
			this.arcy = this.bezey;
			this.arcr = (this.bezr)/2;
			
			if (this.child1)
			{
				if ((this.child1.richness_val) >= (this.child2.richness_val))
				{
					this.child1.precalc (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio1,angle + Math.PI*thisangleright);
					this.child2.precalc (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio2,angle - Math.PI*thisangleleft);
				}
				else
				{
					this.child2.precalc (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio1,angle + Math.PI*thisangleright);
					this.child1.precalc (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio2,angle - Math.PI*thisangleleft);
				}
			}
		}
		else
		{
			this.arcx = this.bezex+posmult*(tempcospre);
			this.arcy = this.bezey+posmult*(tempsinpre);
			this.arcr = leafmult*partc;
		}
		
	}
	
	
	midnode.prototype.precalc2 = function(x,y,r,angle)
	{
		this.arca = angle;
		var tempsinpre = Math.sin(angle);
		var tempcospre = Math.cos(angle);
		var tempsin90pre = Math.sin(angle + Math.PI/2.0);
		var tempcos90pre = Math.cos(angle + Math.PI/2.0);
		var atanpre;
		var atanpowpre;
		
		if (this.child1)
		{
			atanpre = Math.atan2((this.child1).richness_val,(this.child2).richness_val);
			atanpowpre = Math.atan2(Math.pow((this.child1).richness_val,0.5),Math.pow(((this.child2).richness_val),0.5));
		}
		
		var thisangleleft = 0.5;
		var thisangleright = 0.2;
		var thisratio1 = ratio1;
		var thisratio2 = ratio2;
		var thislinewidth1;
		var thislinewidth2;
		if ((this.richness_val > 1)&&((this.child1)&&(this.child2)))
		{
			if ((this.child1.richness_val) >= (this.child2.richness_val))
			{
				thisangleright = 0.45-(atanpre)/Math.PI/0.5*0.449;
				thisangleleft = 0.45-(0.5-(atanpre)/Math.PI)/0.5*0.449;
				thisratio1 = 0.3+(atanpowpre)/Math.PI/0.5*0.5;
				thisratio2 = 0.3+(0.5-(atanpowpre)/Math.PI)/0.5*0.5;
			}
			else
			{
				thisangleleft = 0.45-(atanpre)/Math.PI/0.5*0.449;
				thisangleright = 0.45-(0.5-(atanpre)/Math.PI)/0.5*0.449;
				thisratio2 = 0.3+(atanpowpre)/Math.PI/0.5*0.5;
				thisratio1 = 0.3+(0.5-(atanpowpre)/Math.PI)/0.5*0.5;
			}
		}
		
		if (this.child1)
		{
			thislinewidth1 = (this.child1.richness_val)/((this.child1.richness_val)+(this.child2.richness_val));
			thislinewidth2 = (this.child2.richness_val)/((this.child1.richness_val)+(this.child2.richness_val));
		}
		
		var tempsin2 = Math.sin(angle + Math.PI*thisangleright);
		var tempcos2 = Math.cos(angle + Math.PI*thisangleright);
		var tempsin3 = Math.sin(angle - Math.PI*thisangleleft);
		var tempcos3 = Math.cos(angle - Math.PI*thisangleleft);
		
		if (this.child1)
		{
			if ((this.child1.richness_val) >= (this.child2.richness_val))
			{
				this.nextr1 = thisratio1; // r (scale) reference for child 1
				this.nextr2 = thisratio2; // r (scale) reference for child 2
				
				(this.child1).bezsx = -(0.3)*(tempcospre)/thisratio1;
				(this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio1;
				(this.child1).bezex = tempcos2;
				(this.child1).bezey = tempsin2;
				(this.child1).bezc1x = 0;
				(this.child1).bezc1y = 0;
				(this.child1).bezc2x = 0.9*tempcos2;
				(this.child1).bezc2y = 0.9*tempsin2;
				(this.child1).bezr = partl1;
				
				(this.child2).bezsx = -(0.3)*(tempcospre)/thisratio2;
				(this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio2;
				(this.child2).bezex = tempcos3;
				(this.child2).bezey = tempsin3;
				(this.child2).bezc1x = 0;
				(this.child2).bezc1y = 0;
				(this.child2).bezc2x = 0.3*tempcos3;
				(this.child2).bezc2y = 0.3*tempsin3;
				(this.child2).bezr = partl1;
				
				this.nextx1 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty1 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
				this.nextx2 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty2 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
			}
			else
			{
				this.nextr2 = thisratio1; // r (scale) reference for child 1
				this.nextr1 = thisratio2; // r (scale) reference for child 2
				
				(this.child2).bezsx = -(0.3)*(tempcospre)/thisratio1;
				(this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio1;
				(this.child2).bezex = tempcos2;
				(this.child2).bezey = tempsin2;
				(this.child2).bezc1x = 0;
				(this.child2).bezc1y = 0;
				(this.child2).bezc2x = 0.9*tempcos2;
				(this.child2).bezc2y = 0.9*tempsin2;
				(this.child2).bezr = partl1;
				
				(this.child1).bezsx = -(0.3)*(tempcospre)/thisratio2;
				(this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio2;
				(this.child1).bezex = tempcos3;
				(this.child1).bezey = tempsin3;
				(this.child1).bezc1x = 0;
				(this.child1).bezc1y = 0;
				(this.child1).bezc2x = 0.9*tempcos3;
				(this.child1).bezc2y = 0.9*tempsin3;
				(this.child1).bezr = partl1;
				
				this.nextx2 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty2 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
				this.nextx1 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty1 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
			}
			
			this.arcx = this.bezex;
			this.arcy = this.bezey;
			this.arcr = (this.bezr)/2;
			
			if (this.child1)
			{
				if ((this.child1.richness_val) >= (this.child2.richness_val))
				{
					this.child1.precalc2 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio1,angle + Math.PI*thisangleright);
					this.child2.precalc2 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio2,angle - Math.PI*thisangleleft);
				}
				else
				{
					this.child2.precalc2 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio1,angle + Math.PI*thisangleright);
					this.child1.precalc2 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio2,angle - Math.PI*thisangleleft);
				}
			}
		}
		else
		{
			this.arcx = this.bezex+posmult*(tempcospre);
			this.arcy = this.bezey+posmult*(tempsinpre);
			this.arcr = leafmult*partc;
		}
		
	}

midnode.prototype.precalc4 = function(x,y,r,angle)
{
    this.arca = angle;
    var tempsinpre = Math.sin(angle);
    var tempcospre = Math.cos(angle);
    var tempsin90pre = Math.sin(angle + Math.PI/2.0);
    var tempcos90pre = Math.cos(angle + Math.PI/2.0);
    var atanpre;
    var atanpowpre;
    
    if (this.child1)
    {
        atanpre = Math.atan2((this.child1).richness_val,(this.child2).richness_val);
        atanpowpre = Math.atan2(Math.pow((this.child1).richness_val,0.5),Math.pow(((this.child2).richness_val),0.5));
    }
    
    var thisangleleft = 0.33;
    var thisangleright = 0.33;
    var thisratio1 = 0.61;
    var thisratio2 = 0.61;
    
    var tempsin2 = Math.sin(angle + Math.PI*thisangleright);
    var tempcos2 = Math.cos(angle + Math.PI*thisangleright);
    var tempsin3 = Math.sin(angle - Math.PI*thisangleleft);
    var tempcos3 = Math.cos(angle - Math.PI*thisangleleft);
    
    if (this.child1)
    {
        
        if ((this.child1.richness_val) >= (this.child2.richness_val))
        {
            
            this.nextr1 = thisratio1; // r (scale) reference for child 1
            this.nextr2 = thisratio2; // r (scale) reference for child 2
            
            (this.child1).bezsx = -(0.3)*(tempcospre)/thisratio1;
            (this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio1;
            (this.child1).bezex = tempcos2;
            (this.child1).bezey = tempsin2;
            (this.child1).bezc1x = -0.3*(tempcospre)/thisratio1;
            (this.child1).bezc1y = -0.3*(tempsinpre)/thisratio1;
            (this.child1).bezc2x = 0.15*(tempcospre)/thisratio1;
            (this.child1).bezc2y = 0.15*(tempsinpre)/thisratio1;
            (this.child1).bezr = partl1;
            
            (this.child2).bezsx = -(0.3)*(tempcospre)/thisratio2;
            (this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio2;
            (this.child2).bezex = tempcos3;
            (this.child2).bezey = tempsin3;
            (this.child2).bezc1x = 0.1*(tempcospre)/thisratio2;
            (this.child2).bezc1y = 0.1*(tempsinpre)/thisratio2;
            (this.child2).bezc2x = 0.9*tempcos3;
            (this.child2).bezc2y = 0.9*tempsin3;
            (this.child2).bezr = partl1;
            
            this.nextx1 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
            this.nexty1 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
            this.nextx2 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
            this.nexty2 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
        }
        else
        {
            this.nextr2 = thisratio1; // r (scale) reference for child 1
            this.nextr1 = thisratio2; // r (scale) reference for child 2
            
            (this.child2).bezsx = -(0.3)*(tempcospre)/thisratio1;
            (this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio1;
            (this.child2).bezex = tempcos2;
            (this.child2).bezey = tempsin2;
            (this.child2).bezc1x = -0.2*(tempcospre)/thisratio1;
            (this.child2).bezc1y = -0.2*(tempsinpre)/thisratio1;
            (this.child2).bezc2x = 0.15*(tempcospre)/thisratio1;
            (this.child2).bezc2y = 0.15*(tempsinpre)/thisratio1;
            (this.child2).bezr = partl1;
            
            (this.child1).bezsx = -(0.3)*(tempcospre)/thisratio2;
            (this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio2;
            (this.child1).bezex = tempcos3;
            (this.child1).bezey = tempsin3;
            (this.child1).bezc1x = 0.1*(tempcospre)/thisratio2;
            (this.child1).bezc1y = 0.1*(tempsinpre)/thisratio2;
            (this.child1).bezc2x = 0.9*tempcos3;
            (this.child1).bezc2y = 0.9*tempsin3;
            (this.child1).bezr = partl1;
            
            this.nextx2 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
            this.nexty2 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
            this.nextx1 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
            this.nexty1 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
        }
        
        this.arcx = this.bezex;
        this.arcy = this.bezey;
        this.arcr = (this.bezr)/2;
        
        if (this.child1)
        {
            if ((this.child1.richness_val) >= (this.child2.richness_val))
            {
                this.child1.precalc4 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio1,angle + Math.PI*thisangleright);
                this.child2.precalc4 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio2,angle - Math.PI*thisangleleft);
            }
            else
            {
                this.child2.precalc4 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio1,angle + Math.PI*thisangleright);
                this.child1.precalc4 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio2,angle - Math.PI*thisangleleft);
            }
        }
    }
    else
    {
        this.arcx = this.bezex+posmult*(tempcospre);
        this.arcy = this.bezey+posmult*(tempsinpre);
        this.arcr = leafmult*partc;
    }

}


	
	midnode.prototype.precalc3 = function(x,y,r,angle,dir)
	{
		this.arca = angle;
		var tempsinpre = Math.sin(angle);
		var tempcospre = Math.cos(angle);
		var tempsin90pre = Math.sin(angle + Math.PI/2.0);
		var tempcos90pre = Math.cos(angle + Math.PI/2.0);
		var atanpre;
		var atanpowpre;
		
		var thisangleleft = 0.2;
		var thisangleright = 0.1;
		var thisratio1 = 0.85;
		var thisratio2 = 0.42;
		var child1right = false;
		
		if (!dir)
		{
			var thisangleleft = 0.1;
			var thisangleright = 0.2;
			var thisratio1 = 0.42;
			var thisratio2 = 0.85;
			if (this.child1)
			{
				if ((this.child1.richness_val) < (this.child2.richness_val))
				{
					child1right = true;
				}
			}
		}
		else
		{
			if (this.child1)
			{
				if ((this.child1.richness_val) >= (this.child2.richness_val))
				{
					child1right = true;
				}
			}
		}
		
		var partl1a = partl1;
		var partl1b = partl1;
		var tempsin2 = Math.sin(angle + Math.PI*thisangleright);
		var tempcos2 = Math.cos(angle + Math.PI*thisangleright);
		var tempsin3 = Math.sin(angle - Math.PI*thisangleleft);
		var tempcos3 = Math.cos(angle - Math.PI*thisangleleft);
		
		if (this.child1)
		{
			
			if (child1right)
			{
				
				this.nextr1 = thisratio1; // r (scale) reference for child 1
				this.nextr2 = thisratio2; // r (scale) reference for child 2
				
				(this.child1).bezsx = -(0.3)*(tempcospre)/thisratio1;
				(this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio1;
				(this.child1).bezex = tempcos2;
				(this.child1).bezey = tempsin2;
				(this.child1).bezc1x = -0.3*(tempcospre)/thisratio1;
				(this.child1).bezc1y = -0.3*(tempsinpre)/thisratio1;
				(this.child1).bezc2x = 0.15*(tempcospre)/thisratio1;
				(this.child1).bezc2y = 0.15*(tempsinpre)/thisratio1;
				(this.child1).bezr = partl1;
				
				(this.child2).bezsx = -(0.3)*(tempcospre)/thisratio2;
				(this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio2;
				(this.child2).bezex = tempcos3;
				(this.child2).bezey = tempsin3;
				(this.child2).bezc1x = 0.1*(tempcospre)/thisratio2;
				(this.child2).bezc1y = 0.1*(tempsinpre)/thisratio2;
				(this.child2).bezc2x = 0.9*tempcos3;
				(this.child2).bezc2y = 0.9*tempsin3;
				(this.child2).bezr = partl1;
				
				this.nextx1 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1a*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty1 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1a*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
				this.nextx2 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1b*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty2 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1b*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
			}
			else
			{
				this.nextr2 = thisratio1; // r (scale) reference for child 1
				this.nextr1 = thisratio2; // r (scale) reference for child 2
				
				(this.child2).bezsx = -(0.3)*(tempcospre)/thisratio1;
				(this.child2).bezsy = -(0.3)*(tempsinpre)/thisratio1;
				(this.child2).bezex = tempcos2;
				(this.child2).bezey = tempsin2;
				(this.child2).bezc1x = -0.2*(tempcospre)/thisratio1;
				(this.child2).bezc1y = -0.2*(tempsinpre)/thisratio1;
				(this.child2).bezc2x = 0.15*(tempcospre)/thisratio1;
				(this.child2).bezc2y = 0.15*(tempsinpre)/thisratio1;
				(this.child2).bezr = partl1;
				
				(this.child1).bezsx = -(0.3)*(tempcospre)/thisratio2;
				(this.child1).bezsy = -(0.3)*(tempsinpre)/thisratio2;
				(this.child1).bezex = tempcos3;
				(this.child1).bezey = tempsin3;
				(this.child1).bezc1x = 0.1*(tempcospre)/thisratio2;
				(this.child1).bezc1y = 0.1*(tempsinpre)/thisratio2;
				(this.child1).bezc2x = 0.9*tempcos3;
				(this.child1).bezc2y = 0.9*tempsin3;
				(this.child1).bezr = partl1;
				
				this.nextx2 = (1.3*Math.cos(angle))+(((this.bezr)-(partl1a*thisratio1))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty2 = (1.3*Math.sin(angle))+(((this.bezr)-(partl1a*thisratio1))/2.0)*tempsin90pre; // y reference point for both children
				this.nextx1 = (1.3*Math.cos(angle))-(((this.bezr)-(partl1b*thisratio2))/2.0)*tempcos90pre; // x refernece point for both children
				this.nexty1 = (1.3*Math.sin(angle))-(((this.bezr)-(partl1b*thisratio2))/2.0)*tempsin90pre; // y reference point for both children
			}
			
			this.arcx = this.bezex;
			this.arcy = this.bezey;
			this.arcr = (this.bezr)/2;
			
			if (this.child1)
			{
				if (child1right)
				{
					this.child1.precalc3 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio1,angle + Math.PI*thisangleright,!dir);
					this.child2.precalc3 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio2,angle - Math.PI*thisangleleft,!dir);
				}
				else
				{
					this.child2.precalc3 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*thisratio1,angle + Math.PI*thisangleright,!dir);
					this.child1.precalc3 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*thisratio2,angle - Math.PI*thisangleleft,!dir);
				}
			}
		}
		else
		{
			this.arcx = this.bezex+posmult*(tempcospre);
			this.arcy = this.bezey+posmult*(tempsinpre);
			this.arcr = leafmult*partc;
		}
	}



	function update_form()
	{
		// updates the view and all variables to match the current viewtype
		//fulltree.clearroute();
		fulltree.drawreg(xp,yp,220*ws);
		fulltree.move2();
		
		fulltree.bezsx = 0; // start x position
		fulltree.bezsy = 0; // start y position
		fulltree.bezex = 0; // end x position
		fulltree.bezey = -1; // end y position
		fulltree.bezc1x = 0; // control point 1 x position
		fulltree.bezc1y = -0.05; // control point 2 y position
		fulltree.bezc2x = 0; // control point 2 x position
		fulltree.bezc2y = -0.95; // control point 2 y position
		fulltree.bezr = partl1; // line width
		
		if (viewtype == 2)
		{
			fulltree.precalc2(xp,yp,220*ws,Math.PI*3/2);
		}
		else
		{
			if (viewtype == 3)
			{
				fulltree.bezsx = -Math.sin(Math.PI*0.05); // start x position
				fulltree.bezsy = 0; // start y position
				fulltree.bezex = -Math.sin(Math.PI*0.05); // end x position
				fulltree.bezey = -Math.cos(Math.PI*0.05); // end y position
				fulltree.bezc1x = -Math.sin(Math.PI*0.05); // control point 1 x position
				fulltree.bezc1y = -0.05; // control point 2 y position
				fulltree.bezc2x = -Math.sin(Math.PI*0.05); // control point 2 x position
				fulltree.bezc2y = -0.95; // control point 2 y position
				fulltree.bezr = partl1; // line width
				fulltree.precalc3(xp,yp,220*ws,Math.PI*(3/2-0.05),true,true);
			}
			else
			{
                if (viewtype == 4)
                {
                    fulltree.precalc4(xp,yp,220*ws,Math.PI*3/2);
                }
                else
                {
                    fulltree.precalc(xp,yp,220*ws,Math.PI*3/2);
                    
                }
			}
		}
		fulltree.calchorizon();
		fulltree.graphref = true;
		fulltree.reref();
		//fulltree.clearsearch();
		fulltree.deanchor();
		fulltree.reref();
		fulltree.move3(40,widthres-40,65,heightres-40);
	}
	
	// NODE OBJECT BASIC CALCULATIONS
	
	midnode.prototype.richness_calc = function()
	{
		if (this.child1)
		{
			this.richness_val =  (((this.child1).richness_calc())+((this.child2).richness_calc()));
		}
		else
		{
            if((mc_key_l["richness"])&&(metadata.leaf_meta[this.metacode][mc_key_l["richness"]]))
            {
				this.richness_val = parseInt(metadata.leaf_meta[this.metacode][mc_key_l["richness"]]);
            }
            else
            {
                this.richness_val = 1;
            }
		}
		return (this.richness_val);
	}
	

	midnode.prototype.name_calc = function()
	{
		if (this.child1)
		{
			if (((this.child1).name_calc())==((this.child2).name_calc()))
			{
				this.name2 = ((this.child1).name2);
			}
		}
		return (this.name2);
	}
	
	midnode.prototype.phylogeneticdiv_calc = function()
	{
		this.phylogenetic_diversity = 0;
        //this.evoluni -= this.lengthbr;
		if (this.child1)
		{
            //(this.child2).evoluni = this.lengthbr;
            //(this.child1).evoluni = this.lengthbr;
			this.phylogenetic_diversity += (this.child2).phylogeneticdiv_calc();
			this.phylogenetic_diversity += (this.child1).phylogeneticdiv_calc();
		}
		return (this.phylogenetic_diversity + this.lengthbr);
	}
	
	midnode.prototype.age_calc = function()
	{
        this.evoluni = this.lengthbr;
		if ((this.lengthbr == 0)&&(this.child1))
		{
			this.npolyt = false;
		}
		else
		{
			this.npolyt = true;
		}
		var length_temp;
		length_temp = (this.lengthbr);
		if (this.child1)
		{
			(this.lengthbr) = (this.child2).age_calc();
			(this.lengthbr) = (this.child1).age_calc();
			return ((length_temp)+(this.lengthbr));
		}
		else
		{
			(this.lengthbr) = 0;
			return (length_temp);
		}	
	}
	
midnode.prototype.inlabel_calc = function(testname)
{
    
    if (this.child1)
    {
        if ((this.name2)&&(this.name2 != testname))
        {
            this.name1 = this.name2;
            this.child1.inlabel_calc(this.name1);
            this.child2.inlabel_calc(this.name1);
        }
        else
        {
            this.name2 = null;
            this.child1.inlabel_calc(testname);
            this.child2.inlabel_calc(testname);
        }
        
    }
    
    
}

midnode.prototype.spsort = function(frequency_in,current_c,current_l)
{
    // the first number is the frequency of SP the second is the current count
    
    // every other node has a pic unless next to a name
    if (this.child1)
    {

        //*
        if(this.cname)
        {
            this.drawsignposts_common = true;
            current_c = 1;
        }
        else
        {
            if (((current_c >= frequency_in)))//&&(!((this.child1).cname)))&&(!((this.child2).cname)))
            {
                this.drawsignposts_common = true;
                current_c = 1;
            }
            else
            {
                this.drawsignposts_common = false;
                current_c = current_c +1;
            }
        }
        
        if (this.name1)
        {
            this.drawsignposts_latin = true;
            current_l = 1;
        }
        else
        {
            if (((current_l >= frequency_in)))//&&(!((this.child1).name1)))&&(!((this.child2).name1)))
            {
                // check that neither child has an interior node label
                this.drawsignposts_latin = true;
                current_l = 1;
            }
            else
            {
                this.drawsignposts_latin = false;
                current_l = current_l +1;
            }
        }
         //*/
        
        //this.drawsignposts_common = true;
        //this.drawsignposts_latin = true;
        
        
        this.child1.spsort(frequency_in,current_c,current_l);
        this.child2.spsort(frequency_in,current_c,current_l);
    }
    else
    {
        this.drawsignposts_common = false;
        this.drawsignposts_latin = false;
    }
    
    
    
}



midnode.prototype.pic_calc = function()
{
    if (this.child1)
    {
        this.child1.pic_calc();
        this.child2.pic_calc();
        this.num_pics = (this.child1.num_pics + this.child2.num_pics);
    }
    else
    {
        if (this.pic_file)
        {
            this.num_pics = 1;
        }
        else
        {
            this.num_pics = 0;
        }
    }
}




	// DEEP ZOOM REREFERENCING METHODS (COMPLEX)

	// returns the product of all scaling factors so as to find out the total scaling difference
	midnode.prototype.mult = function ()
	{
		var multreturn;
		if (this.child1)
		{
			if (this.child1.graphref)
			{
				multreturn = (this.nextr1)*(this.child1.mult());
			}
			else
			{
				if (this.child2.graphref)
				{
					multreturn = (this.nextr2)*(this.child2.mult());
				}
				else
				{
					multreturn = 1;
				}
			}
		}
		else
		{
			multreturn = 1;
		}
		return multreturn;
	}
	
	midnode.prototype.reref = function()
	{
		if (this.onroute)
		{
			this.graphref = true;
			if (this.child1)
			{
				if (this.child1.onroute)
				{
					this.child1.reref();
				}
				else
				{
					this.child1.graphref = false;
				}
				if (this.child2.onroute)
				{
					this.child2.reref();
				}
				else
				{
					this.child2.graphref = false;
				}	
			}
		}
	}
	
	midnode.prototype.calchorizon = function()
	{
		// find the bounding box for the bezier curve
		this.hxmax = this.bezsx;
		this.hxmin = this.bezsx;
		this.hymax = this.bezsy;
		this.hymin = this.bezsy;
		if (this.hxmax < this.bezc1x) { this.hxmax = this.bezc1x; }
		if (this.hxmin > this.bezc1x) { this.hxmin = this.bezc1x; }
		if (this.hymax < this.bezc1y) { this.hymax = this.bezc1y; }
		if (this.hymin > this.bezc1y) { this.hymin = this.bezc1y; }
		if (this.hxmax < this.bezc2x) { this.hxmax = this.bezc2x; }
		if (this.hxmin > this.bezc2x) { this.hxmin = this.bezc2x; }
		if (this.hymax < this.bezc2y) { this.hymax = this.bezc2y; }
		if (this.hymin > this.bezc2y) { this.hymin = this.bezc2y; }
		if (this.hxmax < this.bezex) { this.hxmax = this.bezex; }
		if (this.hxmin > this.bezex) { this.hxmin = this.bezex; }
		if (this.hymax < this.bezey) { this.hymax = this.bezey; }
		if (this.hymin > this.bezey) { this.hymin = this.bezey; }
		this.hxmax += this.bezr/2;
		this.hxmin -= this.bezr/2;
		this.hymax += this.bezr/2;
		this.hymin -= this.bezr/2;
		
		//expand the bounding box to include the arc if necessary
		if (this.hxmax < (this.arcx+this.arcr)) { this.hxmax = (this.arcx+this.arcr); }
		if (this.hxmin > (this.arcx-this.arcr)) { this.hxmin = (this.arcx-this.arcr); }
		if (this.hymax < (this.arcy+this.arcr)) { this.hymax = (this.arcy+this.arcr); }
		if (this.hymin > (this.arcy-this.arcr)) { this.hymin = (this.arcy-this.arcr); }
		// set the graphics bounding box before the horizon is expanded for children
		this.gxmax = this.hxmax;
		this.gxmin = this.hxmin;
		this.gymax = this.hymax;
		this.gymin = this.hymin;
		
		// check for children
		if(this.child1)
		{
			// if children calculate their horizons
			this.child1.calchorizon ();
			this.child2.calchorizon ();
			// and expand the bounding box if necessary
			if (this.hxmax < (this.nextx1+this.nextr1*this.child1.hxmax)) { this.hxmax = (this.nextx1+this.nextr1*this.child1.hxmax); }
			if (this.hxmin > (this.nextx1+this.nextr1*this.child1.hxmin)) { this.hxmin = (this.nextx1+this.nextr1*this.child1.hxmin); }
			if (this.hymax < (this.nexty1+this.nextr1*this.child1.hymax)) { this.hymax = (this.nexty1+this.nextr1*this.child1.hymax); }
			if (this.hymin > (this.nexty1+this.nextr1*this.child1.hymin)) { this.hymin = (this.nexty1+this.nextr1*this.child1.hymin); }
			if (this.hxmax < (this.nextx2+this.nextr2*this.child2.hxmax)) { this.hxmax = (this.nextx2+this.nextr2*this.child2.hxmax); }
			if (this.hxmin > (this.nextx2+this.nextr2*this.child2.hxmin)) { this.hxmin = (this.nextx2+this.nextr2*this.child2.hxmin); }
			if (this.hymax < (this.nexty2+this.nextr2*this.child2.hymax)) { this.hymax = (this.nexty2+this.nextr2*this.child2.hymax); }
			if (this.hymin > (this.nexty2+this.nextr2*this.child2.hymin)) { this.hymin = (this.nexty2+this.nextr2*this.child2.hymin); }
		}
	}
		
	midnode.prototype.reanchor = function ()
	{
		if (this.dvar)
		{
			this.graphref = true;
			if (((this.gvar)||(!(this.child1)))||((this.rvar/220>0.01)&&(this.rvar/220<100)))
			{
				// reanchor here
				xp = this.xvar;
				yp = this.yvar;
				ws = this.rvar/220;
				if (this.child1)
				{
					this.child2.deanchor();
					this.child1.deanchor();
				}
			}
			else
			{
				// reanchor somewhere down the line
				if (this.child1.dvar)
				{
					this.child1.reanchor();
					this.child2.deanchor();
					
				}
				else
				{
					this.child2.reanchor();
					this.child1.deanchor();
				}
			}
		}
		// else not possible to reanchor
	}
	
	midnode.prototype.deanchor = function ()
	{
		if (this.graphref)
		{
			if (this.child1)
			{
				this.child1.deanchor();
				this.child2.deanchor();
			}
			this.graphref = false;
           
		}
	}

midnode.prototype.clear_leafpic_drawn = function ()
{
    this.leafpic_drawn = false;
    if (this.child1)
    {
        this.child1.clear_leafpic_drawn();
        this.child2.clear_leafpic_drawn();
    }
}


	midnode.prototype.drawreg = function(x,y,r)
	{
		// we assume that only those for whom graphref is true will call this routine
		if (this.child1)
		{
			// we are not a leaf and we are referencing - check children
			if (this.child1.graphref)
			{
				// child 1 leads to (or is) the referencing node
				this.child1.drawreg(x,y,r);
				this.rvar = this.child1.rvar/this.nextr1;
				this.xvar = this.child1.xvar-this.rvar*this.nextx1;
				this.yvar = this.child1.yvar-this.rvar*this.nexty1;
				this.dvar = false;
				this.child2.gvar = false;
				this.child2.dvar = false; 
				
				if(((!((((this.xvar+(this.rvar*this.hxmax))<0)||((this.xvar+(this.rvar*this.hxmin))>widthres))||(((this.yvar+(this.rvar*this.hymax))<0)||((this.yvar+(this.rvar*this.hymin))>heightres))))))
				{
					if (this.rvar > threshold)
					{
						
						this.child2.drawreg2 (this.xvar+((this.rvar)*(this.nextx2)),this.yvar+(this.rvar)*(this.nexty2),this.rvar*this.nextr2);
					}
					
					if(((((this.xvar+(this.rvar*this.gxmax))<0)||((this.xvar+(this.rvar*this.gxmin))>widthres))||(((this.yvar+(this.rvar*this.gymax))<0)||((this.yvar+(this.rvar*this.gymin))>heightres))))
					{
						this.gvar = false;
					}
					else
					{
						this.gvar = true;
						this.dvar = true;
					}
					if (this.rvar <= threshold)
					{
						this.child1.gvar = false;
						this.child2.gvar = false;
						this.child1.dvar = false;
						this.child2.dvar = false;
					}
				}
				else
				{
					this.gvar = false;
				}
				
				if ((this.child1.dvar)||(this.child2.dvar))
				{
					this.dvar = true;
				}
				
			}
			else
			{
				if (this.child2.graphref)
				{
					// child 2 leads to (or is) the referencing node
					this.child2.drawreg(x,y,r);
					this.rvar = this.child2.rvar/this.nextr2;
					this.xvar = this.child2.xvar-this.rvar*this.nextx2;
					this.yvar = this.child2.yvar-this.rvar*this.nexty2;
					this.dvar = false;
					this.child1.gvar = false;
					this.child1.dvar = false; 
					
					if(((!((((this.xvar+(this.rvar*this.hxmax))<0)||((this.xvar+(this.rvar*this.hxmin))>widthres))||(((this.yvar+(this.rvar*this.hymax))<0)||((this.yvar+(this.rvar*this.hymin))>heightres))))))
					{
						if (this.rvar > threshold)
						{
							this.child1.drawreg2 (this.xvar+((this.rvar)*(this.nextx1)),this.yvar+(this.rvar)*(this.nexty1),this.rvar*this.nextr1);	
						}
						
						if(((((this.xvar+(this.rvar*this.gxmax))<0)||((this.xvar+(this.rvar*this.gxmin))>widthres))||(((this.yvar+(this.rvar*this.gymax))<0)||((this.yvar+(this.rvar*this.gymin))>heightres))))
						{
							this.gvar = false;
						}
						else
						{
							this.gvar = true;
							
							this.dvar = true;
						}
						
						if (this.rvar <= threshold)
						{
							this.child1.gvar = false;
							this.child2.gvar = false;
							this.child1.dvar = false;
							this.child2.dvar = false;
						}
					}
					else
					{
						this.gvar = false;
					}
					
					if ((this.child1.dvar)||(this.child2.dvar))
					{
						this.dvar = true;
					}
				}
				else
				{
					// we are the referencing node so call drawreg2
					this.drawreg2(x,y,r);
				}
			}
		}
		else
		{
			// we are a leaf and we are referencing - we are the referencing node so record x,y,r
			this.drawreg2(x,y,r); //does all we need and will automatically skip any child commands
		}
	}
	
	midnode.prototype.drawreg2 = function(x,y,r)
	{
		this.xvar = x;
		this.yvar = y;
		this.rvar = r;
		this.dvar = false;	
		if(((!((((x+(r*this.hxmax))<0)||((x+(r*this.hxmin))>widthres))||(((y+(r*this.hymax))<0)||((y+(r*this.hymin))>heightres))))))
		{
			if (this.child1)
			{
				if (r > threshold)
				{
					this.child1.drawreg2 (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*this.nextr1);
					this.child2.drawreg2 (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*this.nextr2);
				}
				else
				{
					this.child1.gvar = false;
					this.child1.dvar = false; 
					this.child2.gvar = false;
					this.child2.dvar = false; 
				}
				
				if ((this.child1.dvar)||(this.child2.dvar))
				{
					this.dvar = true;
				}
			}
			if(((((x+(r*this.gxmax))<0)||((x+(r*this.gxmin))>widthres))||(((y+(r*this.gymax))<0)||((y+(r*this.gymin))>heightres))))
			{
				this.gvar = false;
			}
			else
			{
				this.gvar = true;
				this.dvar = true;

			}
		}
		else
		{
			this.gvar = false;
		}
	}
	
	// SEARCH UTILITIES

	midnode.prototype.search = function()
	{
		
		// initialize the search variables to the default (wipe previous searches)
		this.startscore = 0;
		this.targeted = false;
		this.searchinpast = 0; 
		this.flysofarA = false;
		this.flysofarB = false;
        
		var temphitsa = 0;
        var temphits_full = 0;
        var temphits_word = 0;
	
        if (this.child1)
        {
            (this.child1).search();
            (this.child2).search();
            temphitsa += (this.child1).searchin;
            temphitsa += (this.child2).searchin;
            temphits_full += (this.child1).searchin_full;
            temphits_full += (this.child2).searchin_full;
            temphits_word += (this.child1).searchin_word;
            temphits_word += (this.child2).searchin_word;
        }
        if (temphitsa == 0)
        {
            
            var thishit = true;
            for (i = 0 ; i < searchinparts.length ; i ++)
            {
                if (!(this.searchone(searchinparts[i],false)))
                {
                    thishit = false;
                }
            }
            if (thishit)
            {
                temphitsa += this.richness_val;
            }
            
            thishit = true;
            for (var ik = 0 ; ik < searchinparts.length ; ik ++)
            {
                
                if (!(this.searchword(searchinparts[ik])))
                {
                    thishit = false;
                }
            }
            if (thishit)
            {
                temphits_word += this.richness_val;
            }
            
            if (this.searchfull(searchinparts))
            {
                temphits_full += this.richness_val;
            }
        }
		
		this.searchin = temphitsa;
        this.searchin_full = temphits_full;
        this.searchin_word = temphits_word;
	}
	
midnode.prototype.randomsearch = function()
{
    this.targeted = true;
    var temprand = Math.random();
    if (this.child1)
    {
        if (temprand < (((this.child1).richness_val*2-1)/(this.richness_val*2-1)))
        {
            var temprand2 = Math.random();
            if ((temprand2 < 0.85)||(this.richness_val > 10000))
            {
                this.child1.randomsearch();
            }
        }
        else
        {
            if (temprand < ((this.richness_val*2-2)/(this.richness_val*2-1)))
            {
                var temprand2 = Math.random();
                if ((temprand2 < 0.85)||(this.richness_val > 10000))
                {
                    this.child2.randomsearch();
                }
            }
        }
    }
}

midnode.prototype.randomsearch_ = function()
{
    this.targeted = true;
    var temprand = Math.random();
    if (this.child1)
    {
        if (temprand < (((this.child1).num_good_pics)/(this.num_good_pics)))
        {
            this.child1.randomsearch_();
        }
        else
        {
            this.child2.randomsearch_();
        }
    }
}

/*
midnode.prototype.find_walrus = function()
{
    if (this.child1)
    {
        if(this.child1.find_walrus())
        {
            this.targeted = true;
        }
        if(this.child2.find_walrus())
        {
            this.targeted = true;
        }
    }
    else
    {
        this.targeted = (this.cname=="Walrus");
    }
    return (this.targeted);
}*/

midnode.prototype.randomsearch_s = function()
{
    this.targeted = true;
    var temprand = Math.random();
    if (this.child1)
    {
        if (temprand < (((this.child1).num_sounds)/(this.num_sounds)))
        {
            (this.child1.randomsearch_s());
        }
        else
        {
            (this.child2.randomsearch_s());
        }
        
    }
    else
    {
        play_sound(this.metacode);
    }
}


midnode.prototype.randomsound = function()
{
    var temprand = Math.random();
    if (this.num_sounds <= 0)
    {
        return null;
    }
    else
    {
        if (this.child1)
        {
            if (temprand < (((this.child1).num_sounds)/(this.num_sounds)))
            {
                return (this.child1.randomsound());
            }
            else
            {
                return (this.child2.randomsound());
            }
        }
        else
        {
            return (this.metacode);
        }
    }
}

midnode.prototype.searchtarget = function()
{
    // go down richerside and then use density as decider
    // keep going until density reaches threshold
    var searchresult = -1;
    if ((this.searchin-this.searchinpast)>0)
    {
        if (((this.searchin-this.searchinpast) / (this.richness_val))>0.7)
        {
            this.targeted = true;
            if (this.child1)
            {
                this.child1.targeted = false;
                this.child2.targeted = false;
            }
            if ((this.child1)&&(((this.child1).searchin > 0)||((this.child2).searchin > 0)))
            {
                if ((((this.child1).searchin)-((this.child1).searchinpast)) <= 0)
                {
                    var returned = (this.child2).searchtarget();
                    
                    searchresult = returned;
                }
                else
                {
                    if ((((this.child2).searchin)-((this.child2).searchinpast)) <= 0)
                    {
                        var returned = (this.child1).searchtarget();
                        
                        searchresult = returned;
                    }
                    else
                    {
                        searchresult = this.searchin;
                    }
                }
            }
            else
            {
                searchresult = this.searchin;
            }
        }
        else
        {
            if (this.child1)
            {
                var searchresult1 = this.child1.searchtarget();
                var searchresult2 = this.child2.searchtarget();
            }
            if (searchresult1 > searchresult2)
            {
                this.child1.targeted = true;
                this.child2.targeted = false;
                searchresult = searchresult1;
            }
            else
            {
                this.child2.targeted = true;
                this.child1.targeted = false;
                searchresult = searchresult2;
            }
        }	
    }
    return (searchresult);
}

midnode.prototype.searchtarget_word = function()
{
    // go down richerside and then use density as decider
    // keep going until density reaches threshold
    var searchresult = -1;
    if ((this.searchin_word-this.searchinpast)>0)
    {
        if (((this.searchin_word-this.searchinpast) / (this.richness_val))>0.7)
        {
            this.targeted = true;
            if (this.child1)
            {
                this.child1.targeted = false;
                this.child2.targeted = false;
            }
            if ((this.child1)&&(((this.child1).searchin_word > 0)||((this.child2).searchin_word > 0)))
            {
                if ((((this.child1).searchin_word)-((this.child1).searchinpast)) <= 0)
                {
                    var returned = (this.child2).searchtarget_word();
                    
                    searchresult = returned;
                }
                else
                {
                    if ((((this.child2).searchin_word)-((this.child2).searchinpast)) <= 0)
                    {
                        var returned = (this.child1).searchtarget_word();
                        
                        searchresult = returned;
                    }
                    else
                    {
                        searchresult = this.searchin_word;
                    }
                }
            }
            else
            {
                searchresult = this.searchin_word;
            }
        }
        else
        {

            if (this.child1)
            {
                var searchresult1 = this.child1.searchtarget_word();
                var searchresult2 = this.child2.searchtarget_word();
            }
            if (searchresult1 > searchresult2)
            {
                this.child1.targeted = true;
                this.child2.targeted = false;
                searchresult = searchresult1;
            }
            else
            {
                this.child2.targeted = true;
                this.child1.targeted = false;
                searchresult = searchresult2;
            }
        }	
    }
    return (searchresult);
}

midnode.prototype.searchtarget_full = function()
{
    // go down richerside and then use density as decider
    // keep going until density reaches threshold
    var searchresult = -1;
    if ((this.searchin_full-this.searchinpast)>0)
    {
        if (((this.searchin_full-this.searchinpast) / (this.richness_val))>0.7)
        {
            this.targeted = true;
            if (this.child1)
            {
                this.child1.targeted = false;
                this.child2.targeted = false;
            }
            if ((this.child1)&&(((this.child1).searchin_full > 0)||((this.child2).searchin_full > 0)))
            {
                if ((((this.child1).searchin_full)-((this.child1).searchinpast)) <= 0)
                {
                    var returned = (this.child2).searchtarget_full();
                    
                    searchresult = returned;
                }
                else
                {
                    if ((((this.child2).searchin_full)-((this.child2).searchinpast)) <= 0)
                    {
                        var returned = (this.child1).searchtarget_full();
                        
                        searchresult = returned;
                    }
                    else
                    {
                        searchresult = this.searchin_full;
                    }
                }
            }
            else
            {
                searchresult = this.searchin_full;
            }
        }
        else
        {
            if (this.child1)
            {
                var searchresult1 = this.child1.searchtarget_full();
                var searchresult2 = this.child2.searchtarget_full();
            }
            if (searchresult1 > searchresult2)
            {
                this.child1.targeted = true;
                this.child2.targeted = false;
                searchresult = searchresult1;
            }
            else
            {
                this.child2.targeted = true;
                this.child1.targeted = false;
                searchresult = searchresult2;
            }
        }	
    }
    return (searchresult);
}
	
midnode.prototype.searchtargetmark = function()
{
    // TODO000
    
    var searchresult = -1;
    if (this.targeted)
    {
        searchresult = this.searchin;
        if (this.child1)
        {
            if (this.child1.targeted)
            {
                searchresult = this.child1.searchtargetmark();
            }
            else
            {
                if (this.child2.targeted)
                {
                    searchresult = this.child2.searchtargetmark();
                }
            }
        }
        this.searchinpast += searchresult;
    }
    return (searchresult);
}

midnode.prototype.clearsearch = function ()
{
    this.searchin = 0;
    this.searchin_full = 0;
    this.searchin_word = 0;
    this.targeted = false;
    this.searchinpast = 0;
    this.flysofarA = false;
    this.flysofarB = false;
    if (this.child1)
    {
        (this.child1).clearsearch();
        (this.child2).clearsearch();
    }
}

midnode.prototype.clearroute = function ()
{
    this.onroute = false;
    if (this.child1)
    {
        (this.child1).clearroute();
        (this.child2).clearroute();
    }
}

midnode.prototype.semiclearsearch = function ()
{
    this.targeted = false;
    this.flysofarA = false;
    this.flysofarB = false;
    if (this.child1)
    {
        (this.child1).semiclearsearch();
        (this.child2).semiclearsearch();
    }		
}
	
	midnode.prototype.setxyr = function(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,movement,propmove)
	{
		var vxmax;
		var vxmin;
		var vymax;
		var vymin;
		if (this.child1)
		{
			if (movement != 2)
			{
				vxmax = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmax; 
				
				vxmin = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmin; 
				
				vymax = y+r*this.nexty1 + r*this.nextr1*this.child1.hymax; 
				
				vymin = y+r*this.nexty1 + r*this.nextr1*this.child1.hymin; 
				if (movement != 1)
				{
					
					if (vxmax < (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax)) 
					{ 
						vxmax = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax); 
					}
					if (vxmin > (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin)) 
					{ 
						vxmin = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin); 
					}
					if (vymax < (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax)) 
					{ 
						vymax = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax); 
					}
					if (vymin > (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin)) 
					{ 
						vymin = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin); 
					}
				}
			}
			else
			{
				vxmax = x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax; 
				vxmin = x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin; 
				vymax = y+r*this.nexty2 + r*this.nextr2*this.child2.hymax; 
				vymin = y+r*this.nexty2 + r*this.nextr2*this.child2.hymin; 
			}
		}
		else
		{
			vxmax = (x+r*(this.arcx+this.arcr));
			vxmin = (x+r*(this.arcx-this.arcr));
			vymax = (y+r*(this.arcy+this.arcr));
			vymin = (y+r*(this.arcy-this.arcr));
		}
		
		if (vxmax < (x+r*(this.bezsx+this.bezex)/2)) { vxmax = (x+r*(this.bezsx+this.bezex)/2); }
		if (vxmin > (x+r*(this.bezsx+this.bezex)/2)) { vxmin = (x+r*(this.bezsx+this.bezex)/2); }
		if (vymax < (y+r*(this.bezsy+this.bezey)/2)) { vymax = (y+r*(this.bezsy+this.bezey)/2); }
		if (vymin > (y+r*(this.bezsy+this.bezey)/2)) { vymin = (y+r*(this.bezsy+this.bezey)/2); }
		
		var ywsmult = ((ytargmax-ytargmin)/(vymax-vymin));//propmove;
		// the number we need to multply ws by to get the right size for a vertical fit
		var xwsmult = ((xtargmax-xtargmin)/(vxmax-vxmin));//propmove;
		// the number we need to multply ws by to get the right size for a horizontal fit
		var wsmult;
		if (ywsmult > xwsmult)
		{
			// we use xwsmult - the smaller
			wsmult = xwsmult;
		}
		else
		{
			// we use ywsmult - the smaller
			wsmult = ywsmult;
		}
		xp += (((xtargmax+xtargmin)/2.0)-((vxmax+vxmin)/2.0));
		yp += (((ytargmax+ytargmin)/2.0)-((vymax+vymin)/2.0));
		ws = ws*wsmult;
		xp = widthres/2 + (xp-widthres/2)*wsmult;
		yp = heightres/2 + (yp-heightres/2)*wsmult;
	}

	midnode.prototype.setxyr4r = function(xtargmin,xtargmax,ytargmin,ytargmax)
	{
		
		ws = 1; 
		xp = widthres/2; 
		yp = heightres; 
		var x = xp;
		var y = yp;
		var r = 220*ws;
		
		var vxmax;
		var vxmin;
		var vymax;
		var vymin;
		/*
		if (this.child1)
		{
			vxmax = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmax; 
			vxmin = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmin; 
			vymax = y+r*this.nexty1 + r*this.nextr1*this.child1.hymax; 
			vymin = y+r*this.nexty1 + r*this.nextr1*this.child1.hymin; 
			if (vxmax < (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax)) 
			{ 
				vxmax = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax); 
			}
			if (vxmin > (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin)) 
			{ 
				vxmin = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin); 
			}
			if (vymax < (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax)) 
			{ 
				vymax = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax); 
			}
			if (vymin > (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin)) 
			{ 
				vymin = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin); 
			}
		}//*/
		//else
		//{
			vxmax = (x+r*(this.arcx+this.arcr));
			vxmin = (x+r*(this.arcx-this.arcr));
			vymax = (y+r*(this.arcy+this.arcr));
			vymin = (y+r*(this.arcy-this.arcr));
		//}
        /*
		if (vxmax < (x+r*(this.bezsx+this.bezex)/2)) { vxmax = (x+r*(this.bezsx+this.bezex)/2); }
		if (vxmin > (x+r*(this.bezsx+this.bezex)/2)) { vxmin = (x+r*(this.bezsx+this.bezex)/2); }
		if (vymax < (y+r*(this.bezsy+this.bezey)/2)) { vymax = (y+r*(this.bezsy+this.bezey)/2); }
		if (vymin > (y+r*(this.bezsy+this.bezey)/2)) { vymin = (y+r*(this.bezsy+this.bezey)/2); }
		*/
		var ywsmult = ((ytargmax-ytargmin)/(vymax-vymin));//propmove;
		// the number we need to multply ws by to get the right size for a vertical fit
		var xwsmult = ((xtargmax-xtargmin)/(vxmax-vxmin));//propmove;
		// the number we need to multply ws by to get the right size for a horizontal fit
		var wsmult;
		if (ywsmult > xwsmult)
		{
			// we use xwsmult - the smaller
			wsmult = xwsmult;
		}
		else
		{
			// we use ywsmult - the smaller
			wsmult = ywsmult;
		}
		
		xp += (((xtargmax+xtargmin)/2.0)-((vxmax+vxmin)/2.0));//*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
		yp += (((ytargmax+ytargmin)/2.0)-((vymax+vymin)/2.0));//*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
		
		ws = ws*wsmult;
		xp = widthres/2 + (xp-widthres/2)*wsmult;
		yp = heightres/2 + (yp-heightres/2)*wsmult;
	}


midnode.prototype.setxyr3r = function(xtargmin,xtargmax,ytargmin,ytargmax)
{
    
    ws = 1;
    xp = widthres/2;
    yp = heightres;
    var x = xp;
    var y = yp;
    var r = 220*ws;
    
    var vxmax;
    var vxmin;
    var vymax;
    var vymin;
    if (this.child1)
    {
        vxmax = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmax;
        vxmin = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmin;
        vymax = y+r*this.nexty1 + r*this.nextr1*this.child1.hymax;
        vymin = y+r*this.nexty1 + r*this.nextr1*this.child1.hymin;
        if (vxmax < (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax))
        {
            vxmax = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax);
        }
        if (vxmin > (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin))
        {
            vxmin = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin);
        }
        if (vymax < (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax))
        {
            vymax = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax);
        }
        if (vymin > (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin))
        {
            vymin = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin);
        }
    }//*/
    else
    {
        vxmax = (x+r*(this.arcx+this.arcr));
        vxmin = (x+r*(this.arcx-this.arcr));
        vymax = (y+r*(this.arcy+this.arcr));
        vymin = (y+r*(this.arcy-this.arcr));
    }
    /*
     if (vxmax < (x+r*(this.bezsx+this.bezex)/2)) { vxmax = (x+r*(this.bezsx+this.bezex)/2); }
     if (vxmin > (x+r*(this.bezsx+this.bezex)/2)) { vxmin = (x+r*(this.bezsx+this.bezex)/2); }
     if (vymax < (y+r*(this.bezsy+this.bezey)/2)) { vymax = (y+r*(this.bezsy+this.bezey)/2); }
     if (vymin > (y+r*(this.bezsy+this.bezey)/2)) { vymin = (y+r*(this.bezsy+this.bezey)/2); }
     */
    var ywsmult = ((ytargmax-ytargmin)/(vymax-vymin));//propmove;
    // the number we need to multply ws by to get the right size for a vertical fit
    var xwsmult = ((xtargmax-xtargmin)/(vxmax-vxmin));//propmove;
    // the number we need to multply ws by to get the right size for a horizontal fit
    var wsmult;
    if (ywsmult > xwsmult)
    {
        // we use xwsmult - the smaller
        wsmult = xwsmult;
    }
    else
    {
        // we use ywsmult - the smaller
        wsmult = ywsmult;
    }
    
    xp += (((xtargmax+xtargmin)/2.0)-((vxmax+vxmin)/2.0));//*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
    yp += (((ytargmax+ytargmin)/2.0)-((vymax+vymin)/2.0));//*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
   
    ws = ws*wsmult;
    xp = (xtargmax+xtargmin)/2 + (xp-(xtargmax+xtargmin)/2)*wsmult;
    yp = (ytargmax+ytargmin)/2 + (yp-(ytargmax+ytargmin)/2)*wsmult;
}

	midnode.prototype.setxyr2 = function(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,movement,propmove,flynum)
	{
		var vxmax;
		var vxmin;
		var vymax;
		var vymin;
		if (movement != 3)
		{
			vxmax = (x+r*(this.fxmax));//(x+r*(this.arcx+this.arcr));
			vxmin = (x+r*(this.fxmin));
			vymax = (y+r*(this.fymax));
			vymin = (y+r*(this.fymin));
		}
		else
		{
			if (this.child1)
			{
				vxmax = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmax; 
				vxmin = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmin; 
				vymax = y+r*this.nexty1 + r*this.nextr1*this.child1.hymax; 
				vymin = y+r*this.nexty1 + r*this.nextr1*this.child1.hymin; 
				if (vxmax < (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax)) 
				{ 
					vxmax = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax); 
				}
				if (vxmin > (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin)) 
				{ 
					vxmin = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin); 
				}
				if (vymax < (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax)) 
				{ 
					vymax = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax); 
				}
				if (vymin > (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin)) 
				{ 
					vymin = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin); 
				}
			}
			else
			{
				vxmax = (x+r*(this.arcx+this.arcr));
				vxmin = (x+r*(this.arcx-this.arcr));
				vymax = (y+r*(this.arcy+this.arcr));
				vymin = (y+r*(this.arcy-this.arcr));
			}
			if (vxmax < (x+r*(this.bezsx+this.bezex)/2)) { vxmax = (x+r*(this.bezsx+this.bezex)/2); }
			if (vxmin > (x+r*(this.bezsx+this.bezex)/2)) { vxmin = (x+r*(this.bezsx+this.bezex)/2); }
			if (vymax < (y+r*(this.bezsy+this.bezey)/2)) { vymax = (y+r*(this.bezsy+this.bezey)/2); }
			if (vymin > (y+r*(this.bezsy+this.bezey)/2)) { vymin = (y+r*(this.bezsy+this.bezey)/2); }
		}
		
		var ywsmult = ((ytargmax-ytargmin)/(vymax-vymin));//propmove;
		// the number we need to multply ws by to get the right size for a vertical fit
		var xwsmult = ((xtargmax-xtargmin)/(vxmax-vxmin));//propmove;
		// the number we need to multply ws by to get the right size for a horizontal fit
		var wsmult;
		if (ywsmult > xwsmult)
		{
			// we use xwsmult - the smaller
			wsmult = xwsmult;
		}
		else
		{
			// we use ywsmult - the smaller
			wsmult = ywsmult;
		}
		
		wsmult =Math.pow(wsmult,(1.0/propmove));
		var xpadd;
		var ypadd;
		
		if (Math.abs(wsmult-1) < 0.000001)
		{
			xpadd = (((xtargmax+xtargmin)/2.0)-((vxmax+vxmin)/2.0));//*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
			ypadd = (((ytargmax+ytargmin)/2.0)-((vymax+vymin)/2.0));//*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
		}
		else
		{
			xpadd = (((xtargmax+xtargmin)/2.0)-((vxmax+vxmin)/2.0))*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
			ypadd = (((ytargmax+ytargmin)/2.0)-((vymax+vymin)/2.0))*((1-(1/wsmult))/(1-(Math.pow((1/wsmult),propmove))));
		}
		xp+= xpadd;
		yp+= ypadd;
		ws = ws*wsmult;
		xp = widthres/2 + (xp-widthres/2)*wsmult;
		yp = heightres/2 + (yp-heightres/2)*wsmult;
	}
	
	midnode.prototype.move = function(xtargmin,xtargmax,ytargmin,ytargmax)
	{
		if (this.targeted)
		{
			this.graphref = true;
			if (this.child1)
			{
				if (this.child1.targeted)
				{
					this.child1.move(xtargmin,xtargmax,ytargmin,ytargmax);
				}
				else
				{
					if (this.child2.targeted)
					{
						this.child2.move(xtargmin,xtargmax,ytargmin,ytargmax);
					}
					else
					{
						this.setxyr3r(40,widthres-40,40,heightres-40);
						this.setxyr3r(40,widthres-40,40,heightres-40);
					}
				}
			}
			else
			{
				this.setxyr3r(40,widthres-40,40,heightres-40);
				this.setxyr3r(40,widthres-40,40,heightres-40);
			}
		}
	}	

midnode.prototype.move4 = function(xtargmin,xtargmax,ytargmin,ytargmax)
{
    if (this.targeted)
    {
        this.graphref = true;
        if (this.child1)
        {
            if (this.child1.targeted)
            {
                this.child1.move4(xtargmin,xtargmax,ytargmin,ytargmax);
            }
            else
            {
                if (this.child2.targeted)
                {
                    this.child2.move4(xtargmin,xtargmax,ytargmin,ytargmax);
                }
                else
                {
                    this.setxyr4r(40,widthres-40,65,heightres-40);
                    this.setxyr4r(40,widthres-40,65,heightres-40);
                }
            }
        }
        else
        {
            this.setxyr4r(40,widthres-40,65,heightres-40);
            this.setxyr4r(40,widthres-40,65,heightres-40);
        }
    }
}

	midnode.prototype.move3 = function(xtargmin,xtargmax,ytargmin,ytargmax)
	{
		if (this.onroute)
		{
			if (this.child1)
			{
				if (this.child1.onroute)
				{
					this.child1.move3(xtargmin,xtargmax,ytargmin,ytargmax);
				}
				else
				{
					if (this.child2.onroute)
					{
						this.child2.move3(xtargmin,xtargmax,ytargmin,ytargmax);
					}
					else
					{
						this.setxyr3r(40,widthres-40,40,heightres-40);
						this.setxyr3r(40,widthres-40,40,heightres-40);
					}
				}
			}
			else
			{
				this.setxyr3r(40,widthres-40,40,heightres-40);
				this.setxyr3r(40,widthres-40,40,heightres-40);
			}
		}
	}	
	
	midnode.prototype.move2 = function()
	{
		if (this.dvar)
		{
			this.onroute = true;
			if ((!(this.gvar))&&(this.child1))
			{
				if (!((this.child1.dvar)&&(this.child2.dvar)))
				{
					if (this.child1.dvar)
					{
						this.child1.move2();
					}
					else
					{
						if (this.child2.dvar)
						{
							this.child2.move2();
						}
					}
				}
			}
		}
	}
	
	midnode.prototype.clearonroute = function()
	{
		this.onroute = false;
		if (this.child1)
		{
			(this.child1).clearonroute();
			(this.child2).clearonroute();
		}
	}
	
	midnode.prototype.flyFB = function(xtargmin,xtargmax,ytargmin,ytargmax)
	{
        var cdBtarget = 6;
        if (screensaver_on)
        {
            cdBtarget = screen_saver.flightspeed;
        }
        
		var x = this.xvar;
		var y = this.yvar;
		var r = this.rvar;
		if (this.targeted)
		{	
			if (this.flysofarB)
			{
				if (this.child1)
				{
					if (this.child1.targeted)
					{
						this.child1.flyFB(xtargmin,xtargmax,ytargmin,ytargmax);
					}
					else
					{
						if (this.child2.targeted)
						{
							this.child2.flyFB(xtargmin,xtargmax,ytargmin,ytargmax);
						}
						else
						{
							if (this.flysofarB )
							{
								if (flying)
								{
									clearTimeout(t);
									fulltree.searchtargetmark();
									flying = false;
                                    flying_2 = false;

								}
							}
							else
							{
								this.setxyr2(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,3,countdownB,2);
								if (countdownB <= 1)
								{
									this.flysofarB = true;
									
									countdownB = cdBtarget;
									
								}
								else
								{
									countdownB --;
								}
							}
						}
					}
				}
				else
				{
					if (this.flysofarB )
					{
						if (flying)
						{
							clearTimeout(t);
							fulltree.searchtargetmark();
							flying = false;
                            flying_2 = false;

						}
					}
					else
					{
						this.setxyr2(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,3,countdownB,2);
						if (countdownB <= 1)
						{
							this.flysofarB = true;
							
							countdownB = cdBtarget;
							
						}
						else
						{
							countdownB --;
						}
					}
				}
			}
			else
			{
				if (this.child1)
				{
					if (this.child1.targeted)
					{
						this.setxyr2(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,1,countdownB,2);
						if (countdownB <= 1)
						{
							this.flysofarB = true;
							countdownB = cdBtarget;
							
						}
						else
						{
							countdownB --;
						}
					}
					else
					{
						if (this.child2.targeted)
						{
							this.setxyr2(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,2,countdownB,2);
							if (countdownB <= 1)
							{
								this.flysofarB = true;
								
								countdownB = cdBtarget;
								
							}
							else
							{
								countdownB --;
							}
						}
						else
						{
						
							if (this.flysofarB )
							{
								if (flying)
								{
									clearTimeout(t);
									fulltree.searchtargetmark();
									flying = false;
                                    flying_2 = false;

								}
							}
							else
							{
								this.setxyr2(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,3,countdownB,2);
								if (countdownB <= 1)
								{
									this.flysofarB = true;
									
									countdownB = cdBtarget;
									
								}
								else
								{
									countdownB --;
								}
							}
						}
					}
				}
				else
				{
					if (this.flysofarB )
					{
						if (flying)
						{
							clearTimeout(t);
							fulltree.searchtargetmark();
							flying = false;
                            flying_2 = false;

						}
					}
					else
					{
						this.setxyr2(x,y,r,xtargmin,xtargmax,ytargmin,ytargmax,3,countdownB,2);
						if (countdownB <= 1)
						{
							this.flysofarB = true;
							
							countdownB = cdBtarget;
							
						}
						else
						{
							countdownB --;
						}
					}
				}
			}
		}
	}	
	
	midnode.prototype.prepfly = function(x,y,r)
	{
		if (this.targeted)
		{
			this.fxmax = this.gxmax;
			this.fxmin = this.gxmin;
			this.fymax = this.gymax;
			this.fymin = this.gymin;	
			
			// nothing to do otherwise
			if (this.child1)
			{
				if (this.child1.targeted)
				{
					this.child1.prepfly(x+r*this.nextx1,y+r*this.nexty1,r*this.nextr1);
					if (this.fxmax < (this.nextx1+this.nextr1*this.child1.fxmax)) { this.fxmax = (this.nextx1+this.nextr1*this.child1.fxmax) }
					if (this.fxmin > (this.nextx1+this.nextr1*this.child1.fxmin)) { this.fxmin = (this.nextx1+this.nextr1*this.child1.fxmin) }
					if (this.fymax < (this.nexty1+this.nextr1*this.child1.fymax)) { this.fymax = (this.nexty1+this.nextr1*this.child1.fymax) }
					if (this.fymin > (this.nexty1+this.nextr1*this.child1.fymin)) { this.fymin = (this.nexty1+this.nextr1*this.child1.fymin) }
					
				}
				else
				{
					if (this.child2.targeted)
					{
						this.child2.prepfly(x+r*this.nextx2,y+r*this.nexty2,r*this.nextr2);
						if (this.fxmax < (this.nextx2+this.nextr2*this.child2.fxmax)) { this.fxmax = (this.nextx2+this.nextr2*this.child2.fxmax) }
						if (this.fxmin > (this.nextx2+this.nextr2*this.child2.fxmin)) { this.fxmin = (this.nextx2+this.nextr2*this.child2.fxmin) }
						if (this.fymax < (this.nexty2+this.nextr2*this.child2.fymax)) { this.fymax = (this.nexty2+this.nextr2*this.child2.fymax) }
						if (this.fymin > (this.nexty2+this.nextr2*this.child2.fymin)) { this.fymin = (this.nexty2+this.nextr2*this.child2.fymin) }
						
					}
					else
					{
						this.fxmax = this.hxmax;
						this.fxmin = this.hxmin;
						this.fymax = this.hymax;
						this.fymin = this.hymin;	
					}
				}
			}
			else
			{
				this.fxmax = this.hxmax;
				this.fxmin = this.hxmin;
				this.fymax = this.hymax;
				this.fymin = this.hymin;	
			}
		}
	}	
	
	var searchtext = null;



function marksearch()
{
    clear_screensaver();
    
    if ((! flying) &&(((searchstring)&&(searchstring!= "")) ||((search_sounds)||(search_images)))  )
    {
        
        performsearch2(false);
        highlight_search = true;
        if(fulltree.searchin == 1)
        {
            searchtext = "1 hit";
        }
        else
        {
            if(fulltree.searchin <= 0)
            {
                searchtext = "no hits";
            }
            else
            {
                searchtext = ((fulltree.searchin).toString() + " hits");
            }
        }
        
        //if ((document.forms["myform"]["flightsearch"].checked))
        
        /*
        if (fulltree.searchin > 0)
        {
            if (fly_on_search)
            {
                performfly();
            }
            else
            {
                performleap();
            }
        }
         */
        
        if(growing)
        {
            growend();
            growplay();
        }
        else
        {
            if(growingpause)
            {
                growend();
                growplay();
                growpause();
            }
            else
            {
                setTimeout('draw2()',30);
            }
        }
        
    }
}

function cyclesearch()
{
    performleap();
}





	function unmarksearch()
{
        clear_screensaver();

    if (highlight_search)
    {
		highlight_search = false;
    }
    else
    {
        highlight_search = true;
    }
    draw2();
}
	
	function performclear()
	{
		highlight_search = false;
		searchinparts = [];
		draw2();
	}

function ranked_search()
{
    performsearch2(false);
    if (fulltree.searchtarget_full() == -1)
    {
        if (fulltree.searchtarget_word() == -1)
        {
            if (fulltree.searchtarget() == -1)
            {
                searchinparts = [];
                ranked_search();
            }
        }
    }
}







/****************************************************/
/* start of perform_flight_animation function block */
/****************************************************/

// todo - zoom out goes in the wrong direction a little
// long horizontal moves are not well handled

midnode.prototype.drawreg_target = function(x,y,r)
{
    // we assume that only those for whom graphref is true will call this routine
    if (this.child1)
    {
        // we are not a leaf and we are referencing - check children
        if (this.child1.graphref)
        {
            // child 1 leads to (or is) the referencing node
            this.child1.drawreg_target(x,y,r);
            this.rvar = this.child1.rvar/this.nextr1;
            this.xvar = this.child1.xvar-this.rvar*this.nextx1;
            this.yvar = this.child1.yvar-this.rvar*this.nexty1;
            
            if(this.targeted)
            {
                this.child2.drawreg2_target (this.xvar+((this.rvar)*(this.nextx2)),this.yvar+(this.rvar)*(this.nexty2),this.rvar*this.nextr2);
            }
        }
        else
        {
            if (this.child2.graphref)
            {
                // child 2 leads to (or is) the referencing node
                this.child2.drawreg_target(x,y,r);
                this.rvar = this.child2.rvar/this.nextr2;
                this.xvar = this.child2.xvar-this.rvar*this.nextx2;
                this.yvar = this.child2.yvar-this.rvar*this.nexty2;
                
                if(this.targeted)
                {
                    this.child1.drawreg2_target (this.xvar+((this.rvar)*(this.nextx1)),this.yvar+(this.rvar)*(this.nexty1),this.rvar*this.nextr1);
                }
            }
            else
            {
                // we are the referencing node so call drawreg2_target
                this.drawreg2_target(x,y,r);
            }
        }
    }
    else
    {
        // we are a leaf and we are referencing - we are the referencing node so record x,y,r
        this.drawreg2_target(x,y,r); //does all we need and will automatically skip any child commands
    }
}

midnode.prototype.drawreg2_target = function(x,y,r)
{
    this.xvar = x;
    this.yvar = y;
    this.rvar = r;
    if(this.targeted)
    {
        if (this.child1)
        {
            this.child1.drawreg2_target (x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*this.nextr1);
            this.child2.drawreg2_target (x+((r)*(this.nextx2)),y+(r)*(this.nexty2),r*this.nextr2);
        }
    }
}


// this function clears completely all the targeted tags in the tree
midnode.prototype.cleartarget = function ()
{
    // set value to false
    this.targeted = false;
    if (this.child1)
    {
        // do the same for both children if needed
        (this.child1).cleartarget();
        (this.child2).cleartarget();
    }
}

// to_index gives us the index of the leaf or node we need to zoom into
// to_leaf tells us if that index refers to a leaf (1) or not (-1)
midnode.prototype.target_by_code = function(to_leaf , to_index)
{
    if (to_leaf > 0)
    {
        // we are looking for a leaf
        if (this.child1)
        {
            // we have children so check them
            this.targeted = this.child1.target_by_code(to_leaf,to_index);
            if (this.child2.target_by_code(to_leaf,to_index))
            {
                this.targeted = true;
            }
        }
        else
        {
            // we are a leaf
            if (this.metacode == to_index)
            {
                // we are the correct leaf
                this.targeted = true;
            }
            else
            {
                // we are the wrong leaf
                this.targeted = false;
            }
        }
    }
    else
    {
        // we are looking for a node
        if (this.child1)
        {
            if (this.metacode == to_index)
            {
                // we are the correct node
                this.targeted = true;
            }
            else
            {
                // we have children so check them
                this.targeted = this.child1.target_by_code(to_leaf,to_index);
                if (this.child2.target_by_code(to_leaf,to_index))
                {
                    this.targeted = true;
                }
            }
        }
        else
        {
            // we are a leaf
            this.targeted = false;
        }
    }
    
    // send back information on whether or not this node is targeted
    return this.targeted;
};


// this function is for flying from the current view to a new view
// it's not used for the screensaver
// it's only the basic auto zoom pan method
// it doesn't do anything special to adapt to different view types
function perform_flight_animation(codein_fly,anim_speed)
{
    if (codein_fly > 0)
    {
        to_leaf = -1;
        to_index = codein_fly;
    }
    else
    {
        to_leaf = 1;
        to_index = -codein_fly;
    }
    
    //leaf (1) or not (-1)
    
    // first clear the targets and set them based on the codes
    fulltree.cleartarget();
    fulltree.target_by_code(to_leaf,to_index);

    fulltree.drawreg_target(xp,yp,220*ws);

    fulltree.get_xyr_target(xp,yp,220*ws);
    
    pre_xp = xp;
    pre_yp = yp;
    pre_ws = ws;
    
    intro_step_num = 0;
    intro_sec_step_num = 0;
    
    
   // length_intro = (Math.log(r_mult)+ Math.pow((x_add*x_add+y_add*y_add),0.5)/pre_ws/100 +1)*length_intro_in;


    length_intro = Math.max((Math.abs(Math.log(r_mult)))*anim_speed,12);

    
    num_intro_steps = Math.floor(length_intro);
    draw2();
    
    flying = true;
    flying_2 = true;

    
    
    // the problem is in auto pan zoom because the xadd is measured according the the start where it's more meaningful
    // before it was more meaningful at the end so some of those calcs are revered todo
    
    t = setTimeout('performflyB2()',1);
    
    
}


// end of perform_flight_animation function block







function performfly()
{
    if (!flying)
    {
        if(screensaver_on)
        {
            nowplaying = null;
            justplayednew = false;
            
            if (thisSound.duration)
            {
                thisSound.currentTime = thisSound.duration;
            }
        }
        
        if (viewtype == 2)
        {
			fulltree.deanchor();
			fulltree.graphref = true;
			fulltree.setxyr(xp,yp,220*ws,20,widthres-2,65,heightres,0,1);
			fulltree.setxyr(xp,yp,220*ws,20,widthres-2,65,heightres,0,1);
			wsinit = ws;
			draw2();
			fulltree.semiclearsearch();
            
			flying = true;
            
            if (screensaver_on)
            {
                temprand = Math.random();
                fulltree.clearsearch();
                if(temprand < ((screen_saver.pic)/(screen_saver.sound + screen_saver.pic)))
                {
                    fulltree.randomsearch_();
                }
                else
                {
                    fulltree.randomsearch_s();
                }
            }
            else
            {
                ranked_search();
            }
			fulltree.targeted = true;
			//fulltree.searchtargetmark();
			countdownB = 18;
			fulltree.flysofarB = true;
			if (fulltree.child1)
			{
				if (fulltree.child1.targeted)
				{
					if (((fulltree.child1).child1)&&((fulltree.child1).child1.targeted||(fulltree.child1).child2.targeted))
					{
						fulltree.child1.flysofarB = true;
					}
				}
				if (fulltree.child2.targeted)
				{
					if (((fulltree.child2).child1)&&((fulltree.child2).child1.targeted||(fulltree.child2).child2.targeted))
					{
						fulltree.child2.flysofarB = true;
					}
				}
			}
			fulltree.prepfly(xp,yp,220*ws,5); // todo &&&
			performfly2();
        }
        else
        {
            fulltree.clear_xyr_var(); // because otherwise the fly gets confused
            // in the place where null xvar, yvar and rvar indicate beyond scope
            // of drawing so extrapolate x, y and r based on current anchor
            fulltree.deanchor();
            fulltree.graphref = true;
            
            fulltree.setxyr(xp, yp, 220 * ws, 20, widthres - 2, 65, heightres, 0, 1);
            fulltree.setxyr(xp, yp, 220 * ws, 20, widthres - 2, 65, heightres, 0, 1);
            wsinit = ws;
            draw2();
            fulltree.semiclearsearch();
            
            flying = true;
            
            if (screensaver_on)
            {
                temprand = Math.random();
                fulltree.clearsearch();
                if(temprand < ((screen_saver.pic)/(screen_saver.sound + screen_saver.pic)))
                {
                    fulltree.randomsearch_();
                }
                else
                {
                    fulltree.randomsearch_s();
                }
            }
            else
            {
                ranked_search();
            }

            fulltree.targeted = true;
            // fulltree.searchtargetmark();
            
            fulltree.drawreg(xp,yp,220*ws);
            fulltree.get_xyr_target(xp,yp,220*ws);
            
            pre_xp = xp;
            pre_yp = yp;
            pre_ws = ws;
            
            intro_step_num = 0;
            intro_sec_step_num = 0;
            length_intro = (Math.log(r_mult)+ Math.pow((x_add*x_add+y_add*y_add),0.5)/pre_ws/100 +1)*length_intro_in;

            num_intro_steps = length_intro;
            draw2();
            
            t = setTimeout('performflyB2()',1);
        }
    }
}


var performflyB2_var = -1;
var performfly2_var = -1;
var ttt;


	function performfly2()
	{
        performfly2_var = -1;
        t = setTimeout('performfly2_waiting()',50);
		fulltree.drawreg(xp,yp,220*ws);
		fulltree.flyFB(40,widthres-40,65,heightres-40);
		draw2();
		if (flying)
		{
			performfly2_var = 1;
		}
        else
        {
            performfly2_var = -1;
            clearTimeout(ttt);
            clearTimeout(t);
            if (screensaver_on)
            {
                flying = false;
                flying_2 = false;

                tout_aw = setTimeout('screen_saver_postaction()',screen_saver.animation_wait*1000);
            }
        }
	}

function performfly2_waiting() {
    clearTimeout(ttt);
    if (performfly2_var == 1)
    {
        ttt = setTimeout('performfly2()',1);
    }
    else
    {
        ttt = setTimeout('performfly2_waiting()',1);
    }
}


function performflyB2() {
    
    performflyB2_var = -1;
    if ((intro_step_num <= length_intro)&&(introlock||flying))
    {
        clearTimeout(t);
        t = setTimeout('performflyB2_waiting()',50);
        if (r_mult >= 1)
        {
            auto_pan_zoom(intro_sec_step_num/num_intro_steps,intro_sec_step_num/num_intro_steps);
        }
        else
        {
            auto_pan_zoom_out(intro_sec_step_num/num_intro_steps,intro_sec_step_num/num_intro_steps);
        }
        draw2();
        intro_step_num ++;
        intro_sec_step_num ++;
        //clearTimeout(t);
        performflyB2_var = 1;
    }
    else
    {

        if (screensaver_on)
        {
            flying = false;
            flying_2 = false;

            tout_aw = setTimeout('screen_saver_postaction()',screen_saver.animation_wait*1000);
        }
        else if (flying)
        {
            fulltree.searchtargetmark();
            flying = false;
            flying_2 = false;

        }
    }
}

function performflyB2_waiting() {

    clearTimeout(ttt);
    if (performflyB2_var == 1)
    {
        ttt = setTimeout('performflyB2()',1);
    }
    else
    {
        ttt = setTimeout('performflyB2_waiting()',1);
    }
}

function continue_flyB() {
    clearTimeout(t);
    intro_sec_step_num = 0;
    num_intro_steps = length_intro-intro_step_num;
    
    fulltree.get_xyr_target(xp,yp,220*ws);
    pre_xp = xp;
    pre_yp = yp;
    pre_ws = ws;
    
    t = setTimeout('performflyB2()',1);
}

midnode.prototype.get_xyr_target = function(x2,y2,r2)
{
    var border = Math.max(35/heightres,35/widthres); // portion of view reserved for border left and right
    
    var x,y,r;
    if(this.rvar)
    {
        x = this.xvar;
        y = this.yvar;
        r = this.rvar;
    }
    else
    {
        x=x2;
        y=y2;
        r=r2;
    }
    
    var target_this = false;
    
    if (this.targeted)
	{
		// nothing to do otherwise
		if (this.child1)
		{
			if (this.child1.targeted)
			{
				this.child1.get_xyr_target(x+r*this.nextx1,y+r*this.nexty1,r*this.nextr1);
			}
			else
			{
				if (this.child2.targeted)
				{
					this.child2.get_xyr_target(x+r*this.nextx2,y+r*this.nexty2,r*this.nextr2);
				}
				else
				{
                    target_this = true;
				}
			}
		}
		else
		{
            target_this = true;
		}
	}
    
    if (target_this)
    {
        /* this vx part is copied from move routines above*/
        var vxmax;
        var vxmin;
        var vymax;
        var vymin;
        
        if (this.child1)
        {
            vxmax = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmax;
            vxmin = x+r*this.nextx1 + r*this.nextr1*this.child1.hxmin;
            vymax = y+r*this.nexty1 + r*this.nextr1*this.child1.hymax;
            vymin = y+r*this.nexty1 + r*this.nextr1*this.child1.hymin;
            if (vxmax < (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax))
            {
                vxmax = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmax);
            }
            if (vxmin > (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin))
            {
                vxmin = (x+r*this.nextx2 + r*this.nextr2*this.child2.hxmin);
            }
            if (vymax < (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax))
            {
                vymax = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymax);
            }
            if (vymin > (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin))
            {
                vymin = (y+r*this.nexty2 + r*this.nextr2*this.child2.hymin);
            }
        }
        else
        {
            vxmax = (x+r*(this.arcx+this.arcr));
            vxmin = (x+r*(this.arcx-this.arcr));
            vymax = (y+r*(this.arcy+this.arcr));
            vymin = (y+r*(this.arcy-this.arcr));
        }
        //if (vxmax < (x+r*(this.bezsx+this.bezex)/2)) { vxmax = (x+r*(this.bezsx+this.bezex)/2); }
        //if (vxmin > (x+r*(this.bezsx+this.bezex)/2)) { vxmin = (x+r*(this.bezsx+this.bezex)/2); }
        //if (vymax < (y+r*(this.bezsy+this.bezey)/2)) { vymax = (y+r*(this.bezsy+this.bezey)/2); }
        //if (vymin > (y+r*(this.bezsy+this.bezey)/2)) { vymin = (y+r*(this.bezsy+this.bezey)/2); }
        
        var x_targ_max = vxmax;
        var x_targ_min = vxmin;
        var y_targ_max = vymax;
        var y_targ_min = vymin;
        
        // find out if new target area is constained by x or y axis compared to current view
        if (((widthres)/(heightres))>((x_targ_max-x_targ_min)/(y_targ_max-y_targ_min)))
        {
            // height controls size
            r_mult = (heightres-80)/(y_targ_max-y_targ_min);//(1+2*border);
        } else {
            // width controls size
            r_mult = (widthres-80)/(x_targ_max-x_targ_min);//(1+2*border);
        }
        x_add = (x_targ_max+x_targ_min-widthres)/2;
        y_add = (y_targ_max+y_targ_min-heightres)/2;
        
    }
};


auto_pan_zoom = function(prop_p,prop_z)
{
    
    var centreY = y_add+heightres/2;
    var centreX = x_add+widthres/2;
	ws = pre_ws*(Math.pow(r_mult,prop_z));
	xp = centreX + (pre_xp-centreX)*(Math.pow(r_mult,prop_z)) - x_add*prop_p;
	yp = centreY + (pre_yp-centreY)*(Math.pow(r_mult,prop_z)) - y_add*prop_p;
    
    
    /*
     
     for comparison 
     
     ws = ws*sensitivity;
     xp = mouseX + (xp-mouseX)*sensitivity;
     yp = mouseY + (yp-mouseY)*sensitivity;
     draw2();
     
     
     */
    
};

auto_pan_zoom_out = function(prop_p,prop_z)
{

    var pre_xp_new = widthres/2 + (pre_xp-widthres/2 - x_add)*r_mult;
    var pre_yp_new = heightres/2 + (pre_yp-heightres/2 - y_add)*r_mult;
    var pre_ws_new = pre_ws*r_mult;
    
    var prop_p2 = 1-prop_p;
    var prop_z2 = 1-prop_z;
    
    var y_add2 = (-y_add)*r_mult;
    var x_add2 = (-x_add)*r_mult;
    var r_mult2 = 1/r_mult;
    

    
    var centreY = y_add2+heightres/2;
    var centreX = x_add2+widthres/2;
	ws = pre_ws_new*(Math.pow(r_mult2,prop_z2));
	xp = centreX + (pre_xp_new-centreX)*(Math.pow(r_mult2,prop_z2)) - x_add2*prop_p2;
	yp = centreY + (pre_yp_new-centreY)*(Math.pow(r_mult2,prop_z2)) - y_add2*prop_p2;
    
   
     
    // todo - getting there, but need to play with the function still - it's not right
    // also can transform the prop_p and prop_z components of this to make it non linear and more zooming initially
    // could change to measure x and y add in terms of the zoomed out version
    
   
};

midnode.prototype.clear_xyr_var = function()
{
    if (this.child1)
    {
        this.child1.clear_xyr_var();
        this.child2.clear_xyr_var();
    }
    this.xvar = null;
    this.yvar = null;
    this.rvar = null;
};

var x_add;
var y_add;
var r_mult;
var pre_xp;
var pre_yp;
var pre_ws;

var length_intro;
var num_intro_steps; // total animation steps
var intro_step_num; // number of steps into animation overall
var intro_sec_step_num; // number of steps in this section of the animation (each time we reroot the tree we're in a new section)


// TODO000

	function performleap()
	{
		clearTimeout(t);
		flying = false;
        flying_2 = false;

		
        if (screensaver_on)
        {
            nowplaying = null;
            justplayednew = false;
            
            if (thisSound.duration)
            {
                thisSound.currentTime = thisSound.duration;
            }

            
            temprand = Math.random();
            fulltree.clearsearch();
            if(temprand < ((screen_saver.zoomin__)/(screen_saver.zoomin__ + screen_saver.zoomin_random)))
            {
                fulltree.randomsearch_();
            }
            else
            {
                fulltree.randomsearch();
            }
        }
        else
        {
            ranked_search();
            fulltree.targeted = true;
            fulltree.searchtargetmark();
        }
		
		fulltree.deanchor();
        if (screensaver_on)
        {
            temprand3 = Math.random();
            if (temprand3 < 0.65)
            {
                fulltree.move4(20,widthres-20,65,heightres-20);
            }
            else
            {
                fulltree.move(20,widthres-20,65,heightres-20);
            }
        }
        else
        {
            fulltree.move(40,widthres-40,65,heightres-40);
        }
		draw2();
        if (screensaver_on)
        {
            if(slideshow_progress == -1)
            {
            draw2();
            tout_aw = setTimeout('zoomout_animation()',screen_saver.animation_wait*1000);
            }
            else
            {
                if(slideshow_progress >=1 )
                {
                    slideshow_progress = slideshow_progress - 1;
                    
                    tout_aw = setTimeout('performleap()',screen_saver.animation_wait*1000);
                    
                }
                else
                {
                    draw2();
                    tout_aw = setTimeout('screen_saver_preaction()',screen_saver.animation_wait*1000);
                }
            }
        }
        setTimeout('draw2()',1);
	}

	// GROW OPTIONS
	
	midnode.prototype.oldest = function()
	{
		var oldestreturn = 0.0;
		if(this.dvar)
		{
			if(this.gvar)
			{
				if (this.lengthbr)
				{
					if ( this.lengthbr > oldestreturn )
					{
						oldestreturn = this.lengthbr;
					}
				}
			}
			if (this.child1)
			{
				var oldestc1 = this.child1.oldest ();
				var oldestc2 = this.child2.oldest ();
				if (oldestc1 > oldestreturn)
				{
					oldestreturn = oldestc1;
				}
				if (oldestc2 > oldestreturn)
				{
					oldestreturn = oldestc2;
				}
			}
		}
		return oldestreturn;
	}

    var original_timelim

	function growstart()	
	{
		timelim = fulltree.oldest();
        original_timelim = timelim;
		clearTimeout(t2);
		growingpause = true;
        growingdir = true;
		growing = false;
		Resize();
	}
	
	function growrev()			
	{
        original_timelim = fulltree.oldest();
		if (timelim >= original_timelim)
		{
			timelim = -0.001;
		}
		clearTimeout(t2);
		growingpause = false;
        growingdir = false;
		growing = true;
		Resize();
		timeinc = (original_timelim)/(growthtimetot*10);
		grow3();
	}
	
	function growpause()
	{
		clearTimeout(t2);
		growingpause = true;
		growing = false;
        

		Resize();
	}
	
	function growplay()
	{

		
		if (timelim <= 0)
		{
			timelim = fulltree.oldest();
            original_timelim = timelim;
		}
		clearTimeout(t2);
		growingpause = false;
        growingdir = true;
		growing = true;
		Resize();
		timeinc = fulltree.oldest()/(growthtimetot*10);
		if(timeinc <=0)
		{
			timeinc = 1.0;
		}
		grow2();
	}
	
	function growend()		
	{
		clearTimeout(t2);
		timelim = -1;
		clearTimeout(t2);
		growingpause = false;
		growing = false;

		
        Resize();
        
        
        
	}
	
	function grow2()
	{
		if (timelim >= 0)
		{
			timelim -= timeinc;
			draw2();
			t2 = setTimeout('grow2()',100);
		}
		else
		{
			clearTimeout(t2);
			draw2();
			
            
            growing = false;
            growingpause = false;
            
            if(screensaver_on)
            {

                t2 = setTimeout('screen_saver_postaction()',3000);
            }
            else
            {
                t2 = setTimeout('Resizepostgrow()',3000);
            }
            
           //     document.getElementById("pausebutton").style.display = 'none';
           //     document.getElementById("growbutton").style.display = '';
           //     document.getElementById("continuebutton").style.display = 'none';
            
		}
	}
	
	function Resizepostgrow()
	{
		
		Resize();
	}

	function grow3()
	{
        
		if (timelim <= original_timelim)
		{
			timelim += timeinc;
			draw2();
			t2 = setTimeout('grow3()',50);
		}
		else
		{
			clearTimeout(t2);
			draw2();
            timelim = -1;
			t2 = setTimeout('draw2()',50);
			growing = false;
			growingpause = false;
            
		}
	}
	
var num_int_pics = 8; // the number of pictures to be included on internal nodes.


// this will indicate pop up text



// definition of geological periods
function gpmapper(datein)
{
    //Devonian
    if (datein > 419.2)
    {
        return("pre Devonian");
    }
    else
    {
        if (datein > 359.2)
        {
            return("Devonian");
        }
        else
        {
            if (datein > 298.9)
            {
                return("Carboniferous");
            }
            else
            {
                if (datein > 252.2)
                {
                    return("Permian");
                }
                else
                {
                    if (datein > 203.6)
                    {
                        return("Triassic");
                    }
                    else
                    {
                        if (datein > 150.8)
                        {
                            return("Jurassic");
                        }
                        else
                        {
                            if (datein > 70.6)
                            {
                                return("Cretaceous");
                            }
                            else
                            {
                                if (datein > 28.4)
                                {
                                    return("Paleogene");
                                }
                                else
                                {
                                    if (datein > 3.6)
                                    {
                                        return("Neogene");
                                    }
                                    else
                                    {
                                        return("Quaternary");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



// it is not advisable to edit below this point unless you are trying to sort out the display of custom trait data

// *** there are three types of leaves that are drawn by the code
// *** 1.) Fake leaf: where the tree continues but is smaller than the size threshold it is sometimes
// *** asthetically pleasing to draw a leaf there, especially if the threshold is a few pixels wide.  If the threshold is much smaller it does not matter if the facke leaf is drawn or not.
// *** 2.) Growth leaf: where growing animations are taking place there should be leaves on the tips of the branches
// *** 3.) Tip leaf: these are the classic leaves in which species names are put - these are the tips of the complete tree.
// *** all leaf classes can be defined with custom logic in the three scripts below

midnode.prototype.fakeleaflogic = function(x,y,r,angle)
{
    this.leafpic_drawn = false;
    context.strokeStyle = this.leafcolor2();
    context.fillStyle = this.leafcolor1();
    if (leaftype == 1)
    {
        this.drawleaf1(x,y,r);
    }
    else
    {
        this.drawleaf2(x,y,r,angle);
    }
}

midnode.prototype.growthleaflogic = function(x,y,r,angle)
{
    context.strokeStyle = this.leafcolor2();
    context.fillStyle = this.leafcolor1();
    if (leaftype == 1)
    {
        this.drawleaf1(x,y,r);
    }
    else
    {
        this.drawleaf2(x,y,r,angle);
    }
}

midnode.prototype.tipleaflogic = function(x,y,r,angle)
{
    context.strokeStyle = this.leafcolor2();
    context.fillStyle = this.leafcolor1();
    if (this.richness_val > 1)
    {
        this.drawleaf3(x,y,r,angle);
    }
    else
    {
        if (leaftype == 1)
        {
            this.drawleaf1(x,y,r);
        }
        else
        {
            this.drawleaf2(x,y,r,angle);
        }
    }
}




midnode.prototype.datepart = function()
{
    if (this.lengthbr >10)
    {
        return (Math.round((this.lengthbr)*10)/10.0).toString() + " Mya";
    }
    else
    {
        if (this.lengthbr >1)
        {
            return (Math.round((this.lengthbr)*100)/100.0).toString()  + " Mya";
        }
        else
        {
            return (Math.round((this.lengthbr)*10000)/10.0).toString()  + " Kya";
        }
    }
}


midnode.prototype.datemed = function()
{
    if (this.lengthbr >10)
    {
        return (Math.round((this.lengthbr)*10)/10.0).toString() + " Million years ago";
    }
    else
    {
        if (this.lengthbr >1)
        {
            return (Math.round((this.lengthbr)*100)/100.0).toString()  + " Million years ago";
        }
        else
        {
            return (Math.round((this.lengthbr)*10000)/10.0).toString()  + " Thousand years ago";
        }
    }
}

midnode.prototype.datefull = function()
{
    if (this.lengthbr >10)
    {
        return (Math.round((this.lengthbr)*10)/10.0).toString() + " Million years ago (" + gpmapper(this.lengthbr) + ")";
    }
    else
    {
        if (this.lengthbr >1)
        {
            return (Math.round((this.lengthbr)*100)/100.0).toString()  + " Million years ago (" + gpmapper(this.lengthbr) + ")";
        }
        else
        {
            return (Math.round((this.lengthbr)*10000)/10.0).toString()  + " Thousand years ago (" + gpmapper(this.lengthbr) + ")";
        }
    }
}

midnode.prototype.iprimaryname = function()
{
    if (commonlabels)
    {
        if (this.cname)
        {
            return(this.cname);
        }
        else
        {
            if (this.child1)
            {
                return(this.name1);
            }
            else
            {
                if ((this.name1)&&(this.name2))
                {
                    return(this.name2 + " " + this.name1);
                }
                else
                {
                    return null;
                }
            }
        }
    }
    else
    {
        if (this.child1)
        {
            if (this.name1)
            {
                return(this.name1);
            }
            else
            {
                if (this.cname)
                {
                    return(this.cname);
                }
                else
                {
                    return null;
                }
            }
        }
        else
        {
            if ((this.name1)&&(this.name2))
            {
                return(this.name2 + " " + this.name1);
            }
            else
            {
                if (this.cname)
                {
                    return(this.cname);
                }
                else
                {
                    return null;
                }
            }
        }
    }
}

midnode.prototype.isecondaryname = function()
{
    if ((this.name1) && (this.cname))
    {
        if ((this.name1) != (this.cname))
        {
            if (commonlabels)
            {
                if (this.child1)
                {
                    if (this.name1)
                    {
                        return("Scientific name: " + this.name1);
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    if ((this.name1)&&(this.name2))
                    {
                        return("Scientific name: " + this.name2 + " " + this.name1);
                    }
                    else
                    {
                        return null;
                    }
                }
                return null;
            }
            else
            {
                if (this.cname)
                {
                    return("Common name: " + this.cname);
                }
                else
                {
                    return null;
                }
            }
        }
        else
        {
            return null;
        }
    }
    else
    {
        return null;
    }
}


midnode.prototype.draw_sp_back = function(force_draw)
{
    // draw sign posts
    var signdrawn = false;
    var x ;
    var y ;
    var r ;
    if(this.dvar) // we are drawing this part of the tree
    {
        if (this.rvar)
        {
            x = this.xvar;
            y = this.yvar;
            r = this.rvar;
        }
        if ((this.richness_val > 1)&&(this.child1)) // it is an interior node
        {
            if (drawsignposts) // singpost drawing is turned on
            {
                if (this.child1) // probably redundant check that this is an interior node again
                {
                    
                    if (((thresholdtxt*35 < r*(this.hxmax-this.hxmin))&&(r <=thresholdtxt*45))||(this.lengthbr <= timelim))
                    {
         
                        // split imge with title
                        
                        //drawsignposts_common = false;
                        //drawsignposts_latin = false;
                        
                        if ((this.drawsignposts_common&&commonlabels)||(this.drawsignposts_latin&&(!commonlabels))||(force_draw))//(this.cname&&(commonlabels)) // if theshold is below a certain size?
                        {
                            
                            if (!this.leafpic_drawn)
                            {
                                
                                var ratio12 = 0.2;
                                var ratio12r = 0.2;
                                if (viewtype ==3)
                                {
                                    ratio12 = 0.0;
                                    ratio12r = 0.3;

                                }
                                
                                if (viewtype ==2)
                                {
                                    ratio12 = 0.0;
                                    ratio12r = 0.0;
                                    
                                }
                                
                                var centerpointx2 = x+r*(this.hxmax+this.hxmin)/2
                                var centerpointy2 = y+r*(this.hymax+this.hymin)/2
                                var radiusr2 = r*(this.hxmax-this.hxmin)*0.40

                                var centerpointx3 = x+r*this.arcx;
                                var centerpointy3 = y+r*this.arcy;
                                var radiusr3 = r*this.arcr*6.0;
                                
                                var centerpointx = ratio12*centerpointx3+(1-ratio12)*centerpointx2;
                                var centerpointy = ratio12*centerpointy3+(1-ratio12)*centerpointy2;
                                var radiusr = ratio12r*radiusr3+(1-ratio12r)*radiusr2;
                                
                                
                                
                                // context.arc(centerpointx,centerpointy-radiusr*0.15,radiusr*0.8,0,Math.PI*2,true);
                                //
                                
                                var bottombox = centerpointy-radiusr*0.2
                                var topbox = centerpointy-radiusr
                                
                                //draw_src(centerpointx-radiusr*1.2/2,centerpointy-radiusr,radiusr*1.2,radiusr*0.8,radiusr/8,context)
                                //context.fill();
                                
                                
                                
                                //context.arc(centerpointx,centerpointy+radiusr*0.4,radiusr*0.6-4,0,Math.PI*2,true);
                                
                                if ((this.picset_code)&&(this.picset_code.length>0))
                                {
                                    
                                    autodraw_lsc(this.picset_code[0],centerpointx,centerpointy,radiusr*0.6,this.metacode);
                                    if(commonlabels&&this.cname)
                                    {
                                        //context.fillStyle = 'rgba(220,230,255,0.65)';
                                        //draw_src(,,,,3,context);
                                        //context.fill()
                                        
                                        //if (draw_button(centerpointx-radiusr*0.6,centerpointy+radiusr*0.6,radiusr*1.2,radiusr*0.2,context,tree_button_style,button_corner,"src",!(mousehold||mouse_disable),mouseX,mouseY,clicking)) {
                                        //
                                       // }
                                        
                                        if(radiusr >= 40)
                                        {
                                        context.fillStyle = 'rgb(0,0,0)';
                                        context.strokeStyle = backgroundcolor;
                                        context.lineCap="round";
                                        context.lineWidth = Math.min(radiusr*0.05,6) ;
                                        autotext2_context(true,false,this.cname ,centerpointx,centerpointy+radiusr*0.6,radiusr*1.2,Math.min(radiusr*0.2,25),context,11);
                                        }
                                        
                                    }
                                    else
                                    {
                                        if ((!commonlabels)&&this.name1)
                                        {
                                            if(radiusr >= 40)
                                            {

                                            context.fillStyle = 'rgb(0,0,0)';
                                            context.strokeStyle = backgroundcolor;
                                            context.lineCap="round";
                                            context.lineWidth = Math.min(radiusr*0.05,6) ;
                                            autotext2_context(true,false,this.name1 ,centerpointx,centerpointy+radiusr*0.6,radiusr*1.2,Math.min(radiusr*0.2,25),context,11);
                                            }
                                        }
                                    }
                                    
                                }
                                else
                                {
                                    if(commonlabels&&this.cname)
                                    {
                                        context.fillStyle = 'rgb(0,0,0)';
                                        context.strokeStyle = backgroundcolor;
                                        context.lineCap="round";
                                        context.lineWidth = Math.min(radiusr*0.08,6) ;
                                        autotext2_context(true,false,this.cname ,centerpointx,centerpointy,radiusr*2,Math.min(radiusr*0.8,25),context,11);
                                    }
                                    else
                                    {
                                        if ((!commonlabels)&&this.name1)
                                        {
                                            context.fillStyle = 'rgb(0,0,0)';
                                            context.strokeStyle = backgroundcolor;
                                            context.lineCap="round";
                                            context.lineWidth = Math.min(radiusr*0.08,6) ;
                                            autotext2_context(true,false,this.name1 ,centerpointx,centerpointy,radiusr*2,Math.min(radiusr*0.8,25),context,11);
                                        }
                                    }

                                }
                                
                                force_draw = false;
                                signdrawn = true;
                            }
                            else
                            {
                                force_draw = true;
                            }
                            
                            
                        }
                        
                        
                        

                        
                    }
                    if (!signdrawn)
                    {
                        if (this.lengthbr > timelim)
                        {
                            
                            this.child1.draw_sp_back (force_draw)
                            this.child2.draw_sp_back (force_draw)
                        }
                    }
                }
                
            }
            
        }
    }
}

midnode.prototype.draw_sp_txt = function()
{
    /*
    // draw sign posts
    var signdrawn = false;
    var x ;
    var y ;
    var r ;
    if(this.dvar)
    {
        if (this.rvar)
        {
            x = this.xvar;
            y = this.yvar;
            r = this.rvar;
        }
        if (this.richness_val > 1)
        {
            
            if (drawsignposts)
            {
                if (this.child1)
                {
                    
                    
                    if (((thresholdtxt*35 < r*(this.hxmax-this.hxmin))&&(r <=thresholdtxt*50))||(this.lengthbr <= timelim))
                    {
                        if (this.name1&&(!commonlabels)) // white signposts
                        {
                            
                            context.fillStyle = 'rgb(0,0,0)';
                            autotext3(true,this.name1 ,x+r*(this.hxmax+this.hxmin)/2,y+r*(this.hymax+this.hymin)/2,r*(this.hxmax-this.hxmin)*0.53,r*((this.hxmax-this.hxmin)/6.5));
                            signdrawn = true;
                            
                        }
                        if (this.cname&&(commonlabels)) // white signposts
                        {
                            
                            context.fillStyle = 'rgb(0,0,0)';
                            autotext3(true,this.cname ,x+r*(this.hxmax+this.hxmin)/2,y+r*(this.hymax+this.hymin)/2,r*(this.hxmax-this.hxmin)*0.53,r*((this.hxmax-this.hxmin)/6.5));
                            signdrawn = true;
                            
                        }
                    }
                    if (!signdrawn)
                    {
                        if (this.lengthbr > timelim)
                        {
                            this.child1.draw_sp_txt ()
                            this.child2.draw_sp_txt ()
                        }
                    }
                }
                
            }
        }
    }
     */
}



// drawing the tree
midnode.prototype.draw = function()
{
    
   
    
    var signdone = false;
    var x ;
    var y ;
    var r ;
    if(this.dvar)
    {
        if (this.rvar)
        {
            x = this.xvar;
            y = this.yvar;
            r = this.rvar;
        }
        if ((this.child1)&&(this.lengthbr > timelim))
        {
            if ((this.child1.richness_val) >= (this.child2.richness_val))
            {
                signdone = this.child1.draw () || signdone;
                signdone = this.child2.draw () || signdone;
            }
            else
            {
                signdone = this.child2.draw () || signdone;
                signdone = this.child1.draw () || signdone;
            }
            
            this.leafpic_drawn = ((this.child1.leafpic_drawn)||(this.child2.leafpic_drawn));
            
            
            
            
        }
        var ing = false; // if we are in the region where graphics need to be drawn
        
        
        
        
        if((this.gvar)&&((polytype!=2)||(this.npolyt)))
        {
            // draw the branch curve (with highlights if necessary)
            ing = true;
            context.lineCap = "round";
            context.lineWidth = r*(this.bezr);
            context.beginPath();
            context.moveTo(x+r*(this.bezsx),y+r*this.bezsy);
            context.bezierCurveTo(x+r*(this.bezc1x),y+r*(this.bezc1y),x+r*(this.bezc2x),y+r*(this.bezc2y),x+r*(this.bezex),y+r*(this.bezey));
            context.strokeStyle = this.branchcolor();
            context.stroke();
            if (((highlight_search)&&(this.searchin > 0))||(screensaver_on&&flying&&this.targeted))
            {
                context.strokeStyle = this.highlightcolor();
                context.lineWidth = r*(this.bezr)/4.0;
                context.beginPath();
                context.moveTo(x+r*(this.bezsx),y+r*this.bezsy);
                context.bezierCurveTo(x+r*(this.bezc1x),y+r*(this.bezc1y),x+r*(this.bezc2x),y+r*(this.bezc2y),x+r*(this.bezex),y+r*(this.bezey));
                context.stroke();
            }
        }
        if (this.lengthbr > timelim)
        {
            // draw the main parts of the vis for this node
            if (((this.richness_val > 1)&&(r<=threshold))&&(timelim <= 0))
            {
                // we are drawing a fake leaf - ing is irrelevant as this is instead of drawing the children
                this.fakeleaflogic(x+((r)*(this.nextx1)),y+(r)*(this.nexty1),r*leafmult*0.75*partc,this.arca);
            }
            else
            {
                if (ing)
                {
                    if (this.richness_val > 1)
                    {
                        if (this.child1)
                        {
                            
                            // START INT NODE DETAILS
                            
                            // interior node drawing starts here
                            // first set up the variables that decide text size
                            var temp_twidth = (r*partc-r*partl2)*Twidth;
                            var temp_theight = (r*partc-r*partl2)*Tsize/2.0;
                            var temp_theight_2 = (r*partc-r*partl2)*Tsize/3.0;
                            
                            
                            
                            if ((((highlight_search)&&(this.searchin > 0)))||(screensaver_on&&flying&&this.targeted))
                            {
                                // this piece of logic draws the arc background if needed (no text)
                                // that means overwriting the highlights on the branches to leave a clean circle if needed
                                context.beginPath();
                                context.arc(x+r*(this.arcx),y+r*this.arcy,r*this.arcr,0,Math.PI*2,true);
                                context.fillStyle = this.branchcolor();
                                context.fill();
                                if (!((this.npolyt)||(polytype == 3)))
                                {
                                    context.beginPath();
                                    context.arc(x+r*(this.arcx),y+r*this.arcy,r*this.arcr*0.5,0,Math.PI*2,true);
                                    context.fillStyle = this.highlightcolor();
                                    context.fill();
                                }
                                
                            }
                            if (((this.npolyt)||((highlight_search)&&(this.searchin > 0)))||(polytype == 3))
                            {
                                // we are drawing an internal circle
                                if(((r > thresholdtxt*45)))
                                {
                                    if (intcircdraw)
                                    {
                                        // draw the circle around the interior node
                                        context.beginPath();
                                        context.arc(x+r*(this.arcx),y+r*this.arcy,r*this.arcr*(1-partl2/2.0),0,Math.PI*2,true);
                                        context.lineWidth = r*this.arcr*partl2;
                                        if (((highlight_search)&&(this.searchin > 0))||(screensaver_on&&flying&&this.targeted))
                                        {
                                            context.strokeStyle = this.highlightcolor();
                                        }
                                        else
                                        {
                                            context.strokeStyle = this.highlightcolor2();
                                        }
                                        context.stroke();
                                    }
                                }
                                else
                                {
                                    // draw the arrows for search results highlighting in the distance
                                    if (intcircdraw)
                                    {
                                        if ((((highlight_search)&&(this.searchin > 0))||(screensaver_on&&flying&&this.targeted))&&((r*this.arcr*partl2*2)>0.3))
                                        {
                                            var angle = this.arca;
                                            
                                            var tempsinpre = Math.sin(angle);
                                            var tempcospre = Math.cos(angle);
                                            var tempsin90pre = Math.sin(angle + Math.PI/2.0);
                                            var tempcos90pre = Math.cos(angle + Math.PI/2.0);
                                            context.beginPath();
                                            context.lineTo( x+r*(this.arcx) + 0.4*r*this.arcr*tempcospre, y+r*this.arcy + 0.4*r*this.arcr*tempsinpre);
                                            context.lineTo( x+r*(this.arcx) - 1*r*this.arcr*tempcospre+ 0.7*r*this.arcr*tempcos90pre, y+r*this.arcy - 1*r*this.arcr*tempsinpre+ 0.7*r*this.arcr*tempsin90pre);
                                            context.lineTo( x+r*(this.arcx) - 1*r*this.arcr*tempcospre- 0.7*r*this.arcr*tempcos90pre, y+r*this.arcy - 1*r*this.arcr*tempsinpre- 0.7*r*this.arcr*tempsin90pre);
                                            context.lineTo( x+r*(this.arcx) + 0.4*r*this.arcr*tempcospre , y+r*this.arcy + 0.4*r*this.arcr*tempsinpre);
                                            context.fillStyle = this.branchcolor();
                                            context.fill();
                                            context.fillStyle = this.highlightcolor();
                                            context.fill();
                                            
                                        }
                                    }
                                }
                            }
                            // internal text drawing starts here *****
                            if ((this.npolyt)||(polytype == 3))
                            {
                                // we're drawing the interior node details now
                                // we mustn't draw anythig unless r > thresholdtxt * 50
                                // otherwise we'll have the text but no circle or the text will be overwritten by an arrow
                                
                                // define the text to draw if there are search hits
                                var hittext = null;
                                if ((highlight_search)&&(this.searchin > 0))
                                {
                                    if (this.searchin > 1)
                                    {
                                        hittext = (this.searchin).toString() + " hits" ;
                                    }
                                    else
                                    {
                                        hittext = "1 hit";
                                    }
                                }
                                
                                if(r > thresholdtxt*45)
                                {
                                    if(r > thresholdtxt*200)
                                    {
                                        if (this.num_pics > 0)
                                        {
                                            
                                            this.autopic_set(x+r*this.arcx,y+r*this.arcy-temp_twidth*0.15,temp_twidth*1.5,temp_twidth*0.67);
                                            
                                            var CA_text = null;
                                            
                                            if ((this.lengthbr)&&(this.lengthbr>0))
                                            {
                                                context.fillStyle = this.datetextcolor();
                                                if (this.lengthbr >10)
                                                {
                                                    autotext(false,(Math.round((this.lengthbr)*10)/10.0).toString() + " million years ago,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.97,temp_twidth*0.7,temp_theight_2/7);
                                                }
                                                else
                                                {
                                                    if (this.lengthbr >1)
                                                    {
                                                        autotext(false,(Math.round((this.lengthbr)*100)/100.0).toString()  + " million years ago,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.97,temp_twidth*0.7,temp_theight_2/7);
                                                    }
                                                    else
                                                    {
                                                        autotext(false,(Math.round((this.lengthbr)*10000)/10.0).toString()  + " thousand years ago,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.97,temp_twidth*0.7,temp_theight_2/7);
                                                    }
                                                }
                                                autotext(false,"during the " + gpmapper(this.lengthbr) + " period,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.75,temp_twidth,temp_theight_2/7);
                                                if ((this.iprimaryname())||(this.isecondaryname()))
                                                {
                                                    CA_text = "lived the most recent common ancestor to today's ...";
                                                }
                                                else
                                                {
                                                    CA_text = "lived the most recent common ancestor to ...";
                                                }
                                            }
                                            else
                                            {
                                                autotext(false,"Date unknown.", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.75,temp_twidth,temp_theight_2/7);
                                                if ((this.iprimaryname())||(this.isecondaryname()))
                                                {
                                                    CA_text = "The most recent common ancestor to today's ...";
                                                }
                                                else
                                                {
                                                    CA_text = "The most recent common ancestor to ...";
                                                }
                                            }
                                            
                                            autotext(false,CA_text, x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.53,temp_twidth*1.2,temp_theight_2/7);
                                            
                                            
                                            
                                            var speciestext1 = this.node_spec_txtline1();
                                            var speciestexthead;
                                            
                                            
                                            if ((highlight_search)&&(this.searchin > 0))
                                            {
                                                if (this.searchin > 1)
                                                {
                                                    speciestext1 += ", " + (this.searchin).toString() + " are search hits" ;
                                                }
                                                else
                                                {
                                                    speciestext1 += ", 1 is a search hit";
                                                }
                                                
                                            }
                                            
                                            if (this.iprimaryname())
                                            {
                                                speciestexthead =this.iprimaryname() /* + this.metacode.toString()  choosepop_todo*/
                                                if (this.isecondaryname())
                                                {
                                                    speciestext1 =  this.isecondaryname() + ", " + speciestext1;
                                                }
                                            }
                                            else
                                            {
                                                speciestexthead = (this.richness_val).toString() + " species";
                                            }
                                            
                                            context.fillStyle = intnodetextcolor;
                                            autotext(true,speciestexthead , x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.77,temp_twidth*1.37,temp_theight_2/2.5);
                                            autotext(false,speciestext1,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*1.1,temp_twidth*1.25,temp_theight_2/10.0);
                                            
                                            if (draw_first_pie == -1)
                                            {
                                                // phylogenetic diversity text
                                                if (this.lengthbr > 0) {
                                                    var pdtxt;
                                                    if (this.phylogenetic_diversity > 1000.0) {
                                                        pdtxt = (Math.round(this.phylogenetic_diversity / 100) / 10.0).toString() + " billion years total phylogenetic diversity"
                                                    } else {
                                                        pdtxt = (Math.round(this.phylogenetic_diversity)).toString() + " million years total phylogenetic diversity"
                                                    }
                                                    autotext(false,pdtxt,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*1.25,temp_twidth*1.25,temp_theight_2/10.0);
                                                }
                                            }
                                            
                                            
                                            
                                            if (this.num_sounds > 0)
                                            {
                                                if (draw_first_pie == 1)
                                                {
                                                    this.drawPieSet(x+r*this.arcx+r*0.6 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.62 , r * this.arcr * 0.135);
                                                    this.drawSpeakerSet(x+r*this.arcx-r*0.92 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.62,r * this.arcr * 0.135,(this.playing_sound)&&nowplaying&&((thisSound.duration&&(thisSound.currentTime<thisSound.duration))||justplayednew));
                                                }
                                                else
                                                {
                                                    this.drawSpeakerSet(x+r*this.arcx , y +r*this.arcy+ r * this.arcr * 0.7,r * this.arcr * 0.135,(this.playing_sound)&&nowplaying&&((thisSound.duration&&(thisSound.currentTime<thisSound.duration))||justplayednew));
                                                }
                                            }
                                            else
                                            {
                                                if (draw_first_pie == 1)
                                                {
                                                    if (draw_second_pie == 1)
                                                    {
                                                        this.drawPieSet(x+r*this.arcx+r*0.73 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.62 , r * this.arcr * 0.13);
                                                        this.drawPieSet_2(x+r*this.arcx-r*0.86 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.62,r * this.arcr * 0.13);
                                                    }
                                                    else
                                                    {
                                                        this.drawPieSet(x+r*this.arcx, y +r*this.arcy+ r * this.arcr * 0.67 , r * this.arcr * 0.167);
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            // DO THE TEXT
                                            
                                            var CA_text = null;
                                            
                                            if ((this.child1))
                                            {
                                                if ((this.lengthbr)&&(this.lengthbr>0))
                                                {
                                                    context.fillStyle = this.datetextcolor();
                                                    if (this.lengthbr >10)
                                                    {
                                                        autotext(false,(Math.round((this.lengthbr)*10)/10.0).toString() + " million years ago,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.6,temp_twidth,temp_theight_2/6);
                                                    }
                                                    else
                                                    {
                                                        if (this.lengthbr >1)
                                                        {
                                                            autotext(false,(Math.round((this.lengthbr)*100)/100.0).toString()  + " million years ago,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.6,temp_twidth,temp_theight_2/6);
                                                        }
                                                        else
                                                        {
                                                            autotext(false,(Math.round((this.lengthbr)*10000)/10.0).toString()  + " thousand years ago,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.6,temp_twidth,temp_theight_2/6);
                                                        }
                                                    }
                                                    autotext(false,"during the " + gpmapper(this.lengthbr) + " period,", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.35,temp_twidth*1.2,temp_theight_2/6);
                                                    if ((this.iprimaryname())||(this.isecondaryname()))
                                                    {
                                                        CA_text = "lived the most recent common ancestor to today's ...";
                                                    }
                                                    else
                                                    {
                                                        CA_text = "lived the most recent common ancestor to ...";
                                                        
                                                    }
                                                }
                                                else
                                                {
                                                    autotext(false,"Date unknown.", x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.35,temp_twidth*1.2,temp_theight_2/6);
                                                    if ((this.iprimaryname())||(this.isecondaryname()))
                                                    {
                                                        CA_text = "The most recent common ancestor to today's ...";
                                                    }
                                                    else
                                                    {
                                                        CA_text = "The most recent common ancestor to ...";
                                                        
                                                    }
                                                }
                                            }
                                            
                                            autotext(false,CA_text, x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.1,temp_twidth*1.5,temp_theight_2/6);
                                            
                                            var speciestext1 = this.node_spec_txtline1();
                                            
                                            if ((highlight_search)&&(this.searchin > 0))
                                            {
                                                if (this.searchin > 1)
                                                {
                                                    speciestext1 += ", " + (this.searchin).toString() + " are search hits" ;
                                                }
                                                else
                                                {
                                                    speciestext1 += ", 1 is a search hit";
                                                }
                                                
                                            }
                                            
                                            if (this.iprimaryname())
                                            {
                                                // there is a name
                                                context.fillStyle = intnodetextcolor;
                                                if (!this.isecondaryname())
                                                {
                                                    autotext(true,this.iprimaryname() , x+r*this.arcx,y+r*this.arcy-temp_theight_2*0.25,temp_twidth*1.35,temp_theight_2/1.5);
                                                }
                                                else
                                                {
                                                    autotext(true,this.iprimaryname() , x+r*this.arcx,y+r*this.arcy-temp_theight_2*0.5,temp_twidth*1.35,temp_theight_2*0.5);
                                                    autotext(true,this.isecondaryname() , x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.1,temp_twidth*1.1,temp_theight_2/4);
                                                }
                                                
                                                context.fillStyle = this.richnesstextcolor();
                                                
                                                autotext(false,speciestext1,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.45,temp_twidth*1.5,temp_theight_2/7.0);
                                                
                                                var linkpos = 0;
                                                
                                            }
                                            else
                                            {
                                                
                                                context.fillStyle = this.richnesstextcolor();
                                                autotext(false,(this.richness_val).toString() + " species",  x+r*this.arcx,y+r*this.arcy+temp_theight_2*-0.3,temp_twidth*1.35,temp_theight_2/1.5);
                                                autotext(false,speciestext1,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.45,temp_twidth*1.5,temp_theight_2/7.0);
                                                
                                            }
                                            
                                            if (draw_first_pie == -1)
                                            {
                                                // phylogenetic diversity text
                                                if (this.lengthbr > 0) {
                                                    var pdtxt;
                                                    if (this.phylogenetic_diversity > 1000.0) {
                                                        pdtxt = (Math.round(this.phylogenetic_diversity / 100) / 10.0).toString() + " billion years total phylogenetic diversity"
                                                    } else {
                                                        pdtxt = (Math.round(this.phylogenetic_diversity)).toString() + " million years total phylogenetic diversity"
                                                    }
                                                    autotext(false,pdtxt,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.7,temp_twidth*1.5,temp_theight_2/7.0);
                                                }
                                            }
                                            
                                            
                                            if (this.num_sounds > 0)
                                            {
                                                if(draw_first_pie  == 1)
                                                {
                                                    this.drawPieSet(x+r*this.arcx+r*0.8 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.5 , r * this.arcr * 0.165);
                                                    this.drawSpeakerSet(x+r*this.arcx-r*1.2 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.5,r * this.arcr * 0.165,(this.playing_sound)&&nowplaying&&((thisSound.duration&&(thisSound.currentTime<thisSound.duration))||justplayednew));
                                                }
                                                else
                                                {
                                                    this.drawSpeakerSet(x+r*this.arcx , y +r*this.arcy+ r * this.arcr * 0.65,r * this.arcr * 0.165,(this.playing_sound)&&nowplaying&&((thisSound.duration&&(thisSound.currentTime<thisSound.duration))||justplayednew));
                                                }
                                                
                                                
                                            }
                                            else
                                            {
                                                if(draw_first_pie == 1)
                                                {
                                                    if (draw_second_pie == 1)
                                                    {
                                                        this.drawPieSet(x+r*this.arcx+r*1 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.47 , r * this.arcr * 0.16);
                                                        this.drawPieSet_2(x+r*this.arcx-r*1 * this.arcr * 0.35, y +r*this.arcy+ r * this.arcr * 0.47,r * this.arcr * 0.16);
                                                    }
                                                    else
                                                    {
                                                        this.drawPieSet(x+r*this.arcx, y +r*this.arcy+ r * this.arcr * 0.55 , r * this.arcr * 0.22);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        
                                        if (this.name1&&(!commonlabels))
                                        {
                                            context.fillStyle = intnodetextcolor;
                                            autotext(false,this.datepart(),  x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.55,temp_twidth,temp_theight_2*0.6);
                                            
                                            autotext3(true,this.name1 , x+r*this.arcx,y+r*this.arcy,1.75*r*this.arcr*(1-partl2/2.0),temp_theight_2*0.8);
                                            if ((highlight_search)&&(this.searchin > 0))
                                            {
                                                if (this.searchin > 1)
                                                {
                                                    autotext(false,(this.searchin).toString() + " hits" ,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*1.65,temp_twidth,temp_theight_2*0.6);
                                                }
                                                else
                                                {
                                                    autotext(false,"1 hit" ,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*1.65,temp_twidth,temp_theight_2*0.6);
                                                }
                                            }
                                            
                                        }
                                        else
                                        {
                                            if (this.cname&&(commonlabels))
                                            {
                                                context.fillStyle = intnodetextcolor;
                                                autotext(false,this.datepart() ,  x+r*this.arcx,y+r*this.arcy-temp_theight_2*1.55,temp_twidth,temp_theight_2*0.6);
                                                
                                                autotext3(true,this.cname , x+r*this.arcx,y+r*this.arcy,1.65*r*this.arcr*(1-partl2/2.0),temp_theight_2*0.57);
                                                
                                            }
                                            else
                                            {
                                                context.fillStyle = intnodetextcolor;
                                                
                                                if (this.lengthbr > 0)
                                                {
                                                    autotext(false,(this.richness_val).toString() + " species", x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.2,1.75*r*this.arcr*(1-partl2/2.0),temp_theight_2);
                                                    autotext(false,this.datepart(),  x+r*this.arcx,y+r*this.arcy-temp_theight_2*1,temp_twidth*1.1,temp_theight_2*0.8);
                                                }
                                                else
                                                {
                                                    autotext(false,"Date unknown", x+r*this.arcx,y+r*this.arcy+temp_theight_2*0.2,1.75*r*this.arcr*(1-partl2/2.0),temp_theight_2);
                                                    autotext(false,(this.richness_val).toString() + " species",  x+r*this.arcx,y+r*this.arcy-temp_theight_2*1,temp_twidth*1.1,temp_theight_2*0.8);
                                                }
                                                
                                                
                                            }
                                            
                                            
                                            if ((hittext)&&(this.num_sounds > 0))
                                            {
                                                autotext2(false,hittext,  x+r*this.arcx+temp_theight_2*0.6,y+r*this.arcy+temp_theight_2*1.45,temp_twidth,temp_theight_2*0.4);
                                                drawspeaker(x+r*(this.arcx)-temp_theight_2*0.6,y+r*this.arcy+temp_theight_2*1.45,r*this.arcr*0.2,((this.playing_sound)&&(thisSound.duration&&(thisSound.currentTime<thisSound.duration))),context,'rgb(255,255,255)');
                                            }
                                            else
                                            {
                                                if (this.num_sounds > 0)
                                                {
                                                    drawspeaker(x+r*(this.arcx),y+r*this.arcy+temp_theight_2*1.45,r*this.arcr*0.2,((this.playing_sound)&&(thisSound.duration&&(thisSound.currentTime<thisSound.duration))),context,'rgb(255,255,255)');
                                                }
                                                if (hittext)
                                                {
                                                    autotext(false,hittext,  x+r*this.arcx,y+r*this.arcy+temp_theight_2*1.45,temp_twidth*2,temp_theight_2*0.6);
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                            else
                            {
                                // polytomy node filling
                                if (polytype ==1)
                                {
                                    context.beginPath();
                                    context.arc(x+r*(this.arcx),y+r*this.arcy,r*this.arcr,0,Math.PI*2,true);
                                    context.fillStyle = this.barccolor();
                                    context.fill();
                                }
                            } // polytomies
                            
                            
                            // END INT NODE DETAILS
                            
                        }
                        else
                        {
                            // ***&
                            var tempsinpre = Math.sin(this.arca);
                            var tempcospre = Math.cos(this.arca);
                            
                            
                            
                            this.tipleaflogic(x+((r)*this.arcx - r*(0.4)*tempcospre),y+(r)*this.arcy - r*(0.4)*tempsinpre,r*this.arcr,this.arca);
                            if ( (r*leafmult) > threshold*3)
                            {
                                
                                
                                
                                this.leafdetail(x+((r)*this.arcx - r*(0.4)*tempcospre),y+(r)*this.arcy - r*(0.4)*tempsinpre,r*0.666,leafmult,partc,partl2,Twidth,Tsize);
                            }
                        }
                    }
                    else
                    {
                        // we are drawing a leaf
                        this.tipleaflogic(x+((r)*this.arcx),y+(r)*this.arcy,r*this.arcr,this.arca);
                        if ( (r*leafmult) > threshold*10)
                        {
                            this.leafdetail(x+r*this.arcx,y+r*this.arcy,r*0.99,leafmult,partc,partl2,Twidth,Tsize);
                        }
                    }
                }
            }
        }
        if (this.lengthbr <= timelim)
        {
            // for growth animation
            if (this.richness_val > 1)
            {
                this.growthleaflogic(x+((r)*(this.arcx)),y+(r)*(this.arcy),r*leafmult*0.5*partc,this.arca);
            }
            else
            {
                this.tipleaflogic(x+((r)*this.arcx),y+(r)*this.arcy,r*this.arcr,this.arca);
                if ( (r*leafmult) > threshold*10)
                {
                    this.leafdetail(x+r*this.arcx,y+r*this.arcy,r*0.99,leafmult,partc,partl2,Twidth,Tsize);
                }
            }
        }
    }

    return signdone;
}


drawPieSlice = function(x,y,r,pieangle, dataValue, color, total)
{
    // x,y position, radius, start angle of slice
    // value of data for slice out of total and color for slice
    if (dataValue > 0)
    {
        var newpieangle = pieangle + (dataValue / total) * Math.PI * 2 ;
        
        context.fillStyle = color
        context.beginPath();
        context.moveTo(x,y);
        context.arc(x,y,r, pieangle, newpieangle , false);
        context.fill();
    }
};

drawPie = function(x,y,r,piedata,piecolors,pietot)
{
    var pieangle = -piedata[piedata.length-1] / pietot;
    drawPieSlice( x , y , r*(1.0-pieborder/2), pieangle, piedata[0]+piedata[1]+piedata[piedata.length-1], piecolors[0],pietot);
    pieangle = (piedata[0] / pietot) * Math.PI * 2;
    for (i = 1; i < piedata.length-1; i++) {
        drawPieSlice( x , y , r*(1.0-pieborder/2), pieangle, piedata[i]+piedata[i+1]/2, piecolors[i],pietot);
        pieangle = pieangle + (piedata[i] / pietot) * Math.PI * 2;
    }
    drawPieSlice( x , y , r*(1.0-pieborder/2), pieangle, piedata[piedata.length-1], piecolors[piedata.length-1],pietot);
    
    context.strokeStyle = pie_background_color;
    context.lineWidth = r*pieborder;
    context.beginPath();
    context.arc(x , y , r*(1.0-pieborder/2), 0, Math.PI * 2, true);
    context.stroke();
};

drawPieKey = function(x,y,r,w,piedata,piecolors,pietot,pietext1,pietext2,piekey,pietextcol,unit_text) {
    
    // uncomment these to test the box in which we'll draw the key
    //context.fillStyle = 'rgba(0,0,255,0.75)';
    //context.fillRect(x-w/2,y-r,w,r*2);
    
    for (i = 0; i < piecolors.length; i++) {
        context.fillStyle = pie_background_color;
        context.beginPath();
        context.arc(x - w/2 + (i+0.5)*(w/piecolors.length) , y , r, 0, Math.PI * 2, true);
        context.fill();
        
        context.fillStyle = piecolors[i];
        context.beginPath();
        context.arc(x - w/2 + (i+0.5)*(w/piecolors.length) , y , r*(1.0-pieborder), 0, Math.PI * 2, true);
        context.fill();
        
        context.fillStyle = pietextcol;
        
        autotext(false, piekey[i],
                 x - w/2 + (i+0.5)*(w/piecolors.length) , y , r * (1.0-pieborder)*1.5, r*(1.0-pieborder)*0.8);
        
        if(pietext1[i])
        {
            autotext(false, pietext1[i],
                     x - w/2 + (i+0.5)*(w/piecolors.length) , y + r * (1.0-pieborder)*0.46, r*(1.0-pieborder)*1.5,
                     r*(1.0-pieborder)*0.15);
        }
        
        if(pietext2[i])
        {
            autotext(true, pietext2[i],
                     x - w/2 + (i+0.5)*(w/piecolors.length) , y + r * (1.0-pieborder)*0.7, r*(1.0-pieborder)*0.95,
                     r*(1.0-pieborder)*0.15);
        }
        
        autotext(false, (Math.round(10000.0 * (piedata[i] / pietot)) / 100.0).toString() + " %",
                 x - w/2 + (i+0.5)*(w/piecolors.length) , y - r * (1.0-pieborder)*0.7, r*(1.0-pieborder)*0.95,
                 r*(1.0-pieborder)*0.15);
        
        autotext(false, (piedata[i]).toString() + " " + unit_text,
                 x - w/2 + (i+0.5)*(w/piecolors.length) , y - r * (1.0-pieborder)*0.46, r*(1.0-pieborder)*1.5,
                 r*(1.0-pieborder)*0.15);
        
    }
    
};

autodraw_s = function(metacodein,x,y,w,h)
{
    var success = true;
    
    // x and y are for the top left corner
    load_image_s( metacodein);
    if ((!pic_loading_s[pic_vect_s[  metacodein  ]])&&(pic_cache_s[pic_vect_s[  metacodein  ]]))
    {
        context.drawImage(pic_cache_s[pic_vect_s[  metacodein  ]], x,y,w,h);
    }
    else
    {
        success = false;
    }
    return success;
}

autodraw_l = function(metacodein,x,y,w,h)
{

    var success = true;
    // x and y are for the top left corner
    
    load_image_l( metacodein);
    if ((!pic_loading_l[pic_vect_l[  metacodein  ]])&&(pic_cache_l[pic_vect_l[  metacodein  ]]))
    {
        context.drawImage(pic_cache_l[pic_vect_l[  metacodein  ]], x,y,w,h);
    }
    else
    {
        load_image_s( metacodein);
        if ((!pic_loading_s[pic_vect_s[  metacodein  ]])&&(pic_cache_s[pic_vect_s[  metacodein  ]]))
        {
            context.drawImage(pic_cache_s[pic_vect_s[  metacodein  ]], x,y,w,h);
        }
        else
        {
            success = false;
        }
    }
    return success;
}

autodraw_ls = function(metacodein,x,y,w,h)
{
    var success = true;
    if (!((((x+w)<0)||((x)>widthres))||(((y+h)<0)||(y>heightres))))
    {
        if((w>800)||(h>800))
        {
            success = autodraw_l(metacodein,x,y,w,h);
        }
        else
        {
            success = autodraw_s(metacodein,x,y,w,h);
        }
        /* PL_edit
        if((w>500)||(h>500)) */
        if((w>200)||(h>200))
        {
            
            context.fillStyle = 'rgb(255,255,255)';
            context.strokeStyle = 'rgb(0,0,0)';
            context.beginPath();
            /* PL_edit
            var crs_width = 0.02;// copyright symbol size */
            var crs_width = 0.08;
            if (h > w)
            {
                crs_width = crs_width*h;
            }
            else
            {
                crs_width = crs_width*w;
            }
            context.lineWidth = (crs_width/5);
            
            /* PL_edit
            context.arc(x+w-crs_width,y+h-crs_width,crs_width*(0.8),0,Math.PI*2,true); */
            context.arc(x,y,crs_width*(0.8),0,Math.PI*2,true);
            context.fill();
            context.stroke();
            context.fillStyle = 'rgb(0,0,0)';
            
            if ((crs_width*(0.8)>30)&&((mc_key_l["piccredit"])&&(metadata.leaf_meta[metacodein][mc_key_l["piccredit"]])))
            {
                if (crs_width*(0.8)>160)
                {
                    /* PL_edit
                    autotext3(false,metadata.leaf_meta[metacodein][mc_key_l["piccredit"]],x+w-crs_width,y+h-crs_width,crs_width*1.25,crs_width); */
                    autotext3(false,metadata.leaf_meta[metacodein][mc_key_l["piccredit"]],x,y,crs_width*1.25,crs_width);
                }
                else
                {
                    /* PL_edit
                    autotext3(false,(metadata.leaf_meta[metacodein][mc_key_l["piccredit"]]).substr(0,30)+" ...",x+w-crs_width,y+h-crs_width,crs_width*1.25,crs_width); */
                    autotext3(false,(metadata.leaf_meta[metacodein][mc_key_l["piccredit"]]).substr(0,30)+" ...",x,y,crs_width*1.25,crs_width);
                }
            }
            else
            {
                /* PL_edit
                autotext(false,"C",x+w-crs_width,y+h-crs_width,crs_width*0.8,crs_width*0.8); */
                autotext(false,"C",x,y,crs_width*0.8,crs_width*0.8);
            }
        }
    }
    return success;
}

autodraw_lsc = function(metacodein,centerpointx,centerpointy,radiusr,tozoomtoin)
{
    
    
    load_image_s( metacodein);
    if ((!pic_loading_s[pic_vect_s[  metacodein  ]])&&(pic_cache_s[pic_vect_s[  metacodein  ]]))
    {
     
        var thismouseover = null; // this will say if the mouse is over the bubble or not
        
        if(((((mouseX-centerpointx)*(mouseX-centerpointx))+((mouseY-centerpointy)*(mouseY-centerpointy)))<=(radiusr*radiusr))&&(!mousehold)&&(!mouse_disable))
        {
            thismouseover = true;
        }
        if (((((((last_x_touch-centerpointx)*(last_x_touch-centerpointx))+((last_y_touch-centerpointy)*(last_y_touch-centerpointy)))<=(radiusr*radiusr)))&&(!pinchhold)&&(touchhold||touch_button)&&touch_click))
        {
           thismouseover = true;
        }
        
        var img_widthx = pic_cache_s[pic_vect_s[  metacodein  ]].width;
        var img_heightx = pic_cache_s[pic_vect_s[  metacodein  ]].height;
        
        context.save();
        
        context.beginPath();
        if(thismouseover)
        {
            context.arc(centerpointx,centerpointy,radiusr*1.05,0,Math.PI*2,true);
            context.fillStyle = 'rgb(220,230,255)';
        }
        else
        {
            context.arc(centerpointx,centerpointy,radiusr,0,Math.PI*2,true);
            context.fillStyle = 'rgba(220,230,255,0.5)';
        }
        
        context.fill();
        
        context.beginPath();
        context.arc(centerpointx,centerpointy,radiusr*0.94,0,Math.PI*2,true);
        
        
        if(thismouseover)
        {
            context.lineWidth = radiusr*0.1;
            context.strokeStyle =  control_line_col;//'rgb(0,0,0)';
        }
        else
        {
            context.lineWidth = radiusr*0.03;
            context.strokeStyle =  picborder_col;
        }
        

        context.stroke();
        context.clip();
        
        context.globalAlpha = 1.0;
    
        if ( img_widthx > img_heightx )
        {
            context.drawImage(pic_cache_s[pic_vect_s[  metacodein  ]], centerpointx-radiusr*Math.pow((img_widthx/img_heightx),0.3),centerpointy-radiusr,radiusr*2*Math.pow((img_widthx/img_heightx),0.3),radiusr*2);

        }
        else
        {
            context.drawImage(pic_cache_s[pic_vect_s[  metacodein  ]], centerpointx-radiusr,centerpointy-radiusr*Math.pow((img_heightx/img_widthx),0.1),radiusr*2,radiusr*2*Math.pow((img_heightx/img_widthx),0.3));
        }
        
        
        context.restore();
        
        
        
        if (((((((last_x_touch-centerpointx)*(last_x_touch-centerpointx))+((last_y_touch-centerpointy)*(last_y_touch-centerpointy)))<=(radiusr*radiusr)))&&(!pinchhold)&&(touchhold||touch_button)&&touch_click)||(thismouseover))
        {
            tap2zoom = tozoomtoin;
            
        }
        
    }
    else
    {
        pics_unloaded = true;
        
    }
}

midnode.prototype.autopic = function(picindex,xin,yin,widthin,heightin)
{
    var picready = false;
    
    load_image_s( this.picset_code[picindex]);
    if ((!pic_loading_s[pic_vect_s[  this.picset_code[picindex] ]])&&(pic_cache_s[pic_vect_s[  this.picset_code[picindex]  ]]))
    {
        picready = true;
    }
    else
    {
        picready = false;
    }

    if (picready)
        
    {
    
        var img_width = (pic_cache_s[pic_vect_s[  this.picset_code[picindex]  ]].width);
        var img_height = (pic_cache_s[pic_vect_s[  this.picset_code[picindex]  ]].height);
    
        if ((img_width/img_height) > (widthin/heightin))
        {
            // width restricted
            img_height = widthin*img_height/img_width;
            img_width = widthin;

            
        }
        else
        {
            // height restricted
            img_width = heightin*img_width/img_height;
            img_height = heightin;

        }
    
        autodraw_ls(this.picset_code[picindex], xin-img_width/2,yin-img_height/2,img_width,img_height);
    
        context.fillStyle = 'rgb(255,255,255)';
    
        
        
        var texttodraw = null;
        if (commonlabels)
        {
            if (metadata.leaf_meta[this.picset_code[picindex]][mc_key_l["common"]])
            {
                texttodraw = metadata.leaf_meta[this.picset_code[picindex]][mc_key_l["common"]];
            }
            else
            {
                texttodraw =  meta2latin(this.picset_code[picindex]);
            }
        }
        else
        {
            if (metadata.leaf_meta[this.picset_code[picindex]][mc_key_l["latin"]])
            {
                texttodraw =  meta2latin(this.picset_code[picindex]);
            }
            else
            {
                texttodraw = meta2latin(this.picset_code[picindex])
            }
        }
        if (texttodraw)
        {
            autotext(false,texttodraw,xin,yin+img_height/2+heightin*(0.0526/2),img_width,heightin*(0.05));
        }
    }
    else
    {
        pics_unloaded = true;
        
    }
}


midnode.prototype.autopic_set = function(xin,yin,widthin,heightin)
{

    if (!((((xin+widthin/2)<0)||((xin-widthin/2)>widthres))||(((yin+heightin/2)<0)||((yin-heightin/2) >heightres))))
    {
    
    // calls autopic for a set of images in 2 rows
    if ((this.picset_code).length < 4)
    {
        var picwidth2 = widthin/((this.picset_code).length);
        for (i = 0 ; i < (this.picset_code).length ; i ++)
        {

                this.autopic(i,xin-widthin/2+picwidth2*(i+0.5),yin,picwidth2*0.95,heightin);
        }
    }
    else
    {
        var toprow = Math.floor(((this.picset_code).length)/2);
        var bottomrow = (this.picset_code).length-toprow;
        var picwidth2 = widthin/(toprow);
        for (ij = 0 ; ij < toprow ; ij ++)
        {

                this.autopic(ij,xin-widthin/2+picwidth2*(ij+0.5),yin-heightin/4,picwidth2*0.95,heightin/2*0.95);
            
        }
        picwidth2 = widthin/(bottomrow);
        for (j = 0 ; j < (bottomrow) ; j ++)
        {

                this.autopic(toprow+j,xin-widthin/2+picwidth2*(j+0.5),yin+heightin/4,picwidth2*0.95,heightin/2*0.95);
            
        }
    }
    }
}

var soundqueue = null;
var queuestop = null; // true when we are about to stop the sound if the mouse button is released
var last_played = null; // the metacode of the last sound that was played

var tap2zoom = null; // used only for tap to zoom options on bubbles

midnode.prototype.drawSpeakerSet = function(x,y,r,waves)
{

    
    // define click field
    var cfxmin = x-r*0.8;
    var cfymin = y-r*0.35;
    var cfxmax = x-r*0.1;
    var cfymax = y+r*0.35;
    
    // define click field2
    var cfxmin2 = x-r*1.7;
    var cfymin2 = y-r*0.35;
    var cfxmax2 = x-r*1.0;
    var cfymax2 = y+r*0.35;
    
    context.fillStyle = 'rgb(255,255,255)';
    context.strokeStyle = 'rgb(255,255,255)';
    
    drawspeaker(x+r, y ,r,waves,context,'rgb(255,255,255)');
    
    // draw text
    if (r > 30)
    {
        if (this.num_sounds > 1)
        {
            autotext2(false,this.num_sounds.toString() + " descendent animal sounds",x-r*0.3,y-r*0.77,r*1.5,r*0.35);
        }
        else
        {
            autotext2(false,"1 descendent animal sound",x-r*0.3,y-r*0.77,r*1.5,r*0.35);
        }
        if (waves&& nowplaying)
        {
            var soundtext;
            if (commonlabels&& metadata.leaf_meta[nowplaying][mc_key_l["common"]])
            {
                soundtext = "Now playing: " + metadata.leaf_meta[nowplaying][mc_key_l["common"]];
            }
            else
            {

                soundtext = "Now playing: " + meta2latin(nowplaying);
            }
            autotext2(false,soundtext,x-r*0.3,y+r*0.77,r*1.5,r*0.35);

        }
        else
        {
            autotext(false,"Touch to start",x-r*0.3,y+r*0.77,r*1.5,r*0.35);
        }
    }

    // draw the picture of the thing playing
    if (waves)
    {
        if ((mc_key_l[data_pic_col])&&(metadata.leaf_meta[nowplaying][mc_key_l[data_pic_col]]))
        {
            var img_width;
            var img_height;
            
            
            var picready = false;
            
            load_image_s( nowplaying);
            if ((!pic_loading_s[pic_vect_s[  nowplaying ]])&&(pic_cache_s[pic_vect_s[  nowplaying  ]]))
            {
                picready = true;
            }
            else
            {
                picready = false;
            }
            
            if (picready)
            {
                
                
                
                // (pic_cache_s[pic_vect_s[  nowplaying  ]].width)
                // (pic_cache_s[pic_vect_s[  nowplaying  ]].height)
                
                
                if ( (pic_cache_s[pic_vect_s[  nowplaying  ]].width) > ( (pic_cache_s[pic_vect_s[  nowplaying  ]].height)/0.7*0.8))
                {
                    img_width = r*0.8;
                    img_height = img_width/(pic_cache_s[pic_vect_s[  nowplaying  ]].width) *(pic_cache_s[pic_vect_s[  nowplaying  ]].height);
                    
                }
                else
                {
                    img_height = r*0.7;
                    img_width = img_height/(pic_cache_s[pic_vect_s[  nowplaying  ]].height)*(pic_cache_s[pic_vect_s[  nowplaying  ]].width); 
                }
                if (Math.max(img_width,img_height)> 50)
                {
                    
                    autodraw_ls(nowplaying,x+r*0.55-img_width/2,y-img_height/2,img_width,img_height);
                }
                else
                {
                    context.fillStyle = 'rgba(0,0,0,0.2)';
                    context.fillRect(x+r*0.55-img_width/2,y-img_height/2,img_width,img_height);
                }
                
            }
            else
            {
                pics_unloaded = true;
            }
        }
    }
    
    var is_clicked = false;
    var is_clicked2 = false;
    
    if (r > 30)
    {
        
        if (((screensaver_on)&&(!flying))&&(x>widthres*0.3)&&(x<widthres*0.7))
        {
            if (!((thisSound.duration)&&(thisSound.currentTime<thisSound.duration)))
            {
                play_sound(this.randomsound());
            }

        }

       if (((((last_x_touch > cfxmin)&&(last_x_touch < cfxmax))&&((last_y_touch > cfymin)&&(last_y_touch < cfymax)))&&(!pinchhold)&&(touchhold||touch_button))
         ||((((mouseX > cfxmin)&&(mouseX < cfxmax))&&((mouseY > cfymin)&&(mouseY < cfymax)))&&(!mousehold)&&(!mouse_disable)))
        {
            if ((this.num_sounds > 1)||(!waves))
            {
                is_clicked = true;
                 if ((((last_x_touch > cfxmin)&&(last_x_touch < cfxmax))&&((last_y_touch > cfymin)&&(last_y_touch < cfymax)))&&(!pinchhold)&&(touchhold||touch_button)) 
                 {
                 	 touch_button = true;
                 }

                if (!soundqueue)
                {
                	soundqueue = this.randomsound();
                	if (((thisSound.currentTime)&&(thisSound.currentTime<thisSound.duration))||(justplayednew&&nowplaying))
                	{
                		// we're already playing something
                		while(soundqueue == nowplaying)
                		{
                			soundqueue = this.randomsound();
                		}
                	}
                }
            }
        }
        
        if (((((last_x_touch > cfxmin2)&&(last_x_touch < cfxmax2))&&((last_y_touch > cfymin2)&&(last_y_touch < cfymax2)))&&(!pinchhold)&&(touchhold||touch_button))
            ||((((mouseX > cfxmin2)&&(mouseX < cfxmax2))&&((mouseY > cfymin2)&&(mouseY < cfymax2)))&&(!mousehold)&&(!mouse_disable)))
        {
            if (waves)
            {
            	    if ((((last_x_touch > cfxmin2)&&(last_x_touch < cfxmax2))&&((last_y_touch > cfymin2)&&(last_y_touch < cfymax2)))&&(!pinchhold)&&(touchhold||touch_button))
            	     {
            	    	    touch_button = true;
            	     }

                is_clicked2 = true;
                queuestop = true;
            }
        }
    }
    
    
    if (waves)
    {
        // draw second box

        var soundtxtcol2;
        
        context.lineWidth = r*0.05;
        context.beginPath();
        context.moveTo( x-r*1.7 , y+r*0.35 );
        context.lineTo( x-r*1.0 , y+r*0.35 );
        context.lineTo( x-r*1.0 , y-r*0.35 );
        context.lineTo( x-r*1.7 , y-r*0.35 );
        context.lineTo( x-r*1.7 , y+r*0.35 );
        
        if (is_clicked2)
        {
            context.fillStyle = 'rgb(255,255,255)';
            context.fill();
            context.strokeStyle = 'rgb(0,0,0)';
            context.stroke();
            soundtxtcol2 = 'rgb(255,255,255)';
            context.fillStyle = 'rgb(0,0,0)';
            
        }
        else
        {
            context.strokeStyle = 'rgb(255,255,255)';
            context.stroke();
            soundtxtcol2 = this.branchcolor();
            context.fillStyle = 'rgb(255,255,255)';
        }
        
        if (is_clicked2)
        {
            soundtxtcol2 = 'rgb(255,255,255)';
            context.fillStyle = 'rgb(0,0,0)';
            
        }
        else
        {
            soundtxtcol2 = this.branchcolor();
            context.fillStyle = 'rgb(255,255,255)';
        }

        
        context.beginPath();
        context.moveTo( x-r*1.55 , y+r*0.2 );
        context.lineTo( x-r*1.15 , y+r*0.2 );
        context.lineTo( x-r*1.15 , y-r*0.2 );
        context.lineTo( x-r*1.55 , y-r*0.2 );
        context.lineTo( x-r*1.55, y+r*0.2 );
        context.fill();
        
        context.fillStyle = soundtxtcol2;
        autotext(false,"Stop sound",x-r*1.35,y,r*0.3,r*0.05);

    }

    if ((this.num_sounds > 1)||(!waves))
    {
        
        // draw first box
        context.lineWidth = r*0.05;
        context.beginPath();
        context.moveTo( x-r*0.8 , y+r*0.35 );
        context.lineTo( x-r*0.1 , y+r*0.35 );
        context.lineTo( x-r*0.1 , y-r*0.35 );
        context.lineTo( x-r*0.8 , y-r*0.35 );
        context.lineTo( x-r*0.8 , y+r*0.35 );
        
        
        var soundtxtcol;
        if (is_clicked)
        {
            context.fillStyle = 'rgb(255,255,255)';
            context.fill();
            context.strokeStyle = 'rgb(0,0,0)';
            context.stroke();
            soundtxtcol = 'rgb(255,255,255)';
            context.fillStyle = 'rgb(0,0,0)';
            
        }
        else
        {
            context.strokeStyle = 'rgb(255,255,255)';
            context.stroke();
            soundtxtcol = this.branchcolor();
            context.fillStyle = 'rgb(255,255,255)';
        }
        


        
        if (waves)
        {
            
            if (is_clicked)
            {
                soundtxtcol = 'rgb(255,255,255)';
                context.fillStyle = 'rgb(0,0,0)';
                
            }
            else
            {
                soundtxtcol = this.branchcolor();
                context.fillStyle = 'rgb(255,255,255)';
            }
            
            context.lineWidth = r*0.05;
            
            context.beginPath();
            context.moveTo( x-r*0.45 , y+r*0.2 );
            context.lineTo( x-r*0.2 , y );
            context.lineTo( x-r*0.45 , y-r*0.2 );
            context.lineTo( x-r*0.45 , y-r*0.2 );
            
            context.fill();
            
            context.beginPath();
            context.moveTo( x-r*0.65 , y+r*0.2 );
            context.lineTo( x-r*0.4 , y );
            context.lineTo( x-r*0.65 , y-r*0.2 );
            context.lineTo( x-r*0.65 , y-r*0.2 );
            
            context.fill();
            
            context.beginPath();
            context.moveTo( x-r*0.22 , y+r*0.2 );
            context.lineTo( x-r*0.22 , y-r*0.2 );
            
            context.stroke();
            
            context.fillStyle = soundtxtcol;
            autotext(false,"New random sound",x-r*0.45,y,r*0.3,r*0.05);
            
            
        }
        else
        {
            context.beginPath();
            context.moveTo( x-r*0.65 , y+r*0.3 );
            context.lineTo( x-r*0.25 , y );
            context.lineTo( x-r*0.65 , y-r*0.3 );
            context.lineTo( x-r*0.65 , y-r*0.3 );
            
            context.fill();
            
            context.fillStyle = soundtxtcol;
            autotext(false,"Play random sound",x-r*0.47,y,r*0.3,r*0.05);
            
        }
        
    }
    //  context.fillStyle = 'rgba(255,0,255,0.3)';
    // context.fillRect(cfxmin,cfymin,cfxmax-cfxmin,cfymax-cfymin);
    
}


midnode.prototype.drawspeaker_leaf = function(x,y,r,waves)
{
    
    
    
    // define click field
    var cfxmin = x-r*1.0;
    var cfymin = y-r*0.4;
    var cfxmax = x-r*0.2;
    var cfymax = y+r*0.4;
    
    
    context.fillStyle = 'rgb(255,255,255)';
    context.strokeStyle = 'rgb(255,255,255)';
    
    drawspeaker(x+r, y ,r,waves,context,'rgb(255,255,255)');
    
    if (r > 30)
    {
        autotext2(false,"Animal sound player",x-r*0.3,y-r*0.77,r*1.5,r*0.35);
        if (waves)
        {
            var soundtext;
            soundtext = "Touch to stop sound";
            autotext(false,soundtext,x-r*0.3,y+r*0.77,r*1.5,r*0.35);
            
        }
        else
        {
            autotext(false,"Touch to play sound",x-r*0.3,y+r*0.77,r*1.5,r*0.35);
        }
    }
    
    var is_clicked = false;

    
    if (r > 30)
    {
        if (((((last_x_touch > cfxmin)&&(last_x_touch < cfxmax))&&((last_y_touch > cfymin)&&(last_y_touch < cfymax)))&&(!pinchhold)&&(touchhold||touch_button))
            ||((((mouseX > cfxmin)&&(mouseX < cfxmax))&&((mouseY > cfymin)&&(mouseY < cfymax)))&&(!mousehold)&&(!mouse_disable)))
        {
            is_clicked = true;
              if ((((last_x_touch > cfxmin)&&(last_x_touch < cfxmax))&&((last_y_touch > cfymin)&&(last_y_touch < cfymax)))&&(!pinchhold)&&(touchhold||touch_button))
              {
              	      touch_button = true;
              }     
            if ((nowplaying==this.metacode)&&(((thisSound.duration)&&(thisSound.currentTime<thisSound.duration))))
            {
                //thisSound.currentTime = thisSound.duration;
                //leaf_sound_playing = false;
                queuestop = true;
            }
            else
            {
                soundqueue = this.metacode;
            }
        }
    }

    
    context.lineWidth = r*0.05;
    context.beginPath();
    context.moveTo( x-r*1.0 , y+r*0.4 );
    context.lineTo( x-r*0.2 , y+r*0.4 );
    context.lineTo( x-r*0.2 , y-r*0.4 );
    context.lineTo( x-r*1.0 , y-r*0.4 );
    context.lineTo( x-r*1.0 , y+r*0.4 );
    
    var soundtxtcol;
    if (is_clicked)
    {
        context.fillStyle = 'rgb(255,255,255)';
        context.fill();
        context.strokeStyle = 'rgb(0,0,0)';
        context.stroke();
        soundtxtcol = 'rgb(255,255,255)';
        context.fillStyle = 'rgb(0,0,0)';
        
    }
    else
    {
        context.strokeStyle = 'rgb(255,255,255)';
        context.stroke();
        soundtxtcol = this.leafcolor1();
        context.fillStyle = 'rgb(255,255,255)';
    }
    
    if (waves)
    {
        context.beginPath();
        context.moveTo( x-r*0.8 , y+r*0.2 );
        context.lineTo( x-r*0.4 , y+r*0.2 );
        context.lineTo( x-r*0.4 , y-r*0.2 );
        context.lineTo( x-r*0.8 , y-r*0.2 );
        context.lineTo( x-r*0.8, y+r*0.2 );

    }
    else
    {
        context.beginPath();
        context.moveTo( x-r*0.8 , y+r*0.3 );
        context.lineTo( x-r*0.4 , y );
        context.lineTo( x-r*0.8 , y-r*0.3 );
        context.lineTo( x-r*0.8 , y-r*0.3 );
    }
    
    context.fill();
    
    context.fillStyle = soundtxtcol;
    if (waves)
    {
        autotext(false,"Stop sound",x-r*0.62,y,r*0.3,r*0.05);
    }
    else
    {
        autotext(false,"Play sound",x-r*0.62,y,r*0.3,r*0.05);
    }
}







midnode.prototype.leafdetail = function(x,y,r,leafmult,partc,partl2,Twidth,Tsize)
{
    
    // autodraw_lsc
    
    // load_image_l(index_to_load)
    var temp_twidth = (r*leafmult*partc-r*leafmult*partl2)*Twidth;
    var temp_theight = ((r*leafmult*partc-r*leafmult*partl2)*Tsize/3.0);
    
    var soundx = x, soundy = y+r*0.84 ; // the position of the sound button
    var soundr = r*0.1;
    
    this.leafpic_drawn = false;
    
    if (this.pic_qual)
    {
        
        if (r > (thresholdtxt*16))
        {
            this.leafpic_drawn = true;
            if (r > (thresholdtxt*32))
            {
                context.fillStyle = this.leafcolor3();
             
                var picready = false;

                load_image_s( this.metacode);
                if ((!pic_loading_s[pic_vect_s[  this.metacode  ]])&&(pic_cache_s[pic_vect_s[  this.metacode  ]]))
                {
                    picready = true;
                }
                else
                {
                    picready = false;
                }
                
                var img_width;
                var img_height;
                var pic_txt = 1.5; // 1+ proportion of total picture height given over to text
                
                if (picready)
                {
                    
                    if ( (pic_cache_s[pic_vect_s[  this.metacode  ]].width) > ((pic_cache_s[pic_vect_s[  this.metacode  ]].height)*(1+pic_txt)))
                    {
                        var imgx = (( (pic_cache_s[pic_vect_s[  this.metacode  ]].width))/( (pic_cache_s[pic_vect_s[  this.metacode  ]].height)*pic_txt));
                        img_height = (2*r*leafmult*0.3)/Math.sqrt(1+(imgx*imgx));
                        img_width = img_height*imgx;
                    }
                    else
                    {
                        var imgx = (( (pic_cache_s[pic_vect_s[  this.metacode  ]].height)*pic_txt)/( (pic_cache_s[pic_vect_s[  this.metacode  ]].width)));
                        img_width = (2*r*leafmult*0.3)/Math.sqrt(1+(imgx*imgx));
                        img_height = img_width*imgx;
                    }
                    
                    img_height = img_height/pic_txt;
                    
                    var leaf_txt_width = img_width; // textbox width
                    var leaf_txt_height = img_height*(pic_txt-1); // textbox height
                    var leaf_txt_yc = y+(img_height)/2; // y axis centre
                    var leaf_txt_xc = x; // x axis centre
                    
                    
                    
                    if ((img_height>img_width*2.2)||(img_height*2.2<img_width))
                    {
                        var zvar = 2;
                        var rvar = r*leafmult*0.3;
                        var old_leaf_txt_height = leaf_txt_height;
                        leaf_txt_height = (leaf_txt_height-img_height+Math.sqrt(((-leaf_txt_height+img_height)*(-leaf_txt_height+img_height))-(4*((zvar*zvar+1)/2)*(((-leaf_txt_height+img_height)*(-leaf_txt_height+img_height)/4)-(rvar*rvar)))))/(zvar*zvar+1)
                        leaf_txt_width = leaf_txt_height*zvar;
                        leaf_txt_yc =  leaf_txt_yc -(old_leaf_txt_height-leaf_txt_height)/2
                        
                    }
                    
                    
                    if ((this.num_sounds > 0)&&((img_width/img_height)<1.2))
                    {
                        soundx = x+img_width/2+ r*0.18;
                        soundy = y-(img_height*pic_txt)/2 +img_height- r*0.1;
                    }
                    
                }
                else
                {
                    pics_unloaded = true;
                }
                
                picready = (  autodraw_ls(this.metacode, x-img_width/2,y-(img_height*pic_txt)/2,img_width,img_height));
                if (picready)
                {
                    
                    
                    
                    if ( r > thresholdtxt*80)
                    {
                        
                        context.fillStyle = this.leafcolor3();
                        if (this.cname)
                        {
                            if (commonlabels)
                            {
                                autotext(false,this.cname,leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*3),leaf_txt_width,(leaf_txt_height)/2.5);
                                
                                if (this.name2)
                                {
                                    autotext(false,this.name2 + " " + this.name1,leaf_txt_xc,leaf_txt_yc,leaf_txt_width,(leaf_txt_height)/6);
                                }
                                else
                                {
                                    autotext(false,this.name1,leaf_txt_xc,leaf_txt_yc,leaf_txt_width,(leaf_txt_height)/6);
                                }
                                
                            }
                            else
                            {
                                if (this.name2)
                                {
                                    autotext(false,this.name2 + " " + this.name1,leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*3),leaf_txt_width,(leaf_txt_height)/2.5);
                                }
                                else
                                {
                                    autotext(false,this.name1,leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*3),leaf_txt_width,(leaf_txt_height)/2.5);
                                }
                                autotext(false,this.cname,leaf_txt_xc,leaf_txt_yc,leaf_txt_width,(leaf_txt_height)/6);
                            }
                        }
                        else
                        {
                            
                            if (this.name2)
                            {
                                autotext(false,this.name2 + " " + this.name1,leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*3),leaf_txt_width,(leaf_txt_height)/2.5);
                            }
                            else
                            {
                                autotext(false,this.name1,leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*3),leaf_txt_width,(leaf_txt_height)/2.5);
                            }
                            autotext(false,"No common name",leaf_txt_xc,leaf_txt_yc,leaf_txt_width,(leaf_txt_height)/6);
                            
                        }
                        autotext(false,this.leaf_txtline1(),leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*(-2)),leaf_txt_width,(leaf_txt_height)/6);
                        autotext(false,this.leaf_txtline2(),leaf_txt_xc,leaf_txt_yc-((leaf_txt_height)/10.4*(-4)),leaf_txt_width,(leaf_txt_height)/6);
                        
                    }
                    else
                    {
                        context.fillStyle = this.leafcolor3();
                        if (this.iprimaryname()) // todonow
                        {
                            autotext2(false,this.iprimaryname() /*+ this.metacode.toString() popular_select */,leaf_txt_xc,leaf_txt_yc,leaf_txt_width,(leaf_txt_height)/2.2);
                        }
                        else
                        {
                            if (this.isecondaryname())
                            {
                                autotext2(false,this.isecondaryname(),leaf_txt_xc,leaf_txt_yc,leaf_txt_width,(leaf_txt_height)/2.2);
                            }
                        }
                    }
                    
                }
                
            }
            else
            {
                 autodraw_lsc(this.metacode,x,y,r,-this.metacode);
            }

        }
    
    }
    else
    {
        if ( r > thresholdtxt*85)
        {
            
            
            
            context.fillStyle = this.leafcolor3();
            
            if (datahastraits)
            {
                if (this.cname)
                {
                    if (commonlabels)
                    {
                        if (this.name2)
                        {
                            autotext(true,this.name2 + " " + this.name1, x,y-temp_theight*1.3,temp_twidth*1.4,temp_theight*0.5);
                        }
                        else
                        {
                            autotext(true,this.name1, x,y-temp_theight*1.3,temp_twidth*1.4,temp_theight*0.5);
                        }
                        autotext2(false,this.cname,x,y,temp_twidth*1.5,temp_theight*0.75);
                    }
                    else
                    {
                        if (this.name2)
                        {
                            autotext2(true,this.name2 + " " + this.name1, x,y,temp_twidth*1.5,temp_theight*0.75);
                        }
                        else
                        {
                            autotext(true,this.name1, x,y,temp_twidth*1.5,temp_theight*0.75);
                        }
                        autotext2(false,this.cname,x,y-temp_theight*1.3,temp_twidth*1.1,temp_theight*0.4);
                    }
                }
                else
                {
                    autotext(false,"No common name", x,y-temp_theight*1.3,temp_twidth*1.1,temp_theight*0.5);
                    if (this.name2)
                    {
                        autotext2(true,this.name2 + " " + this.name1,x,y,temp_twidth*1.6,temp_theight*0.75);
                    }
                    else
                    {
                        autotext(true,this.name1,x,y,temp_twidth*1.6,temp_theight*0.75);
                    }
                }
                autotext(false,this.leaf_txtline1() , x,y+temp_theight*1.2,temp_twidth*1.4,temp_theight*0.25);
                autotext(false,this.leaf_txtline2() , x,y+temp_theight*1.65,temp_twidth*1.2,temp_theight*0.25);
                
                
            }
            else
            {
                if (this.name2)
                {
                    autotext2(true,this.name2 + " " + this.name1,x,y,temp_twidth*1.6,temp_theight*0.75);
                }
                else
                {
                    autotext2(true,this.name1,x,y,temp_twidth*1.6,temp_theight*0.75);
                }
            }
        }
        else
        {
            if ( r > thresholdtxt*15)
            {
                if (this.num_sounds > 0)
                {
                    soundx = x;
                    soundy = y + r*0.75;
                    soundr = r*0.2
                    
                }
                
                context.fillStyle = this.leafcolor3();
                
                if (datahastraits)
                {
                    if (this.iprimaryname())
                    {
                        autotext3(false,this.iprimaryname() /* + this.metacode.toString()  choosepop_todo*/,x,y,temp_twidth*1.7,temp_theight*0.8);
                    }
                    else
                    {
                        if (this.isecondaryname())
                        {
                            autotext3(false,this.isecondaryname(),x,y,temp_twidth*1.7,temp_theight*0.8);
                        }
                    }
                    //autotext(false,this.extxt() , x,y+temp_theight*1.6,temp_twidth*1.2,temp_theight*0.5);
                    
                }
                else
                {
                    if (this.name2)
                    {
                        autotext3(true,this.name2 + " " + this.name1  /* + this.metacode.toString()  choosepop_todo*/,x,y,temp_twidth*1.6,temp_theight*0.75);
                    }
                    else
                    {
                        autotext3(true,this.name1  /* + this.metacode.toString()  choosepop_todo*/,x,y,temp_twidth*1.6,temp_theight*0.75);
                    }
                }
            }
            else
            {
                soundx = null;
            }
        }
    }
    
    if (((((mc_key_l["sound"])&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]]))&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]] == "1"))&&(r > thresholdtxt*85))&&(onscreen(x,y)||(onscreen(soundx,soundy))))
    {
        if (((! leaf_sound_playing)&&(!screensaver_on))&&((!last_played)||(this.metacode!=last_played)))
        {
        	play_sound(this.metacode);
        	soundqueue = null;
        }
    }
    if (((this.num_sounds > 0)&&(soundx))&&(r > (thresholdtxt*32))) // redundant with above test but included as a check
    {
        
        if ((nowplaying==this.metacode)&&( ((thisSound.duration)&&(thisSound.currentTime<thisSound.duration))))
        {
            this.drawspeaker_leaf(soundx,soundy,soundr,true,context);
        }
        else
        {
            this.drawspeaker_leaf(soundx,soundy,soundr,false,context);
        }
    }
    
}

function onscreen(x,y)
{
    if (x < 0)
    {
        return false;
    }
    if (x > widthres)
    {
        return false;
    }
    if (y < 0)
    {
        return false;
    }
    if (y > heightres)
    {
        return false;
    }
    return true;
}

midnode.prototype.in_centre = function()
{
    return (this.dvar); // todo could improve this
    //(((!((((this.xvar+(this.rvar*this.hxmax))<100)||((this.xvar+(this.rvar*this.hxmin))>(widthres-100)))||(((this.yvar+(this.rvar*this.hymax))<100)||((this.yvar+(this.rvar*this.hymin))>(heightres-100)))))))
}

midnode.prototype.mylocation = function()
{
    
    
    if(this.dvar)     //if(this.dvar)
    {
        if(commonlabels)
        {
            if (this.cname)
            {
                if((this.cname.search("and more") == -1)&&((this.cname.search(",") == -1)))
                {
                    locationtxt += (this.cname);
                    locationvect[locationvect.length] = (this.cname);
                    
                    if (this.child1)
                    {
                        locationtxt += " > ";
                        locationvect_index[locationvect_index.length] = this.metacode;
                        
                    }
                    else
                    {
                        locationvect_index[locationvect_index.length] = (- this.metacode);
                    }
                }
            }
            else
            {
                if (!this.child1)
                {
                    locationtxt += (this.name2 + " " + this.name1);
                    locationvect[locationvect.length] = (this.name2 + " " + this.name1);
                    locationvect_index[locationvect_index.length] = (- this.metacode);
                }
            }
        }
        else
        {
            if (this.child1)
            {
                if (this.name1)
                {
                    locationtxt += (this.name1 + " > " );
                    locationvect[locationvect.length] = this.name1;
                    locationvect_index[locationvect_index.length] = ( this.metacode);
                }
            }
            else
            {
                locationtxt += (this.name2 + " " + this.name1);
                locationvect[locationvect.length] = (this.name2 + " " + this.name1);
                locationvect_index[locationvect_index.length] = (- this.metacode);
            }
        }
        if (this.child1)
        {
            if (this.child1.dvar)
            {
                if (!((this.child2).in_centre()))
                {
                    this.child1.mylocation();
                }
            }
            else
            {
                if (this.child2.dvar)
                {
                    if (!((this.child1).in_centre()))
                    {
                        this.child2.mylocation();
                    }
                }
            }
        }
    }
}



function performsearch2(toclear)
{
    var stringin = searchstring;
   
    last_searched = searchstring;
    
    if (screensaver_on)
    {
        performsearch2b(toclear,"picturebest");
    }
    else
    {
        performsearch2b(toclear,stringin);
    }
}

function performsearch2b(toclear,stringin2)
{
    
    searchinteriornodes = false;
    var changedvar = false;
    var stringin = stringin2;
    
    //stringin = stringin.replace("extinct in the wild", "EW");
    //stringin = stringin.replace("extinct", "EX");
    //stringin = stringin.replace("critically endangered", "CR");
    //stringin = stringin.replace("endangered", "EN");
    //stringin = stringin.replace("vulnerable", "VU");
    //stringin = stringin.replace("near threatened", "NT");
    //stringin = stringin.replace("least concern", "LC");
    //stringin = stringin.replace("data deficient", "DD");
    //stringin = stringin.replace("not evaluated", "NE");
    
    var searchinpartsnew = stringin.split(" ");
    
    if (searchinpartsnew.length == searchinparts.length)
    {
        for (i = 0 ; i < searchinpartsnew.length ; i ++)
        {
            if (searchinpartsnew[i] != searchinparts[i])
            {
                changedvar = true;
            }
        }
    }
    else
    {
        changedvar = true;
    }
    
    // todo7777
    
    //if (commonlabels)
    //{
    //    latin_search = false;
    //    common_search = true;
    //}
    //else
    //{
    //    latin_search = true;
    //    common_search = true;
    //}
    
    // todo7777
    
    traitsearch = true;
    
    if (!changedvar)
    {
        if (toclear)
        {
            fulltree.semiclearsearch();
        }
        changedvar = false;
    }
    else
    {
        fulltree.clearsearch();
        searchinparts = searchinpartsnew;
        
        
        numhits = fulltree.search();
        changedvar = true;
        
    }
    return changedvar;
}

var traitsearch;

midnode.prototype.searchone = function(stringin,leafonly)
{
    var foundstr = 0;
    /*
    if (traitsearch)
    {
        if ((((stringin == "EX")||(stringin == "EW"))||(((stringin == "EN")||(stringin == "CR"))||((stringin == "VU")||(stringin == "NT"))))||(((stringin == "DD")||(stringin == "LC"))||(stringin == "NE")))
        {
            if (!(this.child1))
            {
                if ((this.redlist)&&(this.redlist == stringin))
                {
                    foundstr +=this.richness_val;
                }
            }
        }
        else
        {
            if (((stringin.toLowerCase() == "increasing")&&(this.popstab))&&(this.popstab == "I"))
            {
                foundstr +=this.richness_val;
            }
            else
            {
                if (((stringin.toLowerCase() == "decreasing")&&(this.popstab))&&(this.popstab == "D"))
                {
                    foundstr +=this.richness_val;
                }
                else
                {
                    if (((stringin.toLowerCase() == "stable")&&(this.popstab))&&(this.popstab == "S"))
                    {
                        foundstr +=this.richness_val;
                    }
                    else
                    {
                        if ((stringin.toLowerCase() == "threatened")&&((this.redlist)&&(((this.redlist == "CR")||(this.redlist == "EN"))||(this.redlist == "VU"))))
                        {
                            foundstr +=this.richness_val;
                        }
                    }
                }
            }
        }
    }
    */
    if (foundstr == 0 && latin_search)
    {
        
        if ((stringin.toLowerCase()) == stringin)
        {
            if (!((leafonly)&&(this.child1)))
            {
                if ((this.name1)&&((this.name1.toLowerCase()).search(stringin) != -1))
                {
                    foundstr += this.richness_val;
                }
                else
                {
                    if (((this.name2)&&((this.name2.toLowerCase()).search(stringin) != -1))&&(!this.child1))
                    {
                        foundstr +=this.richness_val;
                    }
                    
                }
                
            }
        }
        else
        {
            if (!((leafonly)&&(this.child1)))
            {
                if ((this.name1)&&((this.name1).search(stringin) != -1))
                {
                    foundstr += this.richness_val;
                }
                else
                {
                    if (((this.name2)&&((this.name2).search(stringin) != -1))&&(!this.child1))
                    {
                        foundstr +=this.richness_val;
                    }
                    
                }
            }
        }
        
    }
    
    if (foundstr == 0 && common_search)
    {
        if (!((leafonly)&&(this.child1)))
        {
            if ((stringin.toLowerCase()) == stringin)
            {
                if ((this.cname)&&((this.cname.toLowerCase()).search(stringin) != -1))
                {
                    foundstr +=this.richness_val;
                }
            }
            else
            {
                if ((this.cname)&&((this.cname).search(stringin) != -1))
                {
                    foundstr +=this.richness_val;
                }
            }
        }
    }
    
    if (!(this.child1))
    {
        if (search_sounds)
        {
            if (!(((mc_key_l["sound"])&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]]))&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]] == "1")))
            {
                foundstr = 0;
            }
        }
        if (search_images)
        {
            if (!((this.num_pics >0)))
            {
                foundstr = 0;
            }
        }
    }
    else
    {
        if (search_sounds)
        {
            foundstr = 0;
        }
        if (search_images)
        {
            foundstr = 0;
        }
        
    }
    
    return (foundstr > 0);
}

midnode.prototype.searchword = function(stringin)
{
    var foundstr = null;
    
    if (common_search&&this.cname)
    {
        var searchinpartsnew = (this.cname.toLowerCase()).split(" ");
        for (i = 0 ; i < searchinpartsnew.length ; i ++)
        {
            if (stringin == searchinpartsnew[i])
            {
                foundstr = true;
            }
        }
    }
    
    if (latin_search)
    {
        if ((this.name1)&&(stringin == (this.name1.toLowerCase())))
        {
            foundstr = true;
        }
        if ((this.name2)&&(stringin == (this.name2.toLowerCase())))
        {
            foundstr = true;
        }
    }

    if (!(this.child1))
    {
        if (search_sounds)
        {
            if (!(((mc_key_l["sound"])&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]]))&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]] == "1")))
            {
                foundstr = null;
            }
        }
        if (search_images)
        {
            if (!((this.num_pics >0)))
            {
                foundstr = null;
            }
        }
    }
    else
    {
        if (search_sounds)
        {
            foundstr = null;
        }
        if (search_images)
        {
            foundstr = null;
        }

    }
    
    return foundstr;
}

midnode.prototype.searchfull = function(stringin_vect)
{
    var foundstr = null;
    
    if (common_search&&this.cname)
    {
        var searchinpartsnew = (this.cname.toLowerCase()).split(" ");
        if (stringin_vect.length == searchinpartsnew.length)
        {
            foundstr = true;
            for (i = 0 ; i < searchinpartsnew.length ; i ++)
            {
                if (stringin_vect[i] != searchinpartsnew[i])
                {
                    foundstr = null;
                }
            }
        }
    }
    
    if ((latin_search)&&(!foundstr))
    {
        if ((stringin_vect.length == 2)&&(!this.child1))
        {
            if (this.name1 || this.name2)
            {
                foundstr = true;
            }
            if ((this.name1)&&(stringin_vect[0] != (this.name1.toLowerCase())))
            {
                foundstr = null;
            }
            if ((this.name2)&&(stringin_vect[1] != (this.name2.toLowerCase())))
            {
                foundstr = null;
            }
        }
        if (((this.child1)&&(stringin_vect.length == 1))&&this.name1)
        {
            foundstr = true;
            if ((stringin_vect[0] != (this.name1.toLowerCase())))
            {
                foundstr = null;
            }
        }
    }
    
    if (!(this.child1))
    {
        if (search_sounds)
        {
            if (!(((mc_key_l["sound"])&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]]))&&(metadata.leaf_meta[this.metacode][mc_key_l["sound"]] == "1")))
            {
                foundstr = null;
            }
        }
        if (search_images)
        {
            if (!((this.num_pics >0)))
            {
                foundstr = null;
            }
        }
    }
    else
    {
        if (search_sounds)
        {
            foundstr = null;
        }
        if (search_images)
        {
            foundstr = null;
        }
        
    }
    
    
    return foundstr;
}


// pictures

midnode.prototype.numgp_counter = function()
{
    if (this.child1)
    {
        this.child1.numgp_counter();
        this.child2.numgp_counter();
        this.num_good_pics = ((this.child1).num_good_pics + (this.child2).num_good_pics);

    }
    else
    {
        if (this.pic_qual > 7)
        {
            this.num_good_pics = 1;
        }
        else
        {
            this.num_good_pics = 0;
        }
    }
}

midnode.prototype.picsort = function()
{
    if (this.child1)
    {
        if (this.num_pics > 0)
        {
            this.child1.picsort();
            this.child2.picsort();
            
            // 1.) decide how many from 1 and how many from 2
            var child1pics = 0;
            if (this.child1.picset_file)
            {
                child1pics = this.child1.picset_file.length;
            }
            var child2pics = 0;
            if (this.child2.picset_file)
            {
                child2pics = this.child2.picset_file.length;
            }
            
            if (child1pics == 0)
            {
                // all from 2 and we're done
                this.picset_file = this.child2.picset_file;
                this.picset_qual = this.child2.picset_qual;
                this.picset_common = this.child2.picset_common;
                this.picset_latin = this.child2.picset_latin;
                this.picset_code = this.child2.picset_code;
                this.MRCA_pic=false;
            }
            else
            {
                if (child2pics == 0)
                {
                    // all from 1 and we're done
                    this.picset_file = this.child1.picset_file;
                    this.picset_qual = this.child1.picset_qual;
                    this.picset_common = this.child1.picset_common;
                    this.picset_latin = this.child1.picset_latin;
                    this.picset_code = this.child1.picset_code;
                    this.MRCA_pic=false;
                }
                else
                {
                    // need a mix from both 1 and 2
                    this.MRCA_pic=true;
                    if ((child2pics + child1pics)> num_int_pics)
                    {
                        if (this.child1.richness_val > this.child2.richness_val)
                        {
                            child2pics = Math.floor(((num_int_pics*this.child2.richness_val)/(this.richness_val))+0.5);
                            if (child2pics < 1)
                            {
                                child2pics = 1;
                            }
                            child1pics = num_int_pics-child2pics;
                        }
                        else
                        {
                            child1pics = Math.floor(((num_int_pics*this.child1.richness_val)/(this.richness_val))+0.5);
                            if (child1pics < 1)
                            {
                                child1pics = 1;
                            }
                            child2pics = num_int_pics-child1pics;
                        }
                        
                        if (child2pics > this.child2.picset_file.length)
                        {
                            child2pics = this.child2.picset_file.length;
                            child1pics = num_int_pics-child2pics;
                        }
                        if (child1pics > this.child1.picset_file.length)
                        {
                            child1pics = this.child1.picset_file.length;
                            child2pics = num_int_pics-child1pics;
                        }
                    }
                    // at this point we know how many pics to choose from 1 and how many from 2
                    
                    // 1.) choose the first two as the top one from each of the two children
                    // 2.) these two should be placed in quality order
                    
                    this.picset_file = new Array();
                    this.picset_qual = new Array();
                    this.picset_common = new Array();
                    this.picset_latin = new Array();
                    this.picset_code = new Array();
                    
                    if((qualcomp(this.child1.picset_qual[0]))>(qualcomp(this.child2.picset_qual[0])))
                    {
                        this.picset_file[0] = this.child1.picset_file[0];
                        this.picset_file[1] = this.child2.picset_file[0];
                        this.picset_code[0] = this.child1.picset_code[0];
                        this.picset_code[1] = this.child2.picset_code[0];
                        this.picset_qual[0] = this.child1.picset_qual[0];
                        this.picset_qual[1] = this.child2.picset_qual[0];
                        this.picset_common[0] = this.child1.picset_common[0];
                        this.picset_common[1] = this.child2.picset_common[0];
                        this.picset_latin[0] = this.child1.picset_latin[0];
                        this.picset_latin[1] = this.child2.picset_latin[0];
                        
                    }
                    else
                    {
                        if((qualcomp(this.child2.picset_qual[0]))>(qualcomp(this.child1.picset_qual[0])))
                        {
                            this.picset_file[0] = this.child2.picset_file[0];
                            this.picset_file[1] = this.child1.picset_file[0];
                            this.picset_code[0] = this.child2.picset_code[0];
                            this.picset_code[1] = this.child1.picset_code[0];
                            this.picset_qual[0] = this.child2.picset_qual[0];
                            this.picset_qual[1] = this.child1.picset_qual[0];
                            this.picset_common[0] = this.child2.picset_common[0];
                            this.picset_common[1] = this.child1.picset_common[0];
                            this.picset_latin[0] = this.child2.picset_latin[0];
                            this.picset_latin[1] = this.child1.picset_latin[0];
                        }
                        else
                        {
                            if (this.child1.richness_val >= this.child2.richness_val)
                            {
                                this.picset_file[0] = this.child1.picset_file[0];
                                this.picset_file[1] = this.child2.picset_file[0];
                                this.picset_code[0] = this.child1.picset_code[0];
                                this.picset_code[1] = this.child2.picset_code[0];
                                this.picset_qual[0] = this.child1.picset_qual[0];
                                this.picset_qual[1] = this.child2.picset_qual[0];
                                this.picset_common[0] = this.child1.picset_common[0];
                                this.picset_common[1] = this.child2.picset_common[0];
                                this.picset_latin[0] = this.child1.picset_latin[0];
                                this.picset_latin[1] = this.child2.picset_latin[0];
                            }
                            else
                            {
                                this.picset_file[0] = this.child2.picset_file[0];
                                this.picset_file[1] = this.child1.picset_file[0];
                                this.picset_code[0] = this.child2.picset_code[0];
                                this.picset_code[1] = this.child1.picset_code[0];
                                this.picset_qual[0] = this.child2.picset_qual[0];
                                this.picset_qual[1] = this.child1.picset_qual[0];
                                this.picset_common[0] = this.child2.picset_common[0];
                                this.picset_common[1] = this.child1.picset_common[0];
                                this.picset_latin[0] = this.child2.picset_latin[0];
                                this.picset_latin[1] = this.child1.picset_latin[0];
                            }
                        }
                    }
                    
                    // 3.) choose the rest from the top down skipping the second if it's of very poor quality compared to the rest.
                    
                    if (child1pics > child2pics)
                    {
                        if (1 < child2pics)
                        {
                            for (i = 1 ; i < child2pics ; i ++)
                            {
                                this.picset_file[2*i] = this.child1.picset_file[i];
                                this.picset_code[2*i] = this.child1.picset_code[i];
                                this.picset_qual[2*i] = this.child1.picset_qual[i];
                                this.picset_common[2*i] = this.child1.picset_common[i];
                                this.picset_latin[2*i] = this.child1.picset_latin[i];
                                
                                this.picset_file[2*i+1] = this.child2.picset_file[i];
                                this.picset_code[2*i+1] = this.child2.picset_code[i];
                                this.picset_qual[2*i+1] = this.child2.picset_qual[i];
                                this.picset_common[2*i+1] = this.child2.picset_common[i];
                                this.picset_latin[2*i+1] = this.child2.picset_latin[i];
                                
                                
                            }
                        }
                        for (i = (child2pics) ; i < child1pics ; i ++)
                        {
                            this.picset_file[i+1+(child2pics-1)] = this.child1.picset_file[i];
                            this.picset_code[i+1+(child2pics-1)] = this.child1.picset_code[i];
                            this.picset_qual[i+1+(child2pics-1)] = this.child1.picset_qual[i];
                            this.picset_common[i+1+(child2pics-1)] = this.child1.picset_common[i];
                            this.picset_latin[i+1+(child2pics-1)] = this.child1.picset_latin[i];
                        }
                    }
                    else
                    {
                        if (1 < child1pics)
                        {
                            for (i = 1 ; i < child1pics ; i ++)
                            {
                                this.picset_file[2*i] = this.child2.picset_file[i];
                                this.picset_code[2*i] = this.child2.picset_code[i];
                                this.picset_qual[2*i] = this.child2.picset_qual[i];
                                this.picset_common[2*i] = this.child2.picset_common[i];
                                this.picset_latin[2*i] = this.child2.picset_latin[i];
                                
                                this.picset_file[2*i+1] = this.child1.picset_file[i];
                                this.picset_code[2*i+1] = this.child1.picset_code[i];
                                this.picset_qual[2*i+1] = this.child1.picset_qual[i];
                                this.picset_common[2*i+1] = this.child1.picset_common[i];
                                this.picset_latin[2*i+1] = this.child1.picset_latin[i];
                            }
                        }
                        if (child1pics < child2pics)
                        {
                            for (i = (child1pics) ; i < child2pics ; i ++)
                            {
                                this.picset_file[i+1+(child1pics-1)] = this.child2.picset_file[i];
                                this.picset_code[i+1+(child1pics-1)] = this.child2.picset_code[i];
                                this.picset_qual[i+1+(child1pics-1)] = this.child2.picset_qual[i];
                                this.picset_common[i+1+(child1pics-1)] = this.child2.picset_common[i];
                                this.picset_latin[i+1+(child1pics-1)] = this.child2.picset_latin[i];
                            }
                        }
                    }
                    
                    // 4.) reorder the remaining pictures according to quality with the highest quality pics from 1 and 2 as the first two pics in the list otherwise all in order of quality (could add randomness later)
                    
                    var sortdone = false;
                    while(!sortdone)
                    {
                        sortdone = true;
                        for (i = 0 ; i < this.picset_file.length ; i ++)
                        {
                            for (j = i+1 ; j < this.picset_file.length ; j ++)
                            {
                                if(this.picset_file[i] == this.picset_file[j])
                                {
                                    this.picset_file[j] = this.picset_file[this.picset_file.length-1];
                                    this.picset_file.length --;
                                    this.picset_code[j] =this.picset_code[this.picset_code.length-1];
                                    this.picset_code.length --;
                                    this.picset_qual[j] = this.picset_qual[this.picset_qual.length-1];
                                    this.picset_qual.length --;
                                    this.picset_common[j] = this.picset_common[this.picset_common.length-1];
                                    this.picset_common.length --;
                                    this.picset_latin[j] = this.picset_latin[this.picset_latin.length-1];
                                    this.picset_latin.length --;
                                    sortdone = false;
                                }
                            }
                        }
                        
                    }
                    
                    //sometimes there are multiple images in the vector which are identical - the above two loops eliminate these.
                    
                    sortdone = false;
                    while(!sortdone)
                    {
                        sortdone = true;
                        for (i = 2 ; i < this.picset_qual.length-1 ; i ++)
                        {
                            if((qualcomp(this.picset_qual[i]))<(qualcomp(this.picset_qual[i+1])))
                            {
                                sortdone = false;
                                var tempqual = this.picset_qual[i];
                                this.picset_qual[i] = this.picset_qual[i+1];
                                this.picset_qual[i+1] = tempqual;
                                tempqual = this.picset_file[i];
                                this.picset_file[i] = this.picset_file[i+1];
                                this.picset_file[i+1] = tempqual;
                                tempqual = this.picset_common[i];
                                this.picset_common[i] = this.picset_common[i+1];
                                this.picset_common[i+1] = tempqual;
                                tempqual = this.picset_latin[i];
                                this.picset_latin[i] = this.picset_latin[i+1];
                                this.picset_latin[i+1] = tempqual;
                                tempqual =  this.picset_code[i]
                                this.picset_code[i] = this.picset_code[i+1];
                                this.picset_code[i+1] = tempqual;
                            }
                        }
                    }
                }
            }
        }
        else
        {
            this.picset_file = null;
            this.picset_qual = null;
            this.picset_common = null;
            this.picset_latin = null;
        }
    }
    else
    {
        if (this.pic_file)
        {
            this.picset_code = new Array();
            this.picset_file = new Array();
            this.picset_qual = new Array();
            this.picset_common = new Array();
            this.picset_latin = new Array();
            
            this.picset_file[0] = this.pic_file;
            this.picset_qual[0] = this.pic_qual;
            this.picset_code[0] = this.metacode;
            if (this.cname)
            {
                this.picset_common[0] = this.cname;
            }
            else
            {
                this.picset_common[0] = null;
            }
            if (this.name1)
            {
                if (this.name2)
                {
                    this.picset_latin[0] = this.name2 + " " + this.name1;
                }
                else
                {
                    this.picset_latin[0] = this.name1;
                }
            }
            else
            {
                if (this.name2)
                {
                    this.picset_latin[0] = this.name2;
                }
                else
                {
                    this.picset_latin[0] = null;
                }
            }
        }
        else
        {
            this.picset_file = null;
            this.picset_qual = null;
            this.picset_common = null;
            this.picset_latin = null;
            this.picset_code = null;
        }
    }
}

function qualcomp(qualin)
{
    var convqual = qualin;
    if (convqual == 4)
    {
        convqual = 8;
    }
    if (convqual == 3)
    {
        convqual = 7;
    }
    return (convqual);
    // note the ratings are 1-4 for untrusted and 5-9 for trusted
    // this code attaches a high value to beautiful untrusted images.
}




