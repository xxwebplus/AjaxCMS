/////////////////////////////////  CONFIGURATION   ///////////////////////////////
		
var load_transition = "slide";

$.ajaxSetup({ cache: false });

//////////////////////////////////////////////////////////////////////////////////

var menus = [];
var pages = [];
var blogs = [];
var images = [];

var count = 0; // Keep track of recursive asyncronous directory list.
var base_url = window.location.href.replace(/\?.*/,'');
var params = window.location.href.replace(/.*\?/,'').split('&');


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
		return /[\.html|\.md]$/.test(n)
	});
}

// Parse apache directory listing data... add to menus
function load_menus(url) {
	url = url.replace(/\/$/,''); // Remove trailing slash from starting point url
	count++;
	$.get( url, function( data ) {
		var f;
		var rows = $(data).find('tr');
		for (i = 3; i < rows.length - 1; i++) {
			f = $(rows[i]).find('td a')[0].innerHTML
			menus.push(url+'/'+f);
			// Call directory recursively.
			if (/\/$/.test(f)) { // if file list ends in / then it is a dir
				load_menus(url+'/'+f);
			}
		}
	}).then(function(){
		count--;
		if (count == 0) {
			// Stuff to run after menu list is loaded.
			menus.sort();
			makemenu();
			
			p = param('page');
			
			if (p) {
				loadPage(p, true);
			} else {
				loadPage(findPages(menus)[0], true); // Load the first page (home page) on init.
			}
		}
	});
}

// Parse apache directory listing data... add to pages
function load_pages(url) {
	url = url.replace(/\/$/,''); // Remove trailing slash from starting point url
	count++;
	$.get( url, function( data ) {
		var f;
		var rows = $(data).find('tr');
		for (i = 3; i < rows.length - 1; i++) {
			f = $(rows[i]).find('td a')[0].innerHTML
			pages.push(url+'/'+f);
			// Call directory recursively.
			if (/\/$/.test(f)) { // if file list ends in / then it is a dir
				load_menus(url+'/'+f);
			}
		}
	}).then(function(){
		count--;
		if (count == 0) {
			// Stuff to run after page list is loaded.	
		}
	});
}

// Do shortcut replacement in page html content.  (links and stuff)
function process_page(data,url) {
	var d; 
	
	// Convert stuff in {{ }} to page transition (use for internal links) example: {{page/test.html}}
	d = data.replace(/\{\{.*\}\}/gi, function myFunction(x){return "<a onclick=\"loadPage(\'" + x.replace(/[{{|}}]/g,'') + "\')\">test</a>"});
	
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
		  scaleMain('#b')
		  $("#a").hide("slide", { direction: "left"}, 500);
		  $("#b").show("slide", { direction: "right", complete: function(){
			  $("#a").html($('#b').html());
			  $("#a").show();
			  $("#b").hide();
		  } }, 500);
		  
	});
}

// Set load_transition variable at top to set transition type for page loads.
function loadPage(url,save) {
	console.log('url: '+ url);
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
		console.log('state pushed');
		window.history.pushState({page: new_url},'test',new_url);
	}
};

// Put the pages in the menu (can only be two levels deep)
function makemenu() {
    $.each(menus, function(index,file){
    	var filename = file;
    	
    	filename = filename.replace(/\.\/menus\//,''); // Remove ./pages from beginning
    	filename = filename.replace(/\d+\-/,'');       // Remove any digits followed by a dash at the beginning (use for sort)
    	filename = filename.replace(/\.html$/,'');     // Remove .html from end.
    	filename = filename.replace(/\.md$/,'');  
    	
    	if (/\/$/.test(filename)) { 
    		// It is a directory
    		$('#menu').append(
    			'<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'
    			+ filename.replace(/\/$/,'')
    			+ '<span class="caret"></span></a><ul class="dropdown-menu" id="'+filename+'"></ul></li>'
    		);
    	} else {
    		// It is a file
    		var parts = filename.split('/');
    		if (parts.length > 1) {
    			$('#'+parts[0]+'\\\/').append('<li class="file"><a onclick="loadPage(\''+file.replace(/\//g,'\\\/')+'\');">'+parts[1].replace(/\d+\-/,'')+'</a></li>');
    		} else {
				$('#menu').append('<li class="file"><a onclick="loadPage(\''+file.replace(/\//g,'\\\/')+'\');">'+filename+'</a></li>');
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