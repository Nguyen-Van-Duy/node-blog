const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/db_courses');
        console.log("connect successfully!!!")
    }catch(err) {
        console.log("connect failure!!!")
    }

}
module.exports = {connect};