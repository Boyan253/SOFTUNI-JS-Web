const Book = require('../models/Book')


async function joinWishList(bookId, id){

    const book =  await Book.findById(bookId)

    if (book.wishingList.includes(id)) {
        throw new Error('User already joined')
    }
    book.wishingList.push(id)
    
    await book.save()
    


}


async function getAllBooks() {

    return Book.find({}).lean()

}

async function createBooks(book) {

    const result = new Book(book)

    await result.save()

}

async function getBooksById(bookId) {

    return Book.findById(bookId).lean()


}

async function editBookById(id, book) {

    const existing = await Book.findById(id)

    existing.title = book.title
    existing.author = book.author
    existing.image = book.image
    existing.genre= book.genre
    existing.stars= book.stars
    existing.bookReview = book.bookReview
    
    await existing.save()

}

async function deleteById(id) {

return Book.findByIdAndDelete(id)


}

async function getBooksCount(userId){

    return Book.find({owner: userId}).lean()

}

module.exports = {
    getAllBooks,
    getBooksById,
    createBooks,
    editBookById,
    deleteById,
    joinWishList,
    getBooksCount
}