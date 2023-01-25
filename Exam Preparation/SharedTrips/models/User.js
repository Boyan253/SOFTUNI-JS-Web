const { Schema, model, Types: {ObjectId} } = require('mongoose')

//TODO change user model according to the exam description
//TODO add validation

// const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/


const userSchema = new Schema({
    email: {type: String, validate: {
        validator(value){
            return EMAIL_PATTERN.test(value)
        },
        message: 'Email should be in the following format (mailboxname@domainname)'
    }},
    hashedPassword: {type: String, minlength: [4, 'The password should be at least 4 characters long']},
    gender: {type: String, required: true},
    trips: {type: [ObjectId], ref: "Trip", default: []} 
        });
   
   
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})
const User = model('User', userSchema)

module.exports = User