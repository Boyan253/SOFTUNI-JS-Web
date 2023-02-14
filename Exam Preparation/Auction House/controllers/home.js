const router = require('express').Router()
const { getAllAuctions } = require('../services/auction')
const { isUser, isGuest } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');



router.get('/', (req, res) => {

    res.render('home', { title: "Home Page" })


})

router.get('/browse', async (req, res) => {

    const auctions = await getAllAuctions()

    res.render('browse', { title: 'Catalog Page', auctions })
})

router.get('/browse/:id', preload(), (req, res) => {

    const auction = res.locals.auction
    if (req.session.user) {

        auction.hasUser = true
        auction.isOwner = req.session.user._id == auction.author._id
        if (auction.bidder.some(a => a._id == req.session.user._id)) {
            auction.isJoined = true
        }
        if (auction.isOwner == true) {

            res.render('details-owner', { title: 'Details Page' })


        } else {
            res.render('details', { title: "Details Page" })
        }


    } else {
        res.render('details', { title: "Details Page" })
    }




})
router.get('/closed', (req,res) => {


    
})

module.exports = router


