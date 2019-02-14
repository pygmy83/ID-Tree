
var choosing_pop_spec = false;
var switching_allowed = true;
var switching_button_txt = "Switch to Tetrapods"
var switch_to = "tetrapods.htm?plants.htm" // add ./ to this

/* screen saver options*/

var screen_saver = {
    
    'kickin_wait':180 ,
    //wait time in seconds before the screen saver kicks in
    'switch_wait':3600 ,
    // wait time in seconds before the style switches
    'animation_wait':12 , // 9
    // wait in seconds between each animation cycle
    
    // proportions of time spent in each of the visual categories
    
    'sound':0.5,
    'pic':0.5,
    
    'plain_prop':0.0 , // plain colours
    'time_prop':0.0 , // geological history colours
    'redlist_prop':1.0 , // redlist colours
    
    'natural_prop': 0.0 , // natural view shape
    'spiral_prop': 1.0 , // spiral view shape
    'feather_prop': 0.0 , // feather view shape
    'balanced_prop': 0.0 , // balanced view shape
    
    'latin_prop':0.0 , // latin names
    'common_prop':1.0 , // comon names
    
    // proportions of time spent on different events
    
    'zoomin__':0.0 , // leave as zero
    'growth_animation': 0.2 , // growth animation
    'zoomin_random':0.6 , // zoom in on random leaf
    'slideshow':0.2 ,// slideshow
    
    // zooming into a spot and startup and message to say use the mouse any time to explore message
    'zosens':0.92 ,// the closer to 1 the slower the animation must be less than 1
    'sslength':3 , // slideshow length in number of slides
    'flightspeed':12 , // more is slower - affects screen saver flights only
}

/* button styles for control panel */

// this defines the color and style of a blank button in the control panel
var control_button_style = {
    'standard':{
        'inner_col': 'rgb(255,255,255)',
        'line_col': 'rgb(155,165,175)',
        'line_width': 0
    },
    'over':{
        'inner_col': 'rgb(180,200,235)',
        'line_col': 'rgb(155,165,175)',
        'line_width': 0
    },
    'clicked':{
        'inner_col': 'rgb(180,200,235)',//'rgb(170,200,230)',
        'line_col': 'rgb(0,0,0)',
        'line_width': 0
    },
    'disabled':{
        'inner_col': 'rgb(180,200,235)',
        'line_col': 'rgb(155,165,175)',
        'line_width': 0
    }
}

/* tree display style and data path */

// path to data
var data_path_tree = "Plants_Data_Set/plants_tree.js";
var data_path_meta = "Plants_Data_Set/plants_meta.js";

var data_path_sounds = "";

var data_pic_col_main = "picfile";
var data_path_pics_main = "Plants_Data_Set/Pictures/";
var data_path_thumbs_main = "Plants_Data_Set/Thumbs/";
var data_pic_ext_main = ".jpg";
var data_pic_thumb_ext_main = "-400.jpg";

var data_pic_col = data_pic_col_main;
var data_path_pics = data_path_pics_main;
var data_path_thumbs = data_path_thumbs_main;
var data_pic_ext = data_pic_ext_main;
var data_pic_thumb_ext = data_pic_thumb_ext_main;



// todo easy building of popular species lists.

/* popular species list */

popular_species_list = ["Rice","Orchids","Potato","Venus fly trap","Ginger","Banana","Basil","Cinnamon","Cacti"];

popular_species_code = [-13054,790,-28489,-1282,-2943,1451,-27288,6644,2886];

/* style parameters - control panel colours */

var button_text_col = 'rgb(0,0,0)'; // button text color
var disabled_button_text_col = 'rgb(0,0,0)'; // button text color


var control_col = 'rgb(220,230,255)';//'rgb(145,145,145)'; // control panel background color
var control_col2 = 'rgb(220,230,255)';//'rgb(210,230,250)';//'rgb(145,145,145)'; // control panel background color

var control_line_col = 'rgb(105,115,145)'; // control panel line color
var control_text_col = 'rgb(0,0,0)'; // control panel text color
var control_highlight_col = 'rgb(220,230,255)'; // control panel highlight color

var picborder_col = 'rgb(155,155,155)';

var txtbox_col = 'rgb(220,230,255)'; // text box background color
var txtbox_line_col = 'rgb(155,165,175)'; // text box line color
var txtbox_text_col = 'rgb(0,0,0)'; // text box text color

/* style parameters - control panel proportions */

var button_corner = 10; // button corner size
var button_gap = 9; // gap between buttons
var button_height = 38; // height of buttons

// alpha buttons are used for making the onscreen keyboard
var alpha_button_corner = 6; // alphabetic button corner size
var alpha_button_gap = 5; // alphabetic button gap
var alpha_button_height = 38; // alphabetic button height

// control area dimension parameters
var control_margin = 20; // control column margin
var control_width = 285; // control column width (assumed to be full height constantly)
var control_line_width = 1; // width of control column line (null means do not draw)

var txtbox_height = 275; // height of feedback panel
var txtbox_line_width = 1; // text box line width (null means do not draw)

/* other globals to be defined */

var touch_debugger = false;
var restart_flag = true;

// default viewing options (can be changed with buttons when running)
var polytype = 3; // the way polytomies are expressed (should be 0,1,2 or 3)
var viewtype = 1; // the default viewtype (should be 1,2,3,4 or 5)
var colourtype = 3; // the default colour mode - note: if doing further editing of colour palette's below this may become irrelevant
// colourtype = 3 is only suited for redlist data
var leaftype = 2; // leaf shape circular or natural - this cannpt be changed with buttons it is recommended you leave it

var fonttype = 'Helvetica'; // change the text font to match the rest of your article and journal style // 'sans-serif' // is good too
var intnodetextcolor = 'rgb(255,255,255)' // for interior node text colour where there is a name to be put
// note there are more advanced options later to change th interior node text
var backgroundcolor = 'rgb(220,230,255)' //background color 'null' if no background is wanted
var logobackgroundcolor = 'rgba(220,230,255,0.7)' //background color 'null' if no background is wanted
var outlineboxcolor = 'rgb(0,0,0)' // outline box colour
var auto_interior_node_labels = true; // monophyletic groups of genera are to be automatically labelled in interior nodes.

var pie_background_color = 'rgb(255,255,255)';
var pieborder = 0.12;

var innode_label_help = false; // supresses the cutting out of 'namingtodo' labels in the interior nodes of the tree
var commonlabels = true; // makes common names the primary info if false then latin names become the primary focus
var intcircdraw = true; // display interior circles or not?
var mintextsize = 4; // the smallest size text you want to have displayed

var sensitivity = 0.84; // for mouse sensitivity
var sensitivity3 = 0.9;
var sensitivity2 = 0.88; // for mouse sensitivity
var threshold =2.5; // for the detail threshold
var thresholdtxt =2.5; // for the detail threshold

var drawsignposts = true;
var searchinteriornodes = false;

var growthtimetot = 45;

var EP_anim_length_in = 10;
var pop_anim_length_in = 25;
var length_intro_in = 20;

var fly_on_search = false;

var touch_rem_wait = 6;

/* visualisation style settings */

var draw_first_pie = 1;
var draw_second_pie = 1; // -1 for no 1 for yes
// cannot have two pies and sound player with current layout

/* global color key settings */

function conconvert(casein)
{
    switch(casein)
    {
        case "EX":
			return ("Extinct");
        case "EW":
			return ("Extinct in the Wild");
        case "CR":
			return ("Critically Endangered");
        case "EN":
			return ("Endangered");
        case "VU":
			return ("Vulnerable");
        case "NT":
			return ("Near Threatened");
        case "LC":
			return ("Least Concern");
        case "DD":
			return ("Data Deficient");
        case "NE":
			return ("Not Evaluated");
        default:
			return ("Not Evaluated");
    }
}

function conconvert2(casein)
{
    switch(casein)
    {
        case "EX":
			return (0);
        case "EW":
			return (1);
        case "CR":
			return (2);
        case "EN":
			return (3);
        case "VU":
			return (4);
        case "NT":
			return (5);
        case "LC":
			return (6);
        case "DD":
			return (7);
        case "NE":
			return (8);
        default:
			return (9);
    }
}

// colour codes for redlist
function redlistcolor(codein)
{
    switch(codein)
    {
        case "EX":
			return ('rgb(0,0,180)');
            //return ('rgb(0,0,0)');
        case "EW":
			return ('rgb(60,50,135)');
            //return ('rgb(80,80,80)');
        case "CR":
			return ('rgb(210,0,10)');
        case "EN":
			return ('rgb(125,50,00)');
        case "VU":
			return ('rgb(85,85,30)');
        case "NT":
			return ('rgb(65,120,0)');
        case "LC":
			return ('rgb(0,180,20)');
        case "DD":
			return ('rgb(80,80,80)');
            //return ('rgb(60,50,135)');
        case "NE":
			return ('rgb(0,0,0)');
            //return ('rgb(0,0,190)');
        default:
			return ('rgb(0,0,0)');
    }
}

var global_colorkey_title =
[
 "Leaf and branch colours" ,
 "show how woody the plants" ,
 "are ranging from woody",
 "to herbaceous"
];

var global_colorkey_text = ["Woody","Herbaceous","Variable","Unknown"];
var global_colorkey_col = ['rgb(100,75,50)','rgb(0,140,0)','rgb(50,108,25)','rgb(90,90,90)'];

/* credit text settings */

var creditsText =
[
 
 [20,],
 [5,"OneZoom Tree of Life Explorer"],
 [3,],
 [5,"www.OneZoom.org"],
 [15,],
 // [3,"Multi-touch display code version 1.3 (2014)"]
 // [3,],
 
 [3.5,"A project based at Imperial College London"],
 [2,],
 [3.5,"Funded by the Natural Environment Reseach Council"],
 [2,],
 [3.5,"Created and developed by"],
 [2,],
 [3.5,"James Rosindell"],
 
 [9,],
 [3.5,"Special thanks to"],
 [2,],
 [3.5,"Luke Harmon"],
 [3.5,"Duncan Gillies"],
 [3.5,"Laura Nunes"],
 [3.5,"Yan Wong"],
 [3.5,"Kai Zhong"],
 [3.5,"Amy Zanne"],
 [4,],
 [3.5,"This work is a contribution to Imperial College's"],
 [3.5,"Grand Challenges in Ecosystems and the Environment initiative."],
 
 [9,],
 
 [3,"Data sources"],
 [1,],
 [2.2,"Conservation status data"],
 [1.8,"The IUCN Red List of Threatened Species"],
 [1.8,"IUCN, Available from http://www.iucnredlist.org."],
 [1.8,"Downloaded from Encyclopedia of Life http://www.eol.org (Dec 2013)"],
 [1,],
 [2.2,"Plant data"],
 [1,],
 [1.8,"Amy E. Zanne, David C. Tank, William K. Cornwell,"],
 [1.8,"Jonathan M. Eastman, Stephen A. Smith, Richard G. FitzJohn,"],
 [1.8,"Daniel J. McGlinn, Brian C. O'Meara, Angela T. Moles,"],
 [1.8,"Peter B. Reich, Dana L. Royer, Douglas E. Soltis, "],
 [1.8,"Peter F. Stevens, Mark Westoby, Ian J. Wright, Lonnie Aarssen,"],
 [1.8,"Robert I. Bertin, Andre Calaminus, "],
 [1.8,"Rafael Govaerts, Frank Hemmings, Michelle R. Leishman,"],
 [1.8,"Jacek Oleksyn, Pamela S. Soltis, Nathan G. Swenson,"],
 [1.8,"Laura Warman, Jeremy M. Beaulieu."],
 [1.8,"Three keys to the radiation of angiosperms into freezing environments."],
 [1.8,"Nature. doi:10.1038/nature12872. (2013)"],
 [1,],
 [1.8,"Zanne AE, Cornwell WK, McGlinn DJ, Beaulieu JM,"],
 [1.8,"Eastman JM, FitzJohn RG, Smith SA, Aarssen L, Bertin RI,"],
 [1.8,"Calaminus A, Govaerts R, Hemmings F, Leishman MR,"],
 [1.8,"Moles AT, Oleksyn J, Ordonez A, Reich PB, Royer DL,"],
 [1.8,"Soltis DE, Soltis PS, Stevens PF, Swenson NG,"],
 [1.8,"Warman L,  Wright IJ, Tank DC. "],
 [1.8,"Data from: Three keys to the radiation of angiosperms into freezing environments. "],
 [1.8,"Nature. Dryad Digital Repository. http://dx.doi.org/10.5061/dryad.63q27. (2013)."],
 [1,],
 [1.8,"William K. Cornwell, Rich FitzJohn, Peter F. Stevens,"],
 [1.8,"Andre Calaminus, Douglas E. Soltis, Pamela S. Soltis,"],
 [1.8,"Rafael Govaerts, Ian J. Wright, Jacek Oleksyn, Peter B. Reich,"],
 [1.8,"Dana L. Royer, Lonnie Aarssen, Frank Hemmings,"],
 [1.8,"Michelle Leishman, Angela T. Moles, Nathan G. Swenson,"],
 [1.8,"Laura Warman, Robert I. Bertin, A. Ordonez, and Amy E. Zanne."],
 [1.8,"Global woodiness database. Data from:"],
 [1.8,"Three keys to the radiation of angiosperms into freezing environments."],
 [1.8,"Nature. Dryad Digital Repository."],
 [1.8,"http://dx.doi.org/10.5061/dryad.63q27/2. (2013)."],
 [1,],
 [1.8,"Daniel J. McGlinn. Global plant species freezing exposure database. "],
 [1.8,"Data from: Three keys to the radiation of angiosperms into freezing environments."],
 [1.8,"Nature. Dryad Digital Repository. http://dx.doi.org/10.5061/dryad.63q27/4. (2013)."],
 [1,],
 [1.8,"David C. Tank, Jonathan M. Eastman, Jeremy M. Beaulieu,"],
 [1.8,"William K. Cornwell, Peter F. Stevens, Amy E. Zanne. "],
 [1.8,"Taxonomic lookup table containing clade-level mappings for 15.363 genera of Spermatophyta. "],
 [1.8,"Data from: Three keys to the radiation of angiosperms into freezing environments. "],
 [1.8,"Nature. Dryad Digital Repository. http://dx.doi.org/10.5061/dryad.63q27/1. (2013)."],
 [1,],
 [1.8,"David C. Tank, Jonathan M. Eastman,"],
 [1.8,"Jeremy M. Beaulieu, Stephen A. Smith. Phylogenetic resources. "],
 [1.8,"Data from: Three keys to the radiation of angiosperms into freezing environments. "],
 [1.8,"Nature. Dryad Digital Repository. http://dx.doi.org/10.5061/dryad.63q27/3. (2013)."],
 [1,],
 
 [2.2,"Original OneZoom publication reference"],
 [1.8,"Rosindell J and Harmon LJ"],
 [1.8,"OneZoom: A Fractal Explorer for the Tree of Life"],
 [1.8,"PLoS Biology DOI: 10.1371/journal.pbio.1001406 (2012)"],
 
 [4,],
 [4,"Images"],
 [1,],
 [3.0,"All images were downloaded from the Encyclopedia of Life www.eol.org"],
 [2.2,"Zoom into the copyright symbol on the bottom right"],
 [2.2,"of any image to see the author and source details"],
 [2,],
 
 [7,],
 [3,"Please go to www.OneZoom.org/about.htm for further details"],
 [2,],
 [3,"Thank you for exploring the tree of life with OneZoom"],
 [15,],
 ];

// SECTION 2: GLOBAL VARIABLE DECLARIATION

// display size variables - there are defaults but these values are automatically changed later
var widthres = 1000;
var heightres = 600;
var xmin = 0;
var xmax = widthres;
var ymin = 0;
var ymax = heightres;

var widthofcontrols = 920;
var widthofcontrols2 = 560;
var widthofinfobar = 620;

var buttonoptions = 0;
// data and graphics variables
var context; // the graphics element
var myCanvas; // the canvas

var fulltree; // the full tree
var datahastraits = false; // if data has traits

var popupboxlicense = false;
var popupboxabout = false;

// zoom and pan position variables
var ws = 1; // current zoom
var xp = widthres/2; // current x position
var yp = heightres;  // current y position
var wsinit; // used for comparison with ws to obtain zoom level
var calculating = false; // if in the process of calculating for zoom

// growth functions
var timelim = -1; // used as a global variable by the growth function to store the current time limit
var timeinc; // used as a global variable by the growth function to store the time scaling factor
var t2; // second timing object for growth function
var growing = false; // if in the process of growth
var growingpause = false;
var growingdir = true; // true if growing forwards

// flight functons
var flying = false; // if in the process of flying
var flying_2 = false; // if in the process of flying up or down as part of navigation.
var countdownB = 0;
var t; // timing object for flying

// search functions
var numhits;
var searchinparts = [];
var searchinfull = null;
var fullsearch = null;
var highlight_search = false;
var latin_search = true;
var common_search = true;
var trait_search = true;

// variables indicating current preferences
var infotype = 0; // for the info bar
var mywindow;

// variables for screensaver
var tout_ss; // time out for screen saver kick in
var tout_sw; // time out for view change in screen saver
var tout_aw; // time out for animation wait in screen saver

var screensaver_on = false; // screen saver in use right now
var viewchange_due = false; // view change is due soon

var nowloading = true;

// branch and leaf colouring algorithms

function midnode (x)
{
    // all the graphics parameters referenced from the reference point and reference scale which are set once and changed only when the fractal form is changed
    
    // for bezier curve (basic graphics element 1 of 2)
    var bezsx; // start x position
    var bezsy; // start y position
    var bezex; // end x position
    var bezey; // end y position
    var bezc1x; // control point 1 x position
    var bezc1y; // control point 2 y position
    var bezc2x; // control point 2 x position
    var bezc2y; // control point 2 y position
    var bezr; // line width
    
    // for the circle (basic graphics element 2 of 2)
    var arcx; // centre x position
    var arcy; // centre y position
    var arcr; // radius
    var arca; // angle of the arc
    
    // for the horizon (the region within which all graphics elements of this node and all its child nodes are contained)
    var hxmin; // min x value
    var hxmax; // max x value
    var hymin; // min y value
    var hymax; // max y value
    
    // for the graphics box (the region within which all graphics elements of this node alone (excluding its children) are contained
    var gxmin; // min x value
    var gxmax; // max x value
    var gymin; // min y value
    var gymax; // max y value
    
    // for the flight box (frames the region that defines a nice flight to the target after a search)
    var fxmin; // min x value
    var fxmax; // max x value
    var fymin; // min y value
    var fymax; // max y value
    
    // for the reference points of the two children
    var nextx1; // x refernece point for both children
    var nexty1; // y reference point for both children
    var nextx2; // x refernece point for both children
    var nexty2; // y reference point for both children
    var nextr1; // r (scale) reference for child 1
    var nextr2; // r (scale) reference for child 2
    
    // stores the refernce point and reference scale which get updated with each redraw of the page
    var xvar; // x
    var yvar; // y
    var rvar; // the value of r for the current view (null means nothign to draw)
    
    // variables indicating if drawing is needed for this node or its children updated with each redraw of the page
    var dvar; // true if this or its children need to be drawn
    var gvar; // true if graphics elements in this node itself need to be drawn
    
    // flight and search data
    var searchin = 0; // any part of a match of each term to some place in the search
    var searchin_full = 0; // exact match of search term
    var searchin_word = 0; // match to each complete word
    // note that we have no fuzzy search
    
    var startscore = 0; // gives this node a score for being the starting node
    var onroute = false;
    var targeted = false;
    var searchinpast = 0;
    var flysofarA = false;
    var flysofarB = false;
    
    // other data
    var npolyt = true; // true if node is NOT a polytomy
    var graphref = false; // true for one path of nodes through the tree, the IFIG is anchored on the node at the end of that path
    
    this.phylogenetic_diversity = 0.0;
    
    // This part of the code initialises the mode from newick format
    var bracketscount = 0;
    var cut;
    var end;
    
    // picture tools
    var num_pics = 0;
    var num_good_pics = 1;
    var picset_code; // the metacode of the leaves that we will draw the pictures of
    var picset_file; // this will store up to 6 example images - the file names - in priority order taking into account picture quality and PD
    var picset_qual; // this will store up to 6 example images - the file qualities - matching the picset_file array
    var picset_latin; // stores the latin names of the pictures
    var picset_common; // stores the common names of the pictures
    var MRCA_pic; // tells us if this node is an MRCA of the pics
    
    // sound tools
    var num_sounds = 0;
    var playing_sound = false;
    
    // signpost tools
    var drawsignposts_common = false;
    var drawsignposts_latin = false;
    var leafpic_drawn = false;
    
    // metadata code
    var metacode;
    
    // note: for leaves they get pic_file and pic_qual out of the newick and of course they have the name too.
    
    if (x.charAt(x.length-1) == ';')
    {
        x = x.substr(0,x.length-1);
    }
    
    if (x.charAt(0) == '(')
    {
        for (i = 0; i < x.length ; i++)
        {
            if (x.charAt(i) == '(')
            {
                bracketscount ++;
            }
            if (x.charAt(i) == ')')
            {
                bracketscount --;
            }
            if (x.charAt(i) == ',')
            {
                if (bracketscount == 1)
                {
                    cut = i;
                }
            }
            if (bracketscount == 0)
            {
                end = i;
                i = x.length +1;
            }
        }
        
        var cut1 = x.substr(1,cut-1);
        var cut2 = x.substr(cut+1,end-cut-1);
        var cutname = x.substr(end+1,x.length-end);
        // this is an interior node with name 'cutname'
        // the two children are given by cut1 ad cut2
        
        var lengthcut = -1;
        for (i = 0; i < cutname.length ; i++)
        {
            if (cutname.charAt(i) == ':')
            {
                lengthcut = i;
            }
        }
        if (lengthcut == -1)
        {
            this.lengthbr = null;
        }
        else
        {
            this.lengthbr = parseFloat(cutname.substr(lengthcut+1,(cutname.length)-lengthcut));
            cutname = cutname.substr(0,lengthcut);
        }
        
        // at this stage cutname does not have the length data associated with it
        // and we're on an interior node
        
        if (cutname.length > 0)
        {
            
            lengthcut = -1;
            
            for (i = 0; i < cutname.length ; i++)
            {
                if (cutname.charAt(i) == '[')
                {
                    lengthcut = i;
                    i = cutname.length;
                }
            }
            if (lengthcut == -1)
            {
                // no common names
                this.cname = null;
                this.name1 = cutname;
                this.name2 = null;
            }
            else
            {
                // common names
                
                this.metacode = parseInt(cutname.substr(lengthcut+1,(cutname.length)-lengthcut-2));
                if (lengthcut != 1)
                {
                    this.name1 = cutname.substr(0,lengthcut);
                }
                else
                {
                    this.name1 = null;
                }
                this.cname = metadata.node_meta[this.metacode][0];
            }
        }
        else
        {
            this.name2 = null;
            this.name1 = null;
            this.cname = null;
            this.metacode = null;
        }
        
        // initialise children
        this.child1 = new midnode(cut1,this);
        this.child2 = new midnode(cut2,this);
        // initialise interior node variables
        this.richness_val = 0;
    }
    else
    {
        this.child1 = null;
        this.child2 = null;
        this.richness_val =0; // these richness values are sorted out later
        
        var lengthcut = -1;
        for (i = 0; i < x.length ; i++)
        {
            if (x.charAt(i) == ':')
            {
                lengthcut = i;
            }
        }
        if (lengthcut == -1)
        {
            this.lengthbr = null;
        }
        else
        {
            this.lengthbr = parseFloat(x.substr(lengthcut+1,(x.length)-lengthcut));
            x = x.substr(0,lengthcut);
        }
        
        // at this stage cutname does not have the length data associated with it
        // and we're on a leaf node
        
        if (x.length > 0)
        {
            lengthcut = -1;
            for (i = 0; i < x.length ; i++)
            {
                if (x.charAt(i) == '[')
                {
                    lengthcut = i;
                    i = x.length;
                }
            }
            if (lengthcut == -1)
            {
                datahastraits = false;
            }
            else
            {
                
                this.metacode = parseInt(x.substr(lengthcut+1,(x.length)-lengthcut-2));
                x = x.substr(0,lengthcut);
                
                this.pic_file = metadata.leaf_meta[this.metacode][5];
                this.popstab = metadata.leaf_meta[this.metacode][3];
                this.redlist = metadata.leaf_meta[this.metacode][2]; // traits are defined here
                this.cname = metadata.leaf_meta[this.metacode][1];
                this.pic_qual = metadata.leaf_meta[this.metacode][6];
            }
            
            lengthcut = -1;
            for (i = 0; i < x.length ; i++)
            {
                if (x.charAt(i) == '_')
                {
                    lengthcut = i;
                    i = x.length;
                }
            }
            if (lengthcut == -1)
            {
                this.name2 = null;
                this.name1 = x;
            }
            else
            {
                this.name1 = x.substr(lengthcut+1,(x.length)-lengthcut-1);
                this.name2 =  x.substr(0,lengthcut);
            }
        }
        else
        {
            this.name2 = null;
            this.name1 = null;
            this.metacode = null;
            datahastraits = false;
        }
    }
}

midnode.prototype.branchcolor = function() // branch colour logic
{
    var colortoreturn = 'rgb(90,90,90)';
    var w_score;
    
    if ((this.num_H + this.num_V + this.num_W) == 0)
        {
            w_score = -1;
        }
        else
        {
            w_score = (this.num_W + 0.5*this.num_V)/(this.num_H + this.num_V + this.num_W);
            
        }
    
    
    if (w_score == -1)
    {
        colortoreturn = 'rgb(90,90,90)';
    }
    else
    {
        var tempcol_r = 100*w_score;
        var tempcol_g = 140-65*w_score;
        var tempcol_b = 50*w_score;
        colortoreturn = ('rgb('+ (Math.round(tempcol_r).toString()) +','+ (Math.round(tempcol_g).toString()) +','+ (Math.round(tempcol_b).toString())+')' );
        
        
    }
    return colortoreturn;
}

midnode.prototype.barccolor = function() // branch outline colour logic
{
    // this script sets the color for the outline of the branches
    var colortoreturn = 'rgba(50,37,25,0.3)';
    if (colourtype == 2)
    {
        if((this.lengthbr<70.6)&&(timelim<70.6))
        {
            colortoreturn = 'rgba(200,200,200,0.3)';
        }
    }
    if (colourtype == 3)
    {
        colortoreturn = 'rgba(0,0,0,0.3)';
    }
    return colortoreturn;
}

midnode.prototype.leafcolor1 = function()
{
    if (this.richness_val == 1)
    {
        if (this.num_V == 1)
        {
            return ('rgb(50,108,25)');
        }
        else if (this.num_H == 1)
        {
            return ('rgb(0,140,0)');
        }
        else if (this.num_W == 1)
        {
            return ('rgb(100,75,50)');
        }
        else
        {
            return ('rgb(90,90,90)');
        }
    }
    else
    {
        return (this.branchcolor());
    }
}


midnode.prototype.leafcolor2 = function()
{
    if (this.richness_val == 1)
    {
        if (this.num_V == 1)
        {
            return ('rgb(50,108,25)');
        }
        else if (this.num_H == 1)
        {
            return ('rgb(0,140,0)');
        }
        else if (this.num_W == 1)
        {
            return ('rgb(100,75,50)');
        }
        else
        {
            return ('rgb(90,90,90)');
        }
    }
    else
    {
        return (this.branchcolor());
    }
}

midnode.prototype.leafcolor3 = function()
{
    return ('rgb(255,255,255)'); // for the leaf text
}

midnode.prototype.hitstextcolor = function()
{
    // for text showing number of hits in each interior node (for search function)
    if ((this.npolyt)||(polytype == 3))
    {
        return ('rgb(255,255,255)');
    }
    else
    {
        return this.branchcolor();
    }
}

midnode.prototype.highlightcolor = function() // highlight colour logic
{
    return 'rgba(255,255,255,0.5)';
    /*
     // this logic defines the stripe colors that indicate search results, but could be edited to indicate other features such as traits
     return 'rgba('+(Math.round(255-254*this.searchin/numhits)).toString()+','+(Math.round(255-254*this.searchin/numhits)).toString()+','+(Math.round(255-254*this.searchin/numhits)).toString()+',0.6)';
     //*/
}

// image highlights
midnode.prototype.highlightcolor2 = function() // highlight colour logic
{
    if (redlistcolor("NE")==this.branchcolor())
    {
        return 'rgba(255,255,255,0.2)';
    }
    else
    {
        return 'rgba(0,0,0,0.2)';
    }
    
    
    /*
     // this logic defines the stripe colors that indicate search results, but could be edited to indicate other features such as traits
     return 'rgba('+(Math.round(255-254*this.searchin/numhits)).toString()+','+(Math.round(255-254*this.searchin/numhits)).toString()+','+(Math.round(255-254*this.searchin/numhits)).toString()+',0.6)';
     //*/
}

midnode.prototype.datetextcolor = function() // date text colour logic
{
    var colortoreturn = 'rgb(255,255,255)';
    if (colourtype == 2)
    {
        if ((this.lengthbr<150.8)&&(this.lengthbr>70.6))
        {
            colortoreturn = 'rgb(255,255,255)';
        }
    }
    if (colourtype == 3)
    {
        colortoreturn = 'rgb(255,255,255)';
    }
    return colortoreturn;
}

midnode.prototype.richnesstextcolor = function() // richness text colour logic
{
    var colortoreturn = 'rgb(255,255,255)';
    if (colourtype == 2)
    {
        if ((this.lengthbr<150.8)&&(this.lengthbr>70.6))
        {
            colortoreturn = 'rgb(255,255,250)';
        }
    }
    if (colourtype == 3)
    {
        colortoreturn = 'rgb(255,255,255)';
    }
    return colortoreturn;
}


midnode.prototype.drawPieSet = function(x,y,r)
{
    var piedata = [this.num_LC, this.num_NT, this.num_VU, this.num_EN,this.num_CR, this.num_EW, this.num_EX, this.num_DD,this.num_NE];
    var piekey = ["LC", "NT", "VU", "EN", "CR", "EW", "EX", "DD", "NE"];
    var piecolors = [0,0];
    piecolors.length = 9;
    var pietext1 = [0,0];
    pietext1.length = 9;
    for (i = 0 ; i < piekey.length ; i ++)
    {
        piecolors[i] = redlistcolor(piekey[i]);
        pietext1[i] = conconvert(piekey[i]);
    }
    var pietext2 = [,,"Threatened","Threatened","Threatened",,,,];
    
    // draw chart
    drawPie(x-r, y, r ,piedata,piecolors,this.richness_val);
    drawPieKey(x+r, y-r*0.75, r*0.2 , r*2 , piedata.slice(0,5),piecolors.slice(0,5),this.richness_val,pietext1.slice(0,5),pietext2.slice(0,5),piekey.slice(0,5),this.leafcolor3(),"species");
    drawPieKey(x+r, y-r*0.25, r*0.2 , r*1.6 , piedata.slice(5,9),piecolors.slice(5,9),this.richness_val,pietext1.slice(5,9),pietext2.slice(5,9),piekey.slice(5,9),this.leafcolor3(),"species");
    
    context.fillStyle = intnodetextcolor;
    autotext3(false,"Conservation status pie chart key" ,   x+r, y+r*0.5,r*2,r*0.25);
}

// if draw second pie is set then this will be drawn instead of the speaker when there are no sounds - this is a bit of a fix but it's good enough

midnode.prototype.drawPieSet_2 = function(x,y,r)
{
    var piedata = [this.num_W, this.num_H, this.num_V, this.num_U];
    var piekey = ["Wood", "Herb", "Var", "?"];
    var piecolors = ['rgb(100,75,50)','rgb(0,140,0)','rgb(50,108,25)','rgb(90,90,90)'];
    var pietext1 = ["Woody", "Herbaceous", "Variable", "Unknown"];
    var pietext2 = ["","","",""];
    
    // draw chart
    //console.log(piedata);
    // console.log(piecolors);
    //console.log(this.richness_val);

    
    
    drawPie(x-r, y, r ,piedata,piecolors,this.richness_val);
    drawPieKey(x+r, y-r*0.75, r*0.2 , r*1.2 , piedata.slice(0,2),piecolors.slice(0,2),this.richness_val,pietext1.slice(0,2),pietext2.slice(0,2),piekey.slice(0,2),this.leafcolor3(),"species");
    drawPieKey(x+r, y-r*0.25, r*0.2 , r*1.2 , piedata.slice(2,4),piecolors.slice(2,4),this.richness_val,pietext1.slice(2,4),pietext2.slice(2,4),piekey.slice(2,4),this.leafcolor3(),"species");
    
    context.fillStyle = intnodetextcolor;
    autotext3(false,"Plant woodyness pie chart key" ,   x+r, y+r*0.5,r*2,r*0.25);
}

midnode.prototype.concalc = function() // calculation of metadata - need not be conservation based
{
    this.num_EX = 0;
    this.num_EW = 0;
    this.num_CR = 0;
    this.num_EN = 0;
    this.num_VU = 0;
    this.num_NT = 0;
    this.num_LC = 0;
    this.num_DD = 0;
    this.num_NE = 0;
    
    this.num_W = 0;
    this.num_H = 0;
    this.num_U = 0;
    this.num_V = 0;
    
    if (this.child1)
    {
        (this.child1).concalc();
        (this.child2).concalc();
        
        
        this.num_EX = ((this.child1).num_EX) + ((this.child2).num_EX);
        this.num_EW = ((this.child1).num_EW) + ((this.child2).num_EW);
        this.num_CR = ((this.child1).num_CR) + ((this.child2).num_CR);
        this.num_EN = ((this.child1).num_EN) + ((this.child2).num_EN);
        this.num_VU = ((this.child1).num_VU) + ((this.child2).num_VU);
        this.num_NT = ((this.child1).num_NT) + ((this.child2).num_NT);
        this.num_LC = ((this.child1).num_LC) + ((this.child2).num_LC);
        this.num_DD = ((this.child1).num_DD) + ((this.child2).num_DD);
        this.num_NE = ((this.child1).num_NE) + ((this.child2).num_NE);
        
        this.num_W = ((this.child1).num_W) + ((this.child2).num_W);
        this.num_H = ((this.child1).num_H) + ((this.child2).num_H);
        this.num_U = ((this.child1).num_U) + ((this.child2).num_U);
        this.num_V = ((this.child1).num_V) + ((this.child2).num_V);
        
    }
    else
    {
        this.num_EX = 0;
        this.num_EW = 0;
        this.num_CR = 0;
        this.num_EN = 0;
        this.num_VU = 0;
        this.num_NT = 0;
        this.num_LC = 0;
        this.num_DD = 0;
        this.num_NE = 0;
		
        this.num_W = 0;
        this.num_H = 0;
        this.num_U = 0;
        this.num_V = 0;
        
        if (this.redlist)
        {
            switch(this.redlist)
            {
                case "EX":
                {
                    this.num_EX = 1;
                    break;
                }
                case "EW":
                {
                    this.num_EW = 1;
                    break;
                }
                case "CR":
                {
                    this.num_CR = 1;
                    break;
                }
                case "EN":
                {
                    this.num_EN = 1;
                    break;
                }
                case "VU":
                {
                    this.num_VU = 1;
                    break;
                }
                case "NT":
                {
                    this.num_NT = 1;
                    break;
                }
                case "LC":
                {
                    this.num_LC = 1;
                    break;
                }
                case "DD":
                {
                    this.num_DD = 1;
                    break;
                }
                case "NE":
                {
                    this.num_NE = 1;
                    break;
                }
                default:
                {
                    this.num_NE = 1;	
                    break;
                }
            }
        }
        else
        {
            this.num_NE = 1;
        }
        
        this.num_U = 1;
		if (metadata.leaf_meta[this.metacode][3])
		{
			switch(metadata.leaf_meta[this.metacode][3])
			{
				case "W":
				{
					this.num_W = 1;
                    this.num_U = 0;
					break;
				}
				case "H":
				{
					this.num_H = 1;
                    this.num_U = 0;
					break;
				}
				case "variable":
				{
					this.num_V = 1;
                    this.num_U = 0;
					break;
				}
            }
		}
    }
}

midnode.prototype.extxt = function() // returns text for redlist status
{
    if (this.redlist)
    {
        return conconvert(this.redlist);
    }
    else
    {
        return ("Not Evaluated");
    }
}

midnode.prototype.poptxt = function() // returns text for redlist status
{
    if (this.popstab)
    {
        switch(this.popstab)
        {
            case "D":
				return ("decreasing");
            case "I":
				return ("increasing");
            case "S":
				return ("stable");
            case "U":
            {
                if ((this.redlist == "EX")||(this.redlist == "EW"))
                {
                    return ("extinct");
                }
                else
                {
                    return ("stability unknown");
                }
            }
            default:
				if ((this.redlist == "EX")||(this.redlist == "EW"))
				{
					return ("extinct");
				}
				else
				{
					return ("stability unknown");
				}
        }
    }
    else
    {
        if ((this.redlist == "EX")||(this.redlist == "EW"))
        {
            return ("extinct");
        }
        else
        {
            return ("stability unknown");
        }
    }
}

midnode.prototype.specnumfull = function()
{
    var num_threatened = (this.num_CR + this.num_EN + this.num_VU);
    if (num_threatened > 0)
    {
        return (this.richness_val).toString() + " species ( " + (num_threatened).toString() +" threatened - " + (Math.round((num_threatened)/(this.richness_val)*1000.0)/10.0).toString() + "% )";
    }
    else
    {
        return (this.richness_val).toString() + " species, none threatened";
    }
}

midnode.prototype.leaf_txtline2 = function()
{
    return ("Conservation status: " + this.extxt());
}

midnode.prototype.leaf_txtline1 = function()
{
    
    // for choosing popular species select here
    if (choosing_pop_spec)
    {
        return(this.metacode.toString());
    }
    
    
        // for leaves only
        if (this.num_W == 1)
        {
            return ("Woody plant");
        }
        if (this.num_H == 1)
        {
            return ("Herbaceous plant");
        }
        if (this.num_V == 1)
        {
            return ("Variable between woody and herbaceous");
        }
        return ("Unknown woodiness");
}

midnode.prototype.node_spec_txtline1 = function()
{
    var num_threatened = (this.num_CR + this.num_EN + this.num_VU);
    
    var speciestext1;
    
    if (num_threatened > 0)
    {
        if (num_threatened > 1)
        {
            speciestext1 = (num_threatened).toString() + " of " + (this.richness_val).toString() + " species are threatened ( " + (Math.round((num_threatened)/(this.richness_val)*1000.0)/10.0).toString() + "% )" ;
        }
        else
        {
            speciestext1 = (num_threatened).toString() + " of " + (this.richness_val).toString() + " species is threatened ( " + (Math.round((num_threatened)/(this.richness_val)*1000.0)/10.0).toString() + "% )" ;
        }
    }
    else
    {
        speciestext1 = (this.richness_val).toString() + " species, none are threatened";
    }
    
    // for choosing popular species select here
    if (choosing_pop_spec)
    {
        speciestext1 = this.metacode.toString();
    }
    return(speciestext1);
}

// resize the canvas to fit the space
function Resize_only()
{
    
    myCanvas.width = myCanvas.clientWidth;//1920-285;
    myCanvas.height = myCanvas.clientHeight//1080;
    widthres =  myCanvas.width;
    heightres =  myCanvas.height;
}

function draw_loading()
{
	
    Resize_only();
    if (backgroundcolor)
    {
        context.fillStyle = backgroundcolor;
        context.fillRect(0,0,widthres,heightres);
    }
    else
    {
        context.clearRect(0,0,widthres,heightres);
    }
    
    context.beginPath();
    context.textBaseline = 'middle';
    context.textAlign = 'left';
    
    context.fillStyle = 'rgb(0,0,50)';
    context.font = '110px Helvetica';
    context.textAlign = 'center';
    context.fillText  ("Loading", (widthres+control_width)/2-control_width,heightres/2, widthres);
    
    return true;
}

// this initialises the whole IFIG

function init()
{
    myCanvas = document.getElementById("myCanvas");
    context= myCanvas.getContext('2d'); // sort out the canvas element
    
    Resize_only();
    
    draw_loading();
    
    var tempscript = document.createElement('script');
    tempscript.setAttribute("id", "_tree");
    document.head.appendChild(tempscript);
    tempscript.src = data_path_tree;
    tempscript.onload = function () {
        var tempscript2 = document.createElement('script');
        tempscript2.setAttribute("id", "_meta");
        document.head.appendChild(tempscript2);
        tempscript2.src = data_path_meta;
        tempscript2.onload = function () {
            var tempscript3 = document.createElement('script');
            tempscript3.setAttribute("id", "_JScode");
            document.head.appendChild(tempscript3);
            tempscript3.src = "OZ_W_1/JScode_W_10.js";
            tempscript3.onload = function () {
                var tempscript4 = document.createElement('script');
                tempscript4.setAttribute("id", "_Drawing");
                document.head.appendChild(tempscript4);
                tempscript4.src = "OZ_W_1/Drawing.js";
                tempscript4.onload = function () {
                    var tempscript5 = document.createElement('script');
                    tempscript5.setAttribute("id", "_UI");
                    document.head.appendChild(tempscript5);
                    tempscript5.src = "OZ_W_1/UI_codes.js";
                    tempscript5.onload = function () {
                        setTimeout('init2()',10);
                    };
                };
            };
        };
    };
}

// todo linkng to other viewers