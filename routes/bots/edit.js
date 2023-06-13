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

router.get("/bot/:id/edit", auth, async (req, res) => {
    const bot = await Bots.findOne({clientId: req.params.id})
    if(!bot){
        req.flash("error", "Este bot no se encuentra")
        return res.redirect("/user/"+req.user.id)
    }
    if(bot.author.id !== req.user.id){
      req.flash("error", "Que intentas hacer.")
      return res.redirect("/user/"+req.user.id)
    }
    let iss = false;
    if(bot?.revisado === "denied"){
      iss = true
    }

    res.render("bot/editbot", {user: req.user,  isv: iss, tags: tagss,stags: bot.tags, clientId: bot.clientId, clientPrefix: bot.prefix, clientShortDesc: bot.shortDesc, clientDesc: bot.desc,clientGuild: bot.guild_support || "", clientDashboard: bot.dashboard || ""});
  });
  router.post("/bot/:id/edit", auth, async (req, res) => {
    const us = await User.findOne({ userId: req.user.id})
    let {clientId, clientPrefix, clientShortDesc, clientDesc,  clientTags, clientGuild, clientDashboard} = req.body;
    const bot = await Bots.findOne({clientId: req.params.id})
    if(!bot){
        req.flash("error", "Este bot no se encuentra. [Editar Bot]")
        return res.redirect("/user/"+req.user.id)
    }
    const botUser = await client.users.fetch(req.params.id).catch(error => null)
    const addbot_errors = []
    if(!botUser){addbot_errors.push("Ingresa la id de un bot")}
    if(!clientPrefix){addbot_errors.push("Ingresa un prefix")}
    if(!clientShortDesc){addbot_errors.push("Ingresa la descripcion corta")}
    if(!clientDesc){addbot_errors.push("Ingresa la descripcion")} 
    if(clientTags === " " || !clientTags || clientTags === null){addbot_errors.push("Ingresa al menos 1 tag")}

    await fetch(`https://discordapp.com/api/invite/${clientGuild}`)
    .then((res) => res.json())
    .then((json) => {
     if (json.message === 'Unknown Invite') {
       addbot_errors.push("Invitacion de servidor invalida")
     } else {
      console.log("Si")
     }
    }).catch((err) => null);
  
    if(addbot_errors.length > 0){
    res.render("bot/editbot", {user: req.user, tags: tagss,stags: clientTags, clientId, clientPrefix,clientGuild, clientShortDesc, clientDashboard, clientDesc, addbot_errors})
    } else {
    const bot = await Bots.findOneAndUpdate({clientId: req.params.id}, {clientInfo: botUser.toJSON(), shortDesc: clientShortDesc, desc: clientDesc, prefix: clientPrefix, author: req.user, guild_support: clientGuild, dashboard: clientDashboard, tags: clientTags, addedStamp: new Date()})
    const embed2 = new EmbedBuilder()
    .setAuthor({ name: "Bot Editado", iconURL: bot.displayAvatarURL ||client.user.displayAvatarURL() ||null })
    .setDescription(`
    :pencil2: El usuario **${req.user.username}#${req.user.discriminator}** \`(${req.user.id})\` ha editado el bot **${botUser.toJSON().username}** \`(${botUser.toJSON().id})\`
     [Ver el bot](${config.url}/bot/${botUser.toJSON().id})
    `)
 .setThumbnail(bot.clientInfo.displayAvatarURL ||client.user.displayAvatarURL() ||null)
    .setColor("Blue") 

    client.channels.cache.get(config.channels.deleted).send({ content: `<@${req.user.id}>`, embeds: [embed2]})

    req.flash("success", "El bot se edito correctamente")
    res.redirect("/user/"+req.user.id)
    }
  })
  

module.exports = router;