const { isUser } = require('../middleware/guards')
const preload = require('../middleware/preload')
const { getAllCrypto, getCryptoById, buyCrypto, searchAll } = require('../services/crypto')

const router = require('express').Router()



router.get('/', (req, res) => {


    res.render('home', { title: 'Home Page' })
})


router.get('/catalog', async (req, res) => {


    const crypto = await getAllCrypto()

    res.render('catalog', { title: 'Catalog Page', crypto })
})

router.get('/catalog/:id', preload(), async (req, res) => {


    try {


        // console.log(res.locals.crypto);
        const crypto = res.locals.crypto
        if(!crypto){
            throw new Error('Not found!')
        }
        console.log(crypto);
        // crypto.remainingSeats = crypto.seats - crypto.buddies.length
        if (req.session.user) {
            console.log(req.session.user._id, crypto.owner._id);
            crypto.hasUser = true
            crypto.isOwner = req.session.user._id == crypto.owner._id

            // console.log(crypto);
            if (crypto.buyCrypto.some(a => a._id == req.session.user._id)) {
                crypto.isJoined = true
            }
        }
        res.render('details', { title: "Details" })
    }

    catch (err) {
        res.render('404', { title: "404" })
    }

})
router.get('/buy/:id', preload(), isUser(), async (req, res) => {
    const cryptoId = req.params.id
    const userId = req.session.user._id


    try {
        await buyCrypto(userId, cryptoId)


    } catch (err) {

        next(err)

    }
    finally {
        res.redirect('/catalog/' + cryptoId)
    }
})


router.get('/search', async (req, res) => {

    const crypto = await searchAll(req.query)

    res.render('search', { title: "Search Page", crypto })


})


module.exports = router