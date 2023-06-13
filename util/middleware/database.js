const mongoose = require('mongoose');
const config = require("../../config")
const colors = require("colors")
let url = config.user.mongo;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
 console.log("> Base de datos conectado".green)
}).catch((err) => {
  console.log(err)
})
