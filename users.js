const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)
