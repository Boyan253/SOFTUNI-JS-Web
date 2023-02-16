const { isUser, isOwner } = require('../middleware/guards')
const preload = require('../middleware/preload')
const { createAd, updateAd, deleteAdById } = require('../services/ad')
const { mapErrors } = require('../util/mappers')

const router = require('express').Router()


router.get('/create', isUser(), (req, res) => {


    res.render('create', { title: "Create Page", data: {} })
})

router.post('/create', isUser(), async (req, res) => {

    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id,
        usersApplied: req.body.usersApplied
    }

    try {
        await createAd(ad)
        res.redirect('/allAds')
    } catch (err) {


        const errors = mapErrors(err)
        res.render('create', { title: "Create Trip Offer", data: ad, errors })
    }

})

router.get('/edit/:id', preload(), isOwner(), async (req, res) => {




    res.render('edit', { title: "Edit Page" })
})
router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id
    }
    try {


        await updateAd(id, ad)
        res.redirect('/allAds/' + id)
    } catch (err) {
        console.error(err)
        const error = mapErrors(err)
        res.render('edit', { title: "Edit Page", error })

    }
})

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id
    await deleteAdById(id)
    res.redirect('/allAds')

})
module.exports = router