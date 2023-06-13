const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: { type: String },
  user: {type: Object},
  logged: {type: Boolean}
})

module.exports = mongoose.model('User', UserSchema );