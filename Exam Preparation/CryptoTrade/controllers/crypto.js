const { isUser, isOwner } = require('../middleware/guards')
const preload = require('../middleware/preload')
const { createCrypto, updateCrypto, deleteCrypto } = require('../services/crypto')

const router = require('express').Router()


router.get('/create', isUser(), (req, res) => {



    res.render('create', { title: 'Create Offer' })

})

router.post('/create', isUser(), async (req, res, next) => {


    const crypto = {

        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        payment: req.body.payment,
        owner: req.session.user._id



    }

    try {
        await createCrypto(crypto)
        res.redirect('/catalog')

    } catch (err) {

        next(err)
    }



})


router.get('/edit/:id', preload(), isOwner(), async (req, res) => {
    let crypto = res.locals.crypto
    paymentOptions = {
        "crypto-wallet": "Crypto Wallet",
        "credit-card": "Credit Card",
        "debit-card": "Debit Card",
        "paypal": "Paypal"
    };
    const paymentMethods = Object.keys(paymentOptions).map(
        key => ({
            value: key, label:
                paymentOptions[key],
            isSelected: crypto.payment == key
        }))
    crypto.paymentMethods = paymentMethods
    console.log(paymentMethods);
    res.render('edit', { title: 'Edit Page' })
})


router.post('/edit/:id', preload(), isOwner(), async (req, res, next) => {

    const id = req.params.id

    const crypto = {

        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        payment: req.body.payment,
        owner: req.session.user._id
    }
    try {
        await updateCrypto(id, crypto)
        res.redirect("/catalog/" + id)

    } catch (err) {
        next(err)
    }

})

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    const crypto = req.params.id

    try {
        await deleteCrypto(crypto)
        res.redirect("/catalog")
    } catch (err) {
        next(err)
    }



})


module.exports = router
