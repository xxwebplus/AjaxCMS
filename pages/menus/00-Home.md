## What is this?

AJAX CMS is a static file based CMS that runs almost entirely in the browser.  You add content by uploading HTML or Markdown files into the "pages" folder.  If you want them in the menu
then you upload them to the "pages/menus" folder.  These files are automatically detected as "pages" and are added to the menu, folders of files are turned into drop down menus.  When the menus or links 
are clicked the contents of the file is loaded into the content area without doing a page refresh.  This has a number of implications.  

1. First, it is fast.  The main "theme" html, css and javascript is loaded and processed once when the page loads.  Subsequent page loads are then just inserted into the content area using AJAX.
This means that only the actual content needs to be loaded and processed by the browser.
2. You don't need a server side database, or code.  Because all the site content on the server is just static HTML it does not need to be processed by the webserver.  It is just sent as is.
This again contributes to greater speed.
3. Because the page is not reloaded you can create interesting effects such as page transitions and background animations that are not interrupted or restarted every time you click a link.
The animation running in the background of this page is just a small program using Javascript and the HTML5 Canvas.  
4. Because there is no administrative backend common to CMS systems and because there is no server side code or database, the site is much less hackable.  There are no CMS vulnerabilities
requiring constant updates or holes for possible SQL injection.

## How does it work?
By default Apache will show a file listing if you go a folder that does not contain an index.hmtl file.  AJAX CMS recursively loads the files and directories listed in the "pages" folder 
the first time you go to the page.  It will use this list to build the menu.  If there is a number followed by a dash at the front of the file (ie. 01-file.html) it will use this to order 
the menu items.  It will remove the extention (.html or .md) from the end and will use that as the name of the menu item.  This means that at the moment AJAX CMS requires that Apache be used
as the webserver, however it would be trivial to modify the code to parse directory lists from other webservers.

## Features
1. Mobile Friendly - By default it uses bootstrap to provide a themeable responsive grid-based layout that will adapt to different devices.  Swipe events are also detected and can be used 
to navagate forward and backwards through the menus.
2. Markdown - You can create pages as either .html files or .md (markdown) files.  Markdown is generally faster and easier for novice users to edit.
3. Helpers - There are a number of helpers that will assist in tasks like finding and inserting non-menu links and images, or more complicated things like slideshows.  See the documentation
for more information.

## Limitations
There are some things that just cannot be done with a pure static file client side system.  AJAX CMS is basically just for viewing content, the user can look around but cannot change anything.
For the majority of simple sites, this is fine.  But it does mean that you can't include things like response forms, chat rooms, forums, shopping carts, wikis, etc without using external tools.
However, due to the recent wide spread compatibility of AJAX enabled browsers there are many options to embed dynamic features like the ones mentioned above.  These include embedded google maps, 
discussion boards like http://disqus.com, or response forms using http://forms.google.com

* _If you happen to find this site at the moment, please note that it is still being developed and is not meant for public use.  We intend to release it as open source when it is stable._