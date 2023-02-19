const { Schema, model, Types: { ObjectId } } = require('mongoose')

//TODO change user model according to the exam description
//TODO add validation

const userSchema = new Schema({
    username: { type: String, minlength: [2, "Username should be at least 2 characters long!!"] },
    email: { type: String, minlength: [10, "Email should be at least 10 characters long!!"] },
    hashedPassword: { type: String, minlength: [4, "Password should be at least 4 characters long!!"] },

});


userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})
const User = model('User', userSchema)

module.exports = User