const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  clientId: { type: String },
  clientInfo: {type: Object},
  prefix: {type: String},
  author: {type: Object},
  shortDesc: {type: String},
  desc: {type: String},
  tags: {type: Array},
  guild_support: {type: String},
  dashboard: {type: String},
  addedStamp: {type: Date, default: Date.now()},
  tags: {type: Array},
  verificado: {type: Boolean},
  certificado: {type: Boolean},
  revisado: {type: String},
  voters: { type: Array, required: false},
  votes: {type: Number}
})

module.exports = mongoose.model('Bot', UserSchema );