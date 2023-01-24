

const router = require('./router')

const http = require('http');

const { homePage, aboutPage, defaultPage } = require('./homeController');
const { catalogPage, createPage, createItem } = require('./catalogController');


router.get('/', homePage)
router.get('/home', homePage)
router.get('/about', aboutPage)
router.get('/catalog', catalogPage)
router.get('default', defaultPage)
router.get('/create', createPage)
router.post('/create',createItem)

const server = http.createServer(router.match)






server.listen(3030)



