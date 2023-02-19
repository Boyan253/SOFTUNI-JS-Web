const { isUser, isOwner } = require('../middleware/guards')
const preload = require('../middleware/preload')
const { createPhoto, updatePhoto, deletePhoto } = require('../services/photo')
const { mapErrors } = require('../util/mappers')

const router = require('express').Router()

router.get('/addPhoto', isUser(), async (req, res) => {





    res.render('create', { title: 'Create Page' })
})

router.post('/addPhoto', isUser(), async (req, res) => {




    const photo = {

        name: req.body.name,
        age: req.body.age,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image,
        owner: req.session.user._id

    };

    try {
        await createPhoto(photo)
        res.redirect('/catalog')

    }
    catch (err) {
        console.error(err)
        const errors = mapErrors(err)
        res.render('create', { title: 'Create Page', errors })
    }




})

router.get('/edit/:id', preload(), isOwner(), (req, res) => {

    res.render('edit', { title: 'Edit Page' })
})

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {


    const id = req.params.id

    const photo = {

        name: req.body.name,
        age: req.body.age,
        description: req.body.description,
        location: req.body.location,
        image: req.body.image,
        owner: req.session.user._id
    }
    try {
        await updatePhoto(id, photo)
        res.redirect("/catalog/" + id)

    } catch (err) {
        const errors = mapErrors(err)
        res.render('edit', { title: 'Edit Page', errors })
    }

})

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {

    const photo = req.params.id


    await deletePhoto(photo)
    res.redirect("/catalog")


})

module.exports = router
