const preload = require('../middleware/preload')
const { getAllAds, searchAll } = require('../services/ad')

const router = require('express').Router()


router.get('/', (req, res) => {

    res.render('home', { title: "Home Page" })



})

router.get('/allAds', async (req, res) => {


    const ads = await getAllAds()


    res.render('all-ads', { title: 'Catalog Page', ads })



})


router.get('/allAds/:id', preload(), async (req, res) => {

    const ad = res.locals.ad
    if (ad.usersApplied.length == 0) {
        ad.remainingUsers = 0
    } else {

        ad.remainingUsers = ad.usersApplied.length
    }
    if (req.session.user) {

        ad.hasUser = true
        ad.isOwner = req.session.user._id == ad.author._id

        console.log(ad);
        if (ad.usersApplied.some(a => a._id == req.session.user._id)) {
            ad.isJoined = true
        }

    }

    res.render('details', { title: "Trip Details" })


})

router.get('/search',async (req, res) => {
    const ad = await searchAll(req.query)
    if (ad == undefined) {
        console.log('hi');
    }
    console.log(ad);
    res.render('search', { title: "Search Page", ad })

})

module.exports = router