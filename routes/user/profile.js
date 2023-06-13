const { Router } = require("express");
const router = Router();
const passport = require("../../server/passport");
const { auth } = require("../../util/middleware/auth");
const User = require("../../util/models/user")
const Bots = require("../../util/models/bot")
const client = require("../../server/bot")
const config = require("../../config.js")

router.get("/user/:id", async (req, res) => {
    const us = await User.findOne({userId: req.params.id})
    if(!us){
      req.flash("error", "Este usuario no se encontro")
      return res.redirect("/")
    }
    const usuario = await client.users.fetch(us.userId).catch(error => null)
    const bots = await Bots.find({ "author.id": us.userId })
    let profileAvatar;
    if(usuario.avatar.substring(0,2) === "a_"){
      profileAvatar = `https://cdn.discordapp.com/avatars/${usuario.id}/${usuario.avatar}.gif`
    } else {
      profileAvatar = `https://cdn.discordapp.com/avatars/${usuario.id}/${usuario.avatar}.jpeg`
    }
    res.render("user", {usuario, user: req.user, profileAvatar, bots});
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