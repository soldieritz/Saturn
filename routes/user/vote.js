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
const { EmbedBuilder } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
router.post("/bot/:id/vote", auth, async (req, res) => {
  const bot = await Bots.findOne({clientId: req.params.id})
  if(!bot){
   req.flash("error", "Este bot no existe. [Votar Bot]")
   return res.redirect("/user/"+req.user.id);
   }
   var isin = false;
   var user_date;
 bot?.voters.map((v) => {
  if(v.user === req.user.id){
    isin = true;
    user_date = v.date;
  }
 })
 let oldvotes = bot.votes || 0;
 let newvotes = oldvotes + 1;
 if(isin === false) {
    await Bots.findOneAndUpdate({clientId: req.params.id}, {votes: newvotes })
 console.log("a")
 if(bot?.voters){
  await Bots.findOneAndUpdate({clientId: req.params.id}, { $push: { 
    voters: {
    user: req.user.id,
    date: Date.now()
    }
  } })
 } else {
  await Bots.findOneAndUpdate({clientId: req.params.id}, { voters: [{ 
    user: req.user.id,
    date: Date.now()
  }] })
 }
} else {
   let user = await User.findOne({ userId: req.user.id })
   const time = moment.duration(43200000 - (Date.now() - user_date)).format(" D [Dia(s)], H [Hora(s)], m [Minuto(s)], s [Segundo(s)]");

  if (user && (Date.now() - user_date) < 43200000){
    req.flash("error", "Espera " + time + " para volver a votar")
    return res.redirect("/bot/"+req.params.id)
  } else {
    await Bots.findOneAndUpdate({clientId: req.params.id}, {votes: newvotes})
    req.flash("success", "Has votado por este bot. Ahora tiene ("+newvotes+") votos")
    return res.redirect("/bot/"+req.params.id)
  } 
}
const embed2 = new EmbedBuilder()
.setAuthor({ name: "Votado!", iconURL: bot.displayAvatarURL ||client.user.displayAvatarURL() ||null })
.setDescription(`
:star: El usuario **${req.user.username}#${req.user.discriminator}** \`(${req.user.id})\` ha votado por el bot **${bot.clientInfo.username}**, ahora tiene \`${newvotes}\` votos!
 [Votar por este bot](${config.url}/bot/${bot.clientInfo.id})
`)
.setThumbnail(bot.clientInfo.displayAvatarURL ||client.user.displayAvatarURL() ||null)
.setColor("Yellow") 

client.channels.cache.get(config.channels.deleted).send({ content: `<@${req.user.id}>`, embeds: [embed2]})

req.flash("success", "Has votado por este bot. Ahora tiene ("+newvotes+") votos")
return res.redirect("/bot/"+req.params.id)
});

router.get("/tag/:tag", async (req, res) => {
  let t = req.params.tag.toLowerCase()
  const bots = await Bots.find({ tags: t, revisado: "accepted"})
  res.render("search_tag", {user: req.user, bots, tag: req.params.tag});
});


module.exports = router;