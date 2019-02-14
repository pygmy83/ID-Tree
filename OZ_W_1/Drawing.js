/******************************************************/
/*** This file contains basic drawing routines that ***/
/*** get used repeatedly throughout the code        ***/
/******************************************************/

/* media player standard symbols - draws path only */

// play
function draw_play_symbol(x,y,r,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x , y-r/2);
    context_in.lineTo( x , y+r/2);
    context_in.lineTo( x+r , y);
    context_in.lineTo( x , y-r/2);
    context_in.closePath();
}

// reverse
function draw_reverse_symbol(x,y,r,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x+r , y-r/2);
    context_in.lineTo( x+r , y+r/2);
    context_in.lineTo( x , y);
    context_in.lineTo( x+r , y-r/2);
    context_in.closePath();
}

// pause
function draw_pause_symbol(x,y,r,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x+r*0.35 , y-r/2);
    context_in.lineTo( x+r*0.35 , y+r/2);
    context_in.lineTo( x , y+r/2);
    context_in.lineTo( x , y-r/2);
    context_in.lineTo( x+r*0.35 , y-r/2);
    context_in.moveTo( x+r , y-r/2);
    context_in.lineTo( x+r , y+r/2);
    context_in.lineTo( x+r-r*0.35 , y+r/2);
    context_in.lineTo( x+r-r*0.35 , y-r/2);
    context_in.lineTo( x+r , y-r/2);
    context_in.closePath();
}

// stop
function draw_stop_symbol(x,y,r,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x+r , y-r/2);
    context_in.lineTo( x+r , y+r/2);
    context_in.lineTo( x , y+r/2);
    context_in.lineTo( x , y-r/2);
    context_in.lineTo( x+r , y-r/2);
    context_in.closePath();
}

/* control panel button shapes - draws path only */

// centre cheveron
function draw_cheveron(x,y,rx,ry,corner,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x , y);
    context_in.lineTo( x , y + ry -corner);
    context_in.lineTo( x + rx/2.0  , y + ry);
    context_in.lineTo( x + rx  , y + ry-corner);
    context_in.lineTo( x + rx , y );
    context_in.lineTo( x + rx/2.0 , y +corner);
    context_in.lineTo( x  , y);
    context_in.closePath();
}

// top cheveron
function draw_cheveron_top(x,y,rx,ry,corner,context_in)
{
    
    context_in.beginPath();
    context_in.moveTo( x + corner , y);
    context_in.arc(x+corner,y+corner,corner,-Math.PI/2,Math.PI,true);
    context_in.lineTo( x , y + ry - corner);
    context_in.lineTo( x + rx/2  , y + ry);
    context_in.lineTo( x + rx , y + ry - corner);
    context_in.lineTo( x + rx , y + corner);
    context_in.arc(x+rx-corner,y+corner,corner,0,-Math.PI/2,true);
    context_in.lineTo( x + corner , y);
    context_in.closePath();
    
}

// bottom cheveron
function draw_cheveron_bottom(x,y,rx,ry,corner,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x , y);
    context_in.lineTo( x , y + ry -corner);
    context_in.arc(x+corner,y+ry-corner,corner,Math.PI,Math.PI/2,true);
    context_in.lineTo( x + rx -corner , y + ry );
    context_in.arc(x+rx-corner,y+ry-corner,corner,Math.PI/2,0,true);
    context_in.lineTo( x + rx , y + ry -corner );
    context_in.lineTo( x + rx , y  );
    context_in.lineTo( x + rx/2.0 , y +corner);
    context_in.lineTo( x  , y);
    context_in.closePath();
}

// rectangle with rounded corners
function draw_src(x,y,rx,ry,corner,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x + corner , y);
    context_in.arc(x+corner,y+corner,corner,-Math.PI/2,Math.PI,true);
    context_in.lineTo( x , y + ry - corner);
    context_in.arc(x+corner,y+ry-corner,corner,Math.PI,Math.PI/2,true);
    context_in.lineTo( x + rx - corner , y + ry);
    context_in.arc(x+rx-corner,y+ry-corner,corner,Math.PI/2,0,true);
    context_in.lineTo( x + rx , y + ry - corner );
    context_in.arc(x+rx-corner,y+corner,corner,0,-Math.PI/2,true);
    context_in.lineTo( x + corner , y);
    context_in.closePath();
}

// rectangle with rounded corners melded into down arrow
function draw_src_down(x,y,rx,ry,corner,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x + corner , y);
    context_in.arc(x+corner,y+corner,corner,-Math.PI/2,Math.PI,true);
    context_in.lineTo( x , y + ry/2);
    context_in.lineTo( x +rx/2, y + ry);
    context_in.lineTo( x +rx , y + ry/2);
    context_in.arc(x+rx-corner,y+corner,corner,0,-Math.PI/2,true);
    context_in.lineTo( x + corner , y);
    context_in.closePath();
}

// rectangle with rounded corners melded into up arrow
function draw_src_up(x,y,rx,ry,corner,context_in)
{
    context_in.beginPath();
    context_in.moveTo( x , y +ry-corner);
    context_in.arc(x+corner,y+ry-corner,corner,Math.PI,Math.PI/2,true);
    context_in.lineTo( x + rx - corner , y + ry);
    context_in.arc(x+rx-corner,y+ry-corner,corner,Math.PI/2,0,true);
    context_in.lineTo( x + rx , y + ry /2 );
    context_in.lineTo( x +rx/2, y );
    context_in.lineTo( x , y + ry /2 );
    context_in.closePath();
}

/* button inner tests - these routines tell us if a point (inx,iny) is inside the button or not */

// note I don't bother taking into account the rounded corners in these calculations it's perfectly good enough without this.

// rectangle with square corners - good enough for use in the rounded case and for general use
function in_rect(x,y,rx,ry,inx,iny)
{
    if ((inx < x)||(inx > (x+rx)))
    {
        // first of all check that we're in on the x axis
        return false;
    }
    else if ((iny < y)||(iny > (y+ry)))
    {
        // now check the y axis
        return false;
    }
    else
    {
        // we are inside the shape
        return true;
    }
}

// this will tell us if we are above a cheveron shape
function above_cheveron(x,y,rx,ry,corner,inx,iny)
{
    // built for a cheveron drawing routine where corner gives the hight of the pitched area
    // x,y is the top left of the cheveron shape
    var is_above = true;
    if (inx < (x+rx/2))
    {
        if (iny>(2*corner*(inx-x)/rx+y))
        {
            is_above = false;
        }
    }
    else
    {
        if (iny>(2*corner*(x+rx-inx)/rx+y))
        {
            is_above = false;
        }
    }
    return is_above;
}

// this will tell us if we are above an up arrow shape
function above_uparrow(x,y,rx,ry,corner,inx,iny)
{
    // built for a cheveron drawing routine where corner gives the hight of the pitched area
    // x,y is the top left of the cheveron shape rectangle
    var is_above = false;
    if (inx < (x+rx/2))
    {
        if (iny<(2*corner*(x-inx)/rx+y+corner))
        {
            is_above = true;
        }
    }
    else
    {
        if (iny<(2*corner*(inx-x-rx)/rx+y+corner))
        {
            is_above = true;
        }
    }
    return is_above;
}

// centre cheveron
function in_cheveron(x,y,rx,ry,corner,inx,iny)
{
    if (in_rect(x,y,rx,ry,inx,iny))
    {
        // first of all check that we're in the bounding rectangle
        if (above_cheveron(x,y+ry-corner,rx,ry,corner,inx,iny))
        {
            if (!above_cheveron(x,y,rx,ry,corner,inx,iny))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

// top cheveron
function in_cheveron_top(x,y,rx,ry,corner,inx,iny)
{
    if (in_rect(x,y,rx,ry,inx,iny))
    {
        // first of all check that we're in the bounding rectangle
        if (above_cheveron(x,y+ry-corner,rx,ry,corner,inx,iny))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

// bottom cheveron
function in_cheveron_bottom(x,y,rx,ry,corner,inx,iny)
{
    if (in_rect(x,y,rx,ry,inx,iny))
    {
        // first of all check that we're in the bounding rectangle
        if (!above_cheveron(x,y,rx,ry,corner,inx,iny))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

// rectangle with rounded corners melded into down arrow
function in_src_down(x,y,rx,ry,corner,inx,iny)
{
    if (in_rect(x,y,rx,ry,inx,iny))
    {
        // first of all check that we're in the bounding rectangle
        if (above_cheveron(x,y + ry/2,rx,ry,ry/2,inx,iny))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

// rectangle with rounded corners melded into up arrow
function in_src_up(x,y,rx,ry,corner,inx,iny)
{
    if (in_rect(x,y,rx,ry,inx,iny))
    {
        // first of all check that we're in the bounding rectangle
        if (!above_uparrow(x,y,rx,ry,ry/2,inx,iny))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

/* generic button drawing routine */

// this draws a button and manages the button clicking returning true if the button is enabled and the pointer/touch position given is over the button
// the button action is managed elsewhere based on this return
function draw_button(
                     x,y,rx,ry, // in position x,y, of size, rx,ry
                     contextin,stylein, // in context 'contextin' with style 'stylein'
                     corner,shape, // corner and shape give the shape choices
                     active, // is the button active? a boolean
                     pressX,pressY,click_in // pressX and pressY - the focus of mouse or touch - 'click_in' tells us if the mouse is clicked or screen being touched
                     )
{
    // this variable will be true if the pressed point is over the button
    var is_over = false;
    
    // now work out if the pressed point is over the button
    if (shape == "src")
    {
        // we approximate the clicking area of the button with a rectangle even if the button has a slightly differnet acutal shape
        is_over = in_rect(x,y,rx,ry,pressX,pressY);
    }
    else if (shape == "src_d")
    {
        is_over = in_src_down(x,y,rx,ry,corner,pressX,pressY);
    }
    else if (shape == "src_u")
    {
        is_over = in_src_up(x,y,rx,ry,corner,pressX,pressY);
    }
    else if (shape == "chev")
    {
        is_over = in_cheveron(x,y,rx,ry,corner,pressX,pressY);
    }
    else if (shape == "chev_t")
    {
        is_over = in_cheveron_top(x,y,rx,ry,corner,pressX,pressY);
    }
    else if (shape == "chev_b")
    {
        is_over = in_cheveron_bottom(x,y,rx,ry,corner,pressX,pressY);
    }
    else if (shape == "circ")
    {
        is_over = false;
        if (((pressX-x-rx/2)*(pressX-x-rx/2)+(pressY-y-ry/2)*(pressY-y-ry/2))<= (Math.min(rx,ry)*Math.min(rx,ry)/4))
        {
            is_over = true;
        }
    }
    
    // this variable tells us if we need to stroke the button
    var do_stroke = false;
    
    // now set the styles
    if (active)
    {
        if (is_over)
        {
            if (click_in)
            {
                if (stylein.clicked.line_width && stylein.clicked.line_width > 0)
                {
                    contextin.lineWidth = stylein.clicked.line_width;
                    do_stroke = true;
                }
                contextin.fillStyle = stylein.clicked.inner_col;
                contextin.strokeStyle = stylein.clicked.line_col;
            }
            else
            {
                if (stylein.over.line_width && stylein.over.line_width > 0)
                {
                    contextin.lineWidth = stylein.over.line_width;
                    do_stroke = true;
                }
                contextin.fillStyle = stylein.over.inner_col;
                contextin.strokeStyle = stylein.over.line_col;
            }
        }
        else
        {
            if (stylein.standard.line_width && stylein.standard.line_width > 0)
            {
                contextin.lineWidth = stylein.standard.line_width;
                do_stroke = true;
            }
            contextin.fillStyle = stylein.standard.inner_col;
            contextin.strokeStyle = stylein.standard.line_col;
        }
    }
    else
    {
        if (stylein.disabled.line_width && stylein.disabled.line_width > 0)
        {
            contextin.lineWidth = stylein.disabled.line_width;
            do_stroke = true;
        }
        contextin.fillStyle = stylein.disabled.inner_col;
        contextin.strokeStyle = stylein.disabled.line_col;
    }
    
    // now draw the button path accounting for the stroke size
    if (shape == "src")
    {
        draw_src(x+contextin.lineWidth/2,y+contextin.lineWidth/2,rx-contextin.lineWidth,ry-contextin.lineWidth,corner,contextin);
    }
    else if (shape == "src_d")
    {
        draw_src_down(x+contextin.lineWidth/2,y+contextin.lineWidth/2,rx-contextin.lineWidth,ry-contextin.lineWidth,corner,contextin);
    }
    else if (shape == "src_u")
    {
        draw_src_up(x+contextin.lineWidth/2,y+contextin.lineWidth/2,rx-contextin.lineWidth,ry-contextin.lineWidth,corner,contextin);
    }
    else if (shape == "chev")
    {
        draw_cheveron(x+contextin.lineWidth/2,y+contextin.lineWidth/2,rx-contextin.lineWidth,ry-contextin.lineWidth,corner,contextin);
    }
    else if (shape == "chev_t")
    {
        draw_cheveron_top(x+contextin.lineWidth/2,y+contextin.lineWidth/2,rx-contextin.lineWidth,ry-contextin.lineWidth,corner,contextin);
    }
    else if (shape == "chev_b")
    {
        draw_cheveron_bottom(x+contextin.lineWidth/2,y+contextin.lineWidth/2,rx-contextin.lineWidth,ry-contextin.lineWidth,corner,contextin);
    }
    else if (shape == "circ")
    {
        contextin.beginPath();
        contextin.arc(x+rx/2,y+ry/2,0.5*Math.min(rx-contextin.lineWidth,ry-contextin.lineWidth),0,Math.PI*2,true);
    }
    
    // fill and stroke the button
    contextin.fill();
    if (do_stroke)
    {
        contextin.stroke();
    }
    
    // needs to be active and clicking to return positive value
    return (active && is_over);
}

/* Drawing of other shapes in a context with a given color */

// draw a speaker with or without soundwaves coming from it
// x,y,r show the position and size
function drawspeaker(x,y,r,waves,context_in,colorin)
{
    // set up colors
    context_in.strokeStyle = colorin;
    context_in.fillStyle = colorin;
    
    // fill the main speaker shape
    context_in.lineWidth = r*0.1;
    context_in.beginPath();
    context_in.moveTo( x , y+r );
    context_in.lineTo( x-r*0.6 , y+r*0.4 );
    context_in.lineTo( x-r*0.9 , y+r*0.4);
    context_in.lineTo( x-r*0.9 , y-r*0.4);
    context_in.lineTo( x-r*0.6 , y-r*0.4 );
    context_in.lineTo( x , y-r );
    context_in.lineTo( x , y+r );
    context_in.fill();
    
    // draw sound waves if needed
    if (waves)
    {
        context_in.beginPath();
        context_in.arc(x,y,r*0.5,+Math.PI/4,-Math.PI/4,true);
        context_in.stroke();
        
        context_in.beginPath();
        context_in.arc(x,y,r*0.25,+Math.PI/4,-Math.PI/4,true);
        context_in.stroke();
        
        context_in.beginPath();
        context_in.arc(x,y,r*0.75,+Math.PI/4,-Math.PI/4,true);
        context_in.stroke();
    }
}

// draw a clock showing a certain progress and with a given color
// x,y,r show the position and size
function drawclock(x,y,r,progress,color,context_in)
{
    // set up the graphics
    context_in.lineWidth = r*0.1;
    context_in.strokeStyle = color;
    context_in.fillStyle = color;
    
    // draw the shape outline
    context_in.beginPath();
    context_in.arc(x,y,r,0,Math.PI*2,false);
    context_in.stroke();
    
    // draw the segment inside
    context_in.beginPath();
    context_in.moveTo( x , y );
    context_in.arc(x,y,r,-Math.PI*0.5,Math.PI*(2*progress-0.5),false);
    context_in.fill();
}

// arrow shape (for backspace button)
function draw_backspace(x,y,rx,ry,color,context_in)
{
    // set up the graphics
    context_in.lineWidth = Math.max(Math.min(rx,ry)*0.1,1);
    context_in.strokeStyle = color;
    
    // draw the shape outline
    context_in.beginPath();
    context_in.moveTo( x + rx/2, y );
    context_in.lineTo( x - rx/2, y );
    context_in.moveTo( x - rx/4, y-ry/4 );
    context_in.lineTo( x - rx/2, y );
    context_in.lineTo( x - rx/4, y+ry/4 );
    context_in.stroke();
}



/* text printing tools */

// this fits the text on one line in the box size
// the font style in use overall is set globally
function draw_text(
                          x,y,rx,ry,margin, // box dimensions given by x,y,rx,ry and leaving a margin in all four directions
                          txtin,     // txtin is the text to be printed
                          threshold,mintxt,maxtxt, // the font size can be constained by an min and a max and must be above a threshold to be shown
                          colorin,text_style,   // the color can be chosen and text_style can be bold or italic etc.
                          contextin  // the context in which to print the text
                          )
{
    // set up colors
    contextin.fillStyle = colorin;
    
    // set up positioning
    contextin.textAlign = 'center';
    contextin.textBaseline = 'middle';
    
    // set up fonts
    var txtsize = Math.min(maxtxt,ry-margin*2);
    
    // set the final text size ready for measuring
    if (text_style)
    {
        contextin.font = text_style + ' '+ (txtsize).toString() + 'px '+ fonttype;
    }
    else
    {
        contextin.font = (txtsize).toString() + 'px '+ fonttype;
    }
    
    // mesure the text
    var testw = contextin.measureText(txtin).width;
    // reduce to fit in the available width
    if (testw >= (rx-margin*2))
    {
        txtsize = (rx-margin*2)*txtsize/testw;
    }
    
    // we also have a minimum size that must for text that must be respected
    txtsize = Math.max(mintxt,txtsize)
    
    if (txtsize > threshold)
    {
        // set the final text size
        if (text_style)
        {
            contextin.font = text_style + ' '+ (txtsize).toString() + 'px '+ fonttype;
        }
        else
        {
            contextin.font = (txtsize).toString() + 'px '+ fonttype;
        }
        
        // draw the text
        contextin.fillText  (txtin , x+rx/2, y+ry/2);
        
        // text was large enough so return true
        return true;
    }
    else
    {
        // text was too small to be readable - return false.
        return false;
    }
}

