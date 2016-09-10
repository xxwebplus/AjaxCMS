<div style="width:400px; float:right; ">{{carousel | back-e.jpg | back-b.jpg | back-c.jpg | back-d.jpg | back-a.jpg }}</div>
## What is this?

AjaxCMS is an open source static file based CMS that runs almost entirely in the browser.  You add content by uploading HTML or Markdown files into the "pages" folder.  If you want them in the menu
then you upload them to the "pages/menus" folder.  These files are automatically detected and added to the menu, folders of files are turned into drop down menus.  When the menus or links 
are clicked the content of the file is displayed without doing a page refresh.  This has a number of implications.  

1. First, it is fast.  The main "theme" html, css and javascript is loaded and processed once when the page loads.  Subsequent page loads are then just inserted into the content area using AJAX.
This means that only the actual content needs to be loaded and processed by the browser.

2. You don't need a server side database, or code.  Because all the site content on the server is just static HTML it does not need to be processed by the webserver.  It is just sent as is.
This again contributes to greater speed.

3. Because the page is not reloaded you can create interesting effects such as page transitions and background animations that are not interrupted or restarted every time you click a link.
The animation running in the background of this page is just a small program using Javascript and the HTML5 Canvas.  

4. Because there is no administrative backend common to most CMS systems and because there is no server side code or database, the site is much less vulnerable to hackers.  There are no CMS vulnerabilities
requiring constant updates or holes for possible SQL injection.

5. It is very simple.  At the moment the entire code of AjaxCMS is less than 1000 lines not including the various libraries (jquery, bootstrap, animations, etc.) It is all included in just 
two files: index.html and js/ajaxcms.js.  This means that it is relatively simple to understand the entire source code by just having a basic understanding of javascript.

## How does it work?
By default the Apache web server will show a file listing if you go a folder that does not contain an index.hmtl file.  AjaxCMS utilizes this to recursively load the files and directories 
listed in the "pages" folder the first time you go to the page.  It will use this list to build the menu.  If there is a number followed by a dash at the front of the file name (ie. 01-file.html) 
it will use this to order the menu items.  It will remove the extension (.html or .md) from the end and will use that as the name of the menu item.  This means that at the moment AJAX CMS 
requires that Apache be used as the web server, however it would be trivial to modify the code to parse directory lists from other web servers.

AjaxCMS pages support "Layouts" and "Inserts".  If a folder contains a file called "layout.html" then the files in that folder and it's subfolders will be inserted into the layout before it
is displayed.  Pages and layouts can also contain "inserts" which allows other files to be embedded inside a file.  This makes it simple to develop complex and consistent layouts.

## Features
1. Mobile Friendly - By default AjaxCMS uses bootstrap to provide a themeable responsive grid-based layout that will adapt to different devices.  Swipe events are also detected and can be used 
to navigate forward and backwards through the menus as can the left and right arrow keys.

2. Markdown - You can create pages as either .html files or .md (markdown) files.  Markdown is generally faster and easier for novice users to edit, while plain html allows for more complex layouts.

3. Helpers - There are a number of helpers that will assist in tasks like finding and inserting non-menu links and images, or more complicated things like slideshows.  See the 
{{a | documentation | class=>testclass | id=>testid }} for more information.

4. Themes - AjaxCMS is easily themeable.  We plan to support the development of the AjaxCMS core through the sales of themes consisting of background animations combined with CSS color schemes.
For a list of the themes currently available click on the "Themes" menu at the top right.

## Limitations
There are some things that just cannot be done with a pure static file client side system.  AjaxCMS is basically just for viewing content, the user can look around but cannot change anything.
For the majority of simple sites, this is fine.  But it does mean that you can't include things like response forms, chat rooms, forums, shopping carts, wikis, etc without using external tools.
However, due to the recent widespread compatibility of AJAX enabled browsers there are many options to embed dynamic features like the ones mentioned above.  These include embedded google maps, 
discussion boards like http://disqus.com, or response forms using http://forms.google.com

## Plans for the Future.
We will continue development of the core of AjaxCMS as an open source project under the GPL v3 license. In order to support the development of AjaxCMS we plan to sell individual and site licences
for the background animations and themes.  We also intend to develop a number of services that will allow functionality not possible in a purely client side system.  This will include features 
like a shopping cart, discussion forum, wiki, calendar, form creation etc. Please note that many of these features are already available from a number of vendors and can already be integrated with
AjaxCMS.

If you have any questions or suggestions or would like to purchase a theme please contact me at <a href="mailto:brandon.hoult@softwyre.com">brandon.hoult@softwyre.com</a>
