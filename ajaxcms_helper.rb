#! /usr/bin/env ruby
sitename = ARGV[0]

files = `find pages -type f`.split("\n").delete_if{|x| x =~ /layout.html$/}

# Convert files into AjaxCMS urls
url_list = ""
for file in files
	url_list += "<url><loc>#{sitename}/?page=#{file}</loc></url>\n"
end

# Wrap in sitemap
sitemap = <<SITEMAP
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\n#{url_list}
</urlset>
SITEMAP

# Write to file.
File.open("sitemap.xml", 'w') { |file| file.write(sitemap) }