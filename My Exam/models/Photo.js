const { Schema, model, Types: { ObjectId } } = require('mongoose')

//TODO change user model according to the exam description
//TODO add validation
const IMAGE_PATTERN = /^(http:\/\/|https:\/\/)/
const petsSchema = new Schema({
    name: { type: String, minlength: [2, "Name should be at least 2 characters"] },
    image: {
        type: String, required: [true, 'Image should start with http:// or https://'], validate: {
            validator(value) {
                return IMAGE_PATTERN.test(value)
            },
            message: 'Image should start with http:// or https://'
        }
    },
    age: {
        type: Number, required: [true, `age should be a positive number between 1 and 100 (inclusive)`], validate: {
            validator: function (value) {
                return value > 0 && value <= 100;
            },
            message: `age should be a positive number between 1 and 100 (inclusive).`
        }
    },
    description: {
        type: String, required: [true, 'description should be between 1 and 100 characters'], minlength: [1, "description should be between 1 and 100 characters"], maxlength: [100, "description should be between 1 and 100 characters"]
    },
    location: {
        type: String, required: [true, "location should be between 5 and 50 characters"], minlength: [5, "location should be between 5 and 50 characters"], maxlength: [50, "location should be between 5 and 50 characters"]
    },
    commentList: [],
    owner: { type: ObjectId, ref: 'User', required: true },

});


const Pets = model('Photo', petsSchema)

module.exports = Pets