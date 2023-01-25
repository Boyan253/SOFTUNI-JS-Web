const Trip = require('../models/Trip');


async function getAllTrips() {
    return Trip.find({}).lean()
}


async function getTripsCount(userId) {
    return Trip.find({owner: userId}).lean()
}



async function createTrip(trip){

const result = new Trip(trip);

await result.save();

}


async function updateTrip(id,trip){

const existing = await Trip.findById(id)


existing.start = trip.start,
existing.end = trip.end,
existing.date = trip.date,
existing.time = trip.time,
existing.carImg = trip.carImg,
existing.carBrand = trip.carBrand,
existing.seats = trip.seats,
existing.price = trip.price,
existing.description = trip.description

await existing.save()

}


async function deleteById(id){

return Trip.findByIdAndDelete(id)

}




async function getTripById(id){{
    return Trip.findById(id).lean()
}}
async function getTripAndUsers(id){{
    return Trip.findById(id).lean().populate('owner').populate('buddies')
}}


async function joinTrip(tripId, id){

const trip =  await Trip.findById(tripId)

if (trip.buddies.includes(id)) {
    throw new Error('User already joined')
}
trip.buddies.push(id)

await trip.save()

}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getTripAndUsers,
    updateTrip,
    deleteById,
    joinTrip,
    getTripsCount
}