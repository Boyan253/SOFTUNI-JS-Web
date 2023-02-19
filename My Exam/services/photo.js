const Photos = require('../models/Photo')
const mongoose = require('mongoose')
const User = require('../models/User')

async function createPhoto(photo) {

    const result = new Photos(photo)

    await result.save()


}

async function getAllPhotos() {
    return await Photos.find({}).populate('owner').lean()

}

async function getPhotoById(photo) {

    if (mongoose.Types.ObjectId.isValid(photo)) {
        return Photos.findById(photo).populate("owner").lean()
    } else {
        return undefined
    }
}

async function updatePhoto(id, photo) {

    const existing = await Photos.findById(id)
    existing.name = photo.name
    existing.age = photo.age
    existing.location = photo.location
    existing.description = photo.description
    existing.image = photo.image

    await existing.save()


}
async function deletePhoto(photo) {
    return Photos.findByIdAndDelete(photo)
}

async function getPhotosCount(userId) {
    return Photos.find({ owner: userId }).lean()

}

async function postComment(photoId, userId, { comment }) {
    const photo = await Photos.findById(photoId)
    const user = await User.findById(userId)
    console.log(user);
    const commentAndUser = {
        id: user._id,
        username: user.username,
        comment: comment
    }

    photo.commentList.push(commentAndUser)

    await photo.save()

}

module.exports = {
    createPhoto,
    getAllPhotos,
    getPhotoById,
    updatePhoto,
    deletePhoto,
    getPhotosCount,
    postComment
}