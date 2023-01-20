const { html } = require('./util')


function homePage(req, res) {

    res.write(html(
        `
  <h1>Home Page</h1>
  <p>Welcome to our site</p>
`))
    res.end()
} function aboutPage(req, res) {

    res.write(html(
        `
  <h1>About Us</h1>
  <p>Contact: +1-555-1957</p>`))
    res.end()
} function defaultPage(req, res) {

    res.write(html(
        `
        <h1>Error 404</h1>
        <p>Not Found</p>
        `))
    res.end()
}

module.exports = {
homePage,
defaultPage,
aboutPage


}