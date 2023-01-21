const { getAllTrips, getTripById, joinTrip } = require('../services/trip')
const preload = require('../middleware/preload')
const { isUser } = require('../middleware/guards')

const router = require('express').Router()

router.get('/', (req,res) => {
    res.render('home')
})

router.get('/trips', async (req,res) => {
const trips = await getAllTrips()
res.render('catalog', {title: "SharedTrip", trips})
})

router.get('/trips/:id', preload(true), async (req,res) => {
const trip = res.locals.trip
trip.remainingSeats = trip.seats - trip.buddies.length
    if (req.session.user) {
       
        trip.hasUser = true
        trip.isOwner = req.session.user._id == trip.owner._id


if (trip.buddies.some(a => a._id == req.session.user._id)) {
    trip.isJoined = true
}

    }
    
res.render('details', {title: "Trip Details" })

})

router.get('/join/:id', preload(true), isUser(), async (req,res) => {
const tripId = req.params.id
const userId = req.session.user._id


try {
    await joinTrip(tripId, userId)


} catch (err) {
    
console.error(err);

}
finally{
    res.redirect('/trips/' + tripId)
}


})


module.exports = router