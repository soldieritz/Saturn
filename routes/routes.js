const { Router } = require("express");
const router = Router();
const passport = require("../server/passport");
const { auth } = require("../util/middleware/auth");
const User = require("../util/models/user")
const Bots = require("../util/models/bot")
const moment = require("moment");
require("moment-duration-format");
const client = require("../server/bot")
const config = require("../config.js")
const fetch = require("node-fetch2")
const tagss = config.user.tags;
router.get("/", async (req, res) => {
  const bots = await Bots.find({ revisado: "accepted"})

  res.render("home", {user: req.user, bots});
});


router.get("/login", passport.authenticate("discord"),async (req, res) => {
  if(req.user){
    const us = await User.findOne({ userId: req.user.id})
     if(!us){await User.create({userId: req.user.id})}
    }
  req.flash("success", "Te logeaste correctamente")
  res.redirect("/");
});
module.exports = router;