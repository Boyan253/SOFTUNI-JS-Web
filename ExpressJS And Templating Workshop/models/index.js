const mongoose = require('mongoose')
require('./Car')
require('./accessory')
const connectionString = 'mongodb://localhost:27017/Carbicle'

async function init() {
    try {
        await mongoose.connect(connectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.connection.on('error', (err) =>{
            console.log(err);
        })
        console.log('Database Connected.');
    } catch (error) {
        console.error('Error Connecting to Database')
        console.log(error)
        process.exit(1)
    }


}

module.exports = init