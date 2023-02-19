const { isUser } = require('../middleware/guards')
const preload = require('../middleware/preload')
const { getAllPhotos, getPhotosCount, postComment } = require('../services/photo')

const router = require('express').Router()

router.get('/', (req, res) => {

    res.render('home', { title: 'Home Page' })

})

router.get('/catalog', async (req, res) => {

    const photos = await getAllPhotos()

    res.render('catalog', { title: 'Catalog Page', photos, username: photos.owner })
})

router.get('/catalog/:id', preload(), (req, res) => {


    try {


        // console.log(res.locals.crypto);
        const photos = res.locals.photos
        if (!photos) {
            throw new Error('Not found!')
        }

        // crypto.remainingSeats = crypto.seats - crypto.buddies.length
        if (req.session.user) {
            console.log(req.session.user._id, photos.owner._id);
            photos.hasUser = true
            photos.isOwner = req.session.user._id == photos.owner._id

            // console.log(crypto);
            // if (photo.buyCrypto.some(a => a._id == req.session.user._id)) {
            //     photo.isJoined = true
            // }
        }

        res.render('details', { title: "Details", photos })
    }

    catch (err) {
        res.render('404', { title: "404" })
    }
})

router.get('/profile', isUser(), async (req, res) => {

    const photoByUser = await getPhotosCount(res.locals.user._id)
    res.locals.user.photos = photoByUser
    res.locals.user.length = photoByUser.length

    res.render('profile', { title: "Profile Page" })
})

router.post('/postComment/:id', isUser(), async (req, res) => {

    const photoId = req.params.id
    console.log(req.body);
    const comment = req.body.comment
    const userId = req.session.user._id

    try {
        await postComment(photoId, userId, { comment })


    } catch (err) {

        console.error(err);

    }
    finally {
        res.redirect('/catalog/' + photoId)
    }

})

module.exports = router