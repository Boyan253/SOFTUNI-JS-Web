const { Schema, model, Types: {ObjectId} } = require('mongoose')

const IMAGE_PATTERN = /^(http:\/\/|https:\/\/)/


const tripSchema = new Schema ({

    start: {type: String, minlength: [4, 'The Starting Point and End Point should be at least 4 characters long (each).']},
	end: {type: String, minlength: [4, 'The Starting Point and End Point should be at least 4 characters long (each).']},
   date: {type: String, required: true},
	time: {type: String, required: true},
	carImg: {type: String, validate: {
        validator(value){
            return IMAGE_PATTERN.test(value)
        },
        message: 'Image should start with http:// or https://'
    }},
	carBrand: {type: String, minlength: [4, 'The Car Brand should be minimum 4 characters long.']},
	seats: {type: Number,   validate: {
		validator: function(value) {
			return value >= 0 && value <= 4;
		},
		message: `{VALUE} is not a valid seats! It should be a positive number between 0 and 4 (inclusive).`}},
	price: {type: Number, validate: {
		validator: function(value) {
			return value >= 0 && value <= 50;
		},
		message: `{VALUE} is not a valid price! It should be a positive number between 0lv. and 50lv. (inclusive).`}},
	description: {type: String, minlength: [10, 'The Description should be minimum 10 characters long.']},
	owner: {type: ObjectId,  ref:"User",required: true},
	buddies : {type: [ObjectId], ref: 'User', default: []}



})


const Trip = model('Trip', tripSchema)

module.exports = Trip


