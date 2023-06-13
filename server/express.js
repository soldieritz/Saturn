const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const methodOverride = require('method-override')
const bodyParser = require("body-parser")
const BotClient = require("./bot");
const passport = require("./passport");
const flash = require('connect-flash')
const cors = require("cors");
var corsOptions = {
  origin: "http://127.0.0.1:3000"
};

app
  .set("port", process.env.PORT || 3000)
  .use(express.static("public"))
  .use(
    session({
      secret: "dashboardfeliz",
      resave: false,
      saveUninitialized: false,
    })
  )
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
  }) 
  .use(cors(corsOptions))
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use((req, res, next) => {
res.locals.success = req.flash('success');
res.locals.errors = req.flash('errors');
res.locals.error = req.flash('error');
res.locals.addbot_errors = req.flash('addbot_errors');
res.locals.user = req.user || null;

next()
  })
  .use(express.urlencoded({extended: true}))
  .use(methodOverride('_method'))
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, '../views'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(express.static("public"))
  .use((req, res, next) => {
    req.BotClient = BotClient;
    next();
  })
  .use("/", require("../routes/routes"))
  .use("/", require("../routes/bots/add"))
  .use("/", require("../routes/bots/edit"))
  .use("/", require("../routes/bots/view"))
  .use("/", require("../routes/bots/delete"))
  .use("/", require("../routes/user/profile"))
  .use("/", require("../routes/bots/resend"))
  .use("/", require("../routes/user/vote"));
  
module.exports = app;