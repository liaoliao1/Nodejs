let mongoose = require('mongoose')
let Schema = mongoose.Schema
let userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    nick_name: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: String, default: Date.now() },
    enable_flag: { type: String, default: 'Y' }
})
let userModel = mongoose.model('users', userSchema)

module.exports = userModel