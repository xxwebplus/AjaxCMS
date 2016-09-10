Welcome to AjaxCMS.

This is the initial release of the AjaxCMS platform.  We are releasing the core of AjaxCMS as an open source system and hope to support further development through the sales of "themes" or donations.  For more
information or to purchase a theme please contact <brandon.hoult@softwyre.com>.

### Intro.  AjaxCMS v1.0

AjaxCMS works kind of backwards from a traditional CMS such as Wordpress, Joomla, or Drupal.  In those systems you have content stored in a database which is then processed by code running on a server before
being sent to the browser as finished html.  The browser is just used as a display.  In AjaxCMS content is stored as static html or Markdown files on the server, there is no database, there is no server side code, all
layout is done on the users browser.  This results in a number of benefits such as speed, security, and the ability to use visual effects in javascript as well as page transitions.  For more information please read
the {{a | Home | Homepage}} and the Documentation.

### Does the world really need another CMS?
If AjaxCMS functioned like a traditional CMS such as Wordpress, Joomla, or Drupal there would not be much point.  All these CMS systems were introduced many years ago and have gone through many iterations.  They are 
established, well known and mostly secure unless you start adding a bunch of untested plugins or modules.  They started out focused on a particular use but have since evolved into extremely complicated general purpose 
systems with hundreds of interrelated PHP files.  

Since that time there have been many attempts to make a better CMS in a different, more powerful, more efficient language or framework. None have been successful because the community surrounding the early systems 
along with the thousands of plugins and modules they create make it nearly impossible to make anything comparable.  But in the last few years a lot of things have changed.

HTML5 and CSS3 along with the standardization of Javascript have finally make the browser into a "platform".  A "platform" is a system of supporting technologies such as computers, operating systems, server-side languages,
databases, and client side languages that are needed to support a website.  This complicated network of interrelated systems has been the way it had to be until now. Finally, you can now accomplish the same with 
just a browser and a bunch of static files.

This has mostly been made possible by a technology known as AJAX (Asynchronous JavaScript and XML).  This allowed a website to load and update pieces of a page instead of doing a full page refresh as had always been the
case.  Because of this the pieces of a complex website requiring a dynamic backend that had been the role of insecure plugins and modules could be replaced by small snippets of Javascript that can connect parts of 
your website to external services.  These services can run on any platform or CMS and are professionally maintained so that the burden of maintaining and securing them can be removed from the individual web developer.
Examples include [Disqus](https://disqus.com/) for comments, or [Google Forms](https://forms.google.com) for online forms.  All the complex functionality that used to require code proprietary to a specific platform 
has becoming generic and is externally managed.

Fully utilizing these new new technologies would require rewriting the core of traditional CMS systems and would involve a great deal of work.  AjaxCMS instead focuses on the relatively simple task of just displaying
basic pages.  This allows for a small code base without security vulnerabilities using minimal resources.  As a side benefit you can also finally incorporate many of the newest developments to create seamless 
animated effects.

### Is it ready to use.

Yes.  Test whatever you make on the major browsers for compatibility and if it works for you then it should work for everyone else.  Although this is a first release and there will be bugs they will not impact security  
because of the absence of server side code or databases.

It has been tested in all modern browsers for basic functionality and should work on both mobile and desktop devices.  We are continuing to add features and some aspects may change in the future, but upgrades will mostly
involve just updating a single file "js/ajaxcms.js".  Unlike traditional CMS systems you don't have to upgrade for security reasons, so the only reason to do so is if there is a bug that has been fixed, or if you want 
to use new functionality in later versions.

Any bugs will be limited to client side where they cannot cause any damage to other users.  Bugs will be limited to the few users that have not updated their browsers in the last several years and should not make the site
unusable.  At some point we intend to create a failover version for ancient incompatible browsers or for screen readers for the visually impaired that cannot handle javascript.

We will update this blog as new versions become available.

### Conclusion.

This has been the result of many months of work and I look forward to hearing any questions or suggestions you might have.  Feel free to contact me at <brandon.hoult@softwyre.com>.