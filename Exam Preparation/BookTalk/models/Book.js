const { Schema, model, Types: {ObjectId} } = require('mongoose')


const bookSchema = new Schema({

    title :{type: String, required: [true, 'Title is required']},
    author: {type: String, required: [true, 'Author is required']},
    image: {type: String, required: [true, 'Image is required']},
    bookReview: {type: String, required: [true, 'Review is required']},
    genre: {type: String, required: [true, 'Genre is required']},
    stars: {type: Number,required:  [true, 'Star rating is required'], validate: {validator: function(value) {
        return value >= 0 && value <= 5;


    },
message: 'The stars rating should be a number from 0 to 5'}},
    wishingList : { type: [ObjectId], ref: 'User', default: []},
    owner: { type: ObjectId, ref: 'User'}

})


const Book =  model('Book', bookSchema)


module.exports = Book

//Title - String (required),
//Author: String (required),
//Image: String (required),
//Book Review: String (required),
//Genre: String (required),
//Stars: Number (required) between 1 and 5,
//WishingList – a collection of Users (a reference to the User model)
//Owner - object Id (a reference to the User model)
