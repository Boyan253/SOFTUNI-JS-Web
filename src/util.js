function html(body, title = 'Demo Site') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<title>${title}</title>
<head>
<body>
<nav>
<ul>
<li><a href='/home'>Home</a> </li>
<li><a href='/catalog'>Catalog</a> </li>
<li><a href='/create'>Create</a> </li>
<li><a href='/about'>about</a> </li>
</ul>
</nav>
${body}
    </body>


    </html>`



}
const data = [
    {
        id: 'asdf0001',
        name: 'Product 1',
        color: 'Red'
    },
    {
        id: 'asdf0002',
        name: 'Product 2',
        color: 'Green'
    }
]
module.exports = {
    html,
    data
}