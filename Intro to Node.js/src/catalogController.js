

const { html,data } = require('./util')
const formidable = require('formidable')
const {IncomingForm} = require('formidable')
function catalogPage(req, res){
    res.write(html(
        ` <h1>Catalog</h1>
        <p>List of items:</p>
        <ul>
        ${data.map(i => `<li>${i.name} - ${i.color} </li>`).join('\n')}
        </ul>
      `,'catalog'))
    res.end()}

    function createPage(req,res){
res.write(html(`
<h1>Create Item</h1>
<form method="POST" action="/create"> 
<label>Name:<input type='text' name="name"></label>
<label>Color:<select name="color">
<option value="red">Red
<option value="green">green
<option value="blue">blue</label>
<input type = "submit" value = "create">
</form>`))

    }
    function createItem(req,res){
const form = new IncomingForm()
form.parse(req, (err,fields) => {
 console.log(fields);
 
 const item = {
  id: ('asdf0000' + (Math.random() *9999 | 0)).slice(0,8),
  name: fields.name,
  color: fields.color
 }
 data.push(item) 
 res.writeHead(301,[
  'Location',
  '/catalog'
 ])
 res.end()
})

    }
    
     module.exports = {
        catalogPage,
        createPage,
        createItem
     }