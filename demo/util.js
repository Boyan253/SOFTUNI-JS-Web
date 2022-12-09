function html(body, title = 'Demo Site') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<title>${title}</title>
<head>
<body>
<nav>
<ul>
<li><a href='/catalog'>Catalog</a> </li>
<li><a href='/about'>about</a> </li>
<li><a href='/home'>Home</a> </li>
</ul>
</nav>
${body}
    </body>


    </html>`



}
module.exports = {
    html
}