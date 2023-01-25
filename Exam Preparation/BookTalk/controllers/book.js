
const preload = require('../middleware/preload')
const { isUser, isOwner } = require('../middleware/guards')
const { mapErrors } = require('../util/mappers')
const { createBooks, editBookById, deleteById } = require('../services/book')


const router = require('express').Router()


router.get('/create', isUser(), (req,res) => {
res.render('create', {Title: 'Create Book', book: {}})

})

router.post('/create', isUser(), async (req,res) => {


const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: req.body.stars,
    image: req.body.image,
    bookReview: req.body.bookReview,
    owner: req.session.user._id

}


    try {
        
await createBooks(book)

res.redirect('/catalog')
        
    } catch (err) {
        console.error(err)
        const errors = mapErrors(err)

        res.render('create', {Title: 'Create Book', book, errors})
    }

})

router.get('/edit/:id', preload(), isOwner(), (req,res) => {

res.render('edit', {Title: 'Edit Page'})

})
router.post('/edit/:id', preload(), isOwner(),async (req,res) => {

    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: req.body.stars,
        image: req.body.image,
        bookReview: req.body.bookReview,
        owner: req.session.user._id
    
    }
    
try {
    
await editBookById(req.params.id, book)
res.redirect('/catalog' )
} catch (err) {
console.error(err)
    const errors = mapErrors(err)

    res.render('edit', {Title: 'Edit Page', errors})
}


    })
    router.get('/delete/:id', preload(), isOwner(),async (req,res) => {

        await deleteById(req.params.id)
        
        res.redirect('/catalog')
        
        
        })


module.exports = router