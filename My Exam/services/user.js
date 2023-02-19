const User = require("../models/User")

const { compare, hash } = require('bcrypt')


//TODO add all fields required by the exam
async function register(username, email, password) {

    const existing = await getUserByUsername(username)
    console.log(existing);
    if (existing) {
        throw new Error('Username is taken')
    }
    const hashedPassword = await hash(password, 10)
    const user = new User({
        username,
        email,
        hashedPassword

    });
    await user.save();
    return user;
}
//TODO change identifier
async function login(username, password) {
    const user = await getUserByUsername(username)
    if (!user) {
        throw new Error('Incorrect Email or Password')
    }
    const hashMatch = await compare(password, user.hashedPassword)

    if (!hashMatch) {
        throw new Error('Incorrect Email or Password')

    }
    return user

}


//TODO idenfity user by given identifier(email or username or whatever)

async function getUserByUsername(username) {
    const user = await User.findOne({ username })
    return user
}

module.exports = {
    login,
    register
}