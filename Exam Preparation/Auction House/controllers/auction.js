const router = require('express').Router()
const { isUser, isGuest, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createAuction, joinBid, updateBid } = require('../services/auction');
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');


router.get('/create', isUser(), (req, res) => {

    res.render('create', { title: 'Create Page' })

})

router.post('/create', isUser(), async (req, res) => {

    const auction = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        author: req.session.user._id
    }

    try {

        await createAuction(auction)
        res.redirect('/browse')

    } catch (err) {
        console.error(err)
        const errors = mapErrors(err)

        res.render('create', { title: "Create Trip Offer", auction, errors })


    }

    res.render('create', { title: "Create Page" })
})

router.get('/edit/:id', preload(), isOwner(), (req, res) => {

    console.log('in here');


    res.render('edit', { title: "Edit Page" })

})


router.post('/bid/:id', isUser(), async (req, res) => {

    const auctionId = req.params.id
    const userId = req.session.user._id
    const bid = Number(req.body.bid)
    const auction = {
        bid
    }

    try {

        await updateBid(auctionId, auction)
        await joinBid(auctionId, userId)
        res.redirect('/browse/' + auctionId)
    } catch (err) {

        const errors = mapErrors(err)
        console.log(errors);
        res.render('home', { errors })
    }






})



module.exports = router