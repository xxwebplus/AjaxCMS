/////////////////////////////////  CONFIGURATION   ///////////////////////////////
		
var load_transition = "slide";

$.ajaxSetup({ cache: false });

//////////////////////////////////////////////////////////////////////////////////

var menus = [];
var pages = [];
var blogs = [];
var images = [];

var menu_count = 0; // Keep track of recursive asyncronous directory list.
var pages_count = 0;
var images_count = 0;
var base_url = window.location.href.replace(/\?.*/,'');
var params = window.location.href.replace(/.*\?/,'').split('&');
var current_page;
var menu_pages;


// Resize <main> to fit children;
function scaleMain(selector) {
    var objHeight = $(selector).height();
    $('#main').height(objHeight);
}

// return url parameter value
function param(key) {
	for (i=0; i<params.length; i++) {
		x = params[i].split("=");
		if (x[0] == key) {return x[1]}
	}
}

// Pages return just the html files (not directories)
function findPages(p) {
	return $.grep(p, function(n,i){
		return /[\.html|\.md]$/.test(n);
	});
}

// Return Index of specified menu
function menuIndex(m) {
	return menus.indexOf(m);
}
function mpIndex(m) {
	return menu_pages.indexOf(m);
}


// Parse apache directory listing data... add to menus
function load_menus(url) {
	url = url.replace(/\/$/,''); // Remove trailing slash from starting point url
	menu_count++;
	$.get( url, function( data ) {
		var f;
		var rows = $(data).find('tr');
		for (i = 3; i < rows.length - 1; i++) {
			f = $(rows[i]).find('td a')[0].innerHTML;
			menus.push(url+'/'+f);
			// Call directory recursively.
			if (/\/$/.test(f)) { // if file list ends in / then it is a dir
				load_menus(url+'/'+f);
			}
		}
	}).then(function(){
		menu_count--;
		if (menu_count === 0) {
			// Stuff to run after menu list is loaded.
			menus.sort();
			makemenu();
			menu_pages = findPages(menus);
			
			// Load the page in the params if specified, first menu page otherwise.
			p = param('page');
			if (p) {
				loadPage('./'+p, true);
				current_page = p;
			} else {
				current_page = findPages(menus)[0];
				loadPage(current_page, true); // Load the first page (home page) on init.
			}
		}
	});
}

// Parse apache directory listing data... add to pages
function load_pages(url) {
	url = url.replace(/\/$/,''); // Remove trailing slash from starting point url
	pages_count++;
	$.get( url, function( data ) {
		var f;
		var rows = $(data).find('tr');
		for (i = 3; i < rows.length - 1; i++) {
			f = $(rows[i]).find('td a')[0].innerHTML;
			pages.push(url+'/'+f);
			// Call directory recursively.
			if (/\/$/.test(f)) { // if file list ends in / then it is a dir
				load_menus(url+'/'+f);
			}
		}
	}).then(function(){
		pages_count--;
		if (pages_count === 0) {
			// Stuff to run after page list is loaded.	
		}
	});
}

// Parse apache directory listing data... add to images
function load_images(url) {
	url = url.replace(/\/$/,''); // Remove trailing slash from starting point url
	images_count++;
	$.get( url, function( data ) {
		var f;
		var rows = $(data).find('tr');
		for (i = 3; i < rows.length - 1; i++) {
			f = $(rows[i]).find('td a')[0].innerHTML;
			if (f == 'icon/') { continue; }
			if (f == 'thumb/') { continue; }
			if (f == 'small/') { continue; }
			if (f == 'medium/') { continue; }
			if (f == 'large/') { continue; }
			images.push(url+'/'+f);
			// Call directory recursively.
			if (/\/$/.test(f)) { // if file list ends in / then it is a dir
				load_images(url+'/'+f);
			}
		}
	}).then(function(){
		images_count--;
		if (images_count === 0) {
			// Stuff to run after page list is loaded.	
		}
	});
}

// Return the url of the first partial-match image.
function imageMatch(s) {
	for (i=0; i<images.length; i++) {
		var re = new RegExp(s,"gi");
		if (re.test(images[i])){return images[i]} 
	}
}

// Do shortcut replacement in page html content.  (links and stuff)
function process_page(data,url) {
	var d; 
	var size;
	
	// Convert stuff in {{ }} to page transition (use for internal links) example: {{page/test.html}}
	d = data.replace(/\{\{.*\}\}/gi, function myFunction(x){
		var parts = x.replace(/{{/g,'').replace(/}}/g,'').split('|');
		for (i=0; i < parts.length; i++) {parts[i] = parts[i].trim().toLowerCase()}

		// Anchors
		if (parts[0]=='a' && parts.length == 2) {
			return "<a onclick=\"loadPage(\'" + parts[1] + "\')\">"+parts[1]+"</a>";
		}
		if (parts[0]=='a' && parts.length == 3) {
			return "<a onclick=\"loadPage(\'" + parts[1] + "\')\">"+parts[2]+"</a>";
		}
		if (parts[0]=='a' && parts.length == 4) {
			return "<a onclick=\"loadPage(\'" + parts[1] + "\')\" alt=\"" + parts[3] + "\">"+parts[2]+"</a>";
		}
		
		// Images
		if (parts[0]=='i' && parts.length == 2) {
			return "<img src=\"" + imageMatch(parts[1]) + "\" alt=\"" + imageMatch(parts[1]) + "\">";
		}
		if (parts[0]=='i' && parts.length == 3) {
			return "<img src=\"" + imageMatch(parts[1]) + "\" alt=\"" + parts[2] + "\">";
		}
		if (parts[0]=='i' && parts.length == 4) {
			return "<img src=\"" + imageMatch(parts[1]) + "\" alt=\"" + parts[2] + "\" class=\"" + parts[3] + "\">";
		}
		if (parts[0]=='i' && parts.length == 5) {
			return "<img src=\"" + imageMatch(parts[1]) + "\" alt=\"" + parts[2] + "\" class=\"" + parts[3] + "\" style=\"" + parts[4] + "\">";
		}
		
		return ""
	});
	
	// Filter content through markdown if the file extension is .md
	if (/\.md/.test(url)){ 
		d = marked(d); 
		
	}
	
	return d
}

// Define functions for load transitions.
function loadPageBasic(url) {
	$.get( url, function( data ) {
	  data = process_page( data,url );
	  $("main").html( data );
	});
}

function loadPageSlide(url) {
	$.get( url, function( data ) {
		data = process_page( data,url )
		$("#b").html( data )
	}).then(function(){
		  // scaleMain('#b');
		  if (menuIndex(url) > menuIndex(current_page)) {
		  	$("#a").hide("slide", { direction: "left"}, 500);
			$("#b").show("slide", { direction: "right", complete: function(){
			  current_page = url;
			  $("#a").html($('#b').html());
			  $("#a").show();
			  $("#b").hide();
			  }}, 500);
		  } else if (menuIndex(url) < menuIndex(current_page) && menuIndex(url) != -1) {
		  	$("#a").hide("slide", { direction: "right"}, 500);
			$("#b").show("slide", { direction: "left", complete: function(){
			  current_page = url;
			  $("#a").html($('#b').html());
			  $("#a").show();
			  $("#b").hide();
			  }}, 500);
		  } else {
		    $("#a").hide("fade", { }, 500);
			$("#b").show("fade", { complete: function(){
			  current_page = url;
			  $("#a").html($('#b').html());
			  $("#a").show();
			  $("#b").hide();
			  }}, 500);
		  }
		  
	});
}

// Set load_transition variable at top to set transition type for page loads.
function loadPage(url,save) {
	highlightMenu(url);
	switch(load_transition) {
		case 'basic':
			loadPageBasic(url)
			break;
		case 'slide':
			loadPageSlide(url);
			break;
		default:
			loadPageBasic(url);
	}
	
	if (save == undefined || save == true) {
		var old_url = window.location.href
		var new_url = base_url+'?page='+url.replace(/^\.\//,'');
		window.history.pushState({page: new_url},'test',new_url);
	}
};

function fileToClass(n){
	return n.replace(/\/$/,'').replace(/[\.|\\|\/|\s]/g,'-');
}

function highlightMenu(fn) {
    var c = fn.split('/').slice(0,3).join('/');
    c = fileToClass(c);
	$('#menu li').removeClass('active');
	$('.'+c).addClass('active');
}

// Put the pages in the menu (can only be two levels deep)
function makemenu() {
    $.each(menus, function(index,file){
    	var filename = file;
    	
    	filename = filename.replace(/\.\/menus\//,''); // Remove ./pages from beginning
    	filename = filename.replace(/\d+\-/,'');       // Remove any digits followed by a dash at the beginning (use for sort)
    	filename = filename.replace(/\.html$/,'');     // Remove .html from end.
    	filename = filename.replace(/\.md$/,'');  
    	
    	classname = fileToClass(file);

    	if (/\/$/.test(filename)) { 
    		// It is a directory
    		$('#menu').append(
    			'<li class="dropdown '+classname+'"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
    			+ filename.replace(/\/$/,'')
    			+ '<span class="caret"></span></a><ul class="dropdown-menu" id="'+filename+'"></ul></li>'
    		);
    	} else {
    		// It is a file
    		var parts = filename.split('/');
    		if (parts.length > 1) {
    			$('#'+parts[0]+'\\\/').append('<li class="file '+classname+'"><a onclick="loadPage(\''+file.replace(/\//g,'\\\/')+'\');">'+parts[1].replace(/\d+\-/,'')+'</a></li>');
    		} else {
				$('#menu').append('<li class="file '+classname+'"><a onclick="loadPage(\''+file.replace(/\//g,'\\\/')+'\');">'+filename+'</a></li>');
    		}
    	}
	});
}

// Back button clicked
$(window).on("popstate", function(e) {
	page = e.originalEvent.state.page
    loadPage('./' + /(.*)\?page\=(.*)/.exec(page)[2],false); // the part after the ?page=
});

// Get the directory listings.
load_menus('./menus');
load_pages('./pages');
load_images('./images');

// When the page is loaded.
$( document ).ready(function() {
    // Setup Swipe Events
	$("#a").on("swiperight",function(event){
		if (mpIndex(current_page) > 0){
			loadPage(menu_pages[mpIndex(current_page)-1],true);
		}
	});
	$("#a").on("swipeleft",function(event){
		if (mpIndex(current_page) < menu_pages.length){
			loadPage(menu_pages[mpIndex(current_page)+1],true);
		}
	});
});