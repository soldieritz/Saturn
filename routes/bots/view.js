const { Router } = require("express");
const router = Router();
const passport = require("../../server/passport");
const { auth } = require("../../util/middleware/auth");
const User = require("../../util/models/user")
const Bots = require("../../util/models/bot")
const client = require("../../server/bot")
const config = require("../../config.js")
const fetch = require("node-fetch2")
const tagss = config.user.tags;

router.get("/bot/:id", async (req, res) => {
  const bot = await Bots.findOne({clientId: req.params.id})
  if(!bot){
   req.flash("error", "Este bot no existe. [Ver Bot]")
   if(req.user){
   return res.redirect("/user/"+req.user.id);
   } else {
    return res.redirect("/")
   }
   }

  if(req.user){
  if(bot.author.id !== req.user.id){
   if(bot.revisado === "pendiente" || bot.revisado === "denied"){
    req.flash("error", "Este bot no existe o esta en espera de revision.")
   }
  }
}
let botAvatar;
if(bot.clientInfo.avatar){
if(bot.clientInfo.avatar.substring(0,2) === "a_"){
  botAvatar = `https://cdn.discordapp.com/avatars/${bot.clientInfo.id}/${bot.clientInfo.avatar}.gif`
} else {
  botAvatar = `https://cdn.discordapp.com/avatars/${bot.clientInfo.id}/${bot.clientInfo.avatar}.jpeg`
}
}else {
  botAvatar = bot.clientInfo.defaultAvatarURL;
}
let userAvatar;
if(bot.author.avatar){
if(bot.author.avatar.substring(0,2) === "a_"){
  userAvatar = `https://cdn.discordapp.com/avatars/${bot.author.id}/${bot.author.avatar}.gif`
} else {
  userAvatar = `https://cdn.discordapp.com/avatars/${bot.author.id}/${bot.author.avatar}.jpeg`
}
} else {
  botAvatar = bot.author.defaultAvatarURL;
}

res.render("bot/viewbot", {botAvatar,userAvatar, user: req.user, bot, votes: bot.votes || 0});
})

module.exports = router;