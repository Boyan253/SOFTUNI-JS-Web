

const router = require('./router')
const { response } = require('express');
const http = require('http');
const { homePage, aboutPage, defaultPage } = require('./homeController');
const { catalogPage } = require('./catalogController');


router.register('/', homePage)
router.register('/home', homePage)
router.register('/about', aboutPage)
router.register('/catalog', catalogPage)
router.register('default', defaultPage)

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    console.log(url);
    const handler = router[url.pathname]

    if (typeof handler == 'function') {
       handler(req,res)

    } else {
        defaultPage(req,res)
    }

})

server.listen(3030)



