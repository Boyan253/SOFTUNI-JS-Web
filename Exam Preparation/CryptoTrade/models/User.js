const { Schema, model, Types: {ObjectId} } = require('mongoose')

//TODO change user model according to the exam description
//TODO add validation

const userSchema = new Schema({
    username: {type: String, required:true},
    email: {type: String, required:true},
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