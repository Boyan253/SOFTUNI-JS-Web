const { Schema, model, Types: {ObjectId} } = require('mongoose')

//TODO change user model according to the exam description
//TODO add validation

const userSchema = new Schema({
    username: {type: String, required: [true, 'Username is required']},
    email: {type: String, required: [true, 'Email is required']},
    hashedPassword: {type: String, required:true},
   
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