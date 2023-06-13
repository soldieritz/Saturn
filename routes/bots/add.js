const { Router } = require("express");
const router = Router();
const passport = require("../../server/passport");
const { auth } = require("../../util/middleware/auth");
const User = require("../../util/models/user")
const Bots = require("../../util/models/bot")
const client = require("../../server/bot")
const config = require("../../config.js")
const fetch = require("node-fetch2");
const { EmbedBuilder } = require("discord.js");

const tagss = config.user.tags;

router.get("/addbot", auth, async (req, res) => {
    res.render("bot/addbot", {user: req.user, tags: tagss,stags: [], clientId: "", clientPrefix: "", clientShortDesc: "", clientDesc: "",clientGuild: "", clientDashboard: ""});
  });
  
  router.post("/addbot", auth, async (req, res) => {
    const us = await User.findOne({ userId: req.user.id})
    let {clientId, clientPrefix, clientShortDesc, clientDesc,  clientTags, clientGuild, clientDashboard} = req.body;
    const botUser = await client.users.fetch(clientId).catch(error => null)
    const addbot_errors = []
    if(!clientId){addbot_errors.push("Ingresa la id de tu cliente")}
    if(!botUser){addbot_errors.push("Ingresa la id de un bot")}
    if(botUser){if(!botUser.bot){addbot_errors.push("Este cliente no es un bot")}}
    const uss = await Bots.findOne({clientId: clientId})
    if(uss){addbot_errors.push("Este bot ya esta en la lista")}
    if(!clientPrefix){addbot_errors.push("Ingresa un prefix")}
    if(!clientShortDesc){addbot_errors.push("Ingresa la descripcion corta")}
    if(!clientDesc){addbot_errors.push("Ingresa la descripcion")} 
    if(clientTags === " " || !clientTags || clientTags === null){addbot_errors.push("Ingresa al menos 1 tag")}
    let t = [];
    if(clientTags){
    if(clientTags.length === 1){
      t = [clientTags]
    } else {
      t = clientTags;
    }
  } else {
    t = [];
  }
   
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
    res.render("bot/addbot", {user: req.user, tags: tagss,stags: t, clientId, clientPrefix,clientGuild, clientShortDesc, clientDashboard, clientDesc, addbot_errors})
    } else {
    const bot = await Bots.create({clientId: clientId, revisado: "pendiente", clientInfo: botUser.toJSON(), shortDesc: clientShortDesc, desc: clientDesc, prefix: clientPrefix, author: req.user, guild_support: clientGuild, dashboard: clientDashboard, tags: clientTags, addedStamp: new Date()})

   const embed = new EmbedBuilder()
   .setAuthor({ name: "Nuevo Bot! | Revision", iconURL: botUser.toJSON().displayAvatarURL ||client.user.displayAvatarURL() ||null })
   .setDescription(`El usuario **${req.user.username}#${req.user.discriminator} (${req.user.id})** ha añadido al bot **${botUser.toJSON().username}** (${botUser.toJSON().id}) `)
   .setFooter({ text: "Usa el comando /review para ver la lista de bots en espera de revision (!)" })
   .setColor("Orange")
   client.channels.cache.get(config.channels.staff.newbot).send({ embeds: [embed]})
   const embed2 = new EmbedBuilder()
   .setAuthor({ name: "Nuevo Bot!", iconURL: botUser.toJSON().displayAvatarURL ||client.user.displayAvatarURL() ||null })
   .setDescription(`
:heavy_plus_sign: El usuario **${req.user.username}#${req.user.discriminator}** \`(${req.user.id})\` ha añadido al bot **${botUser.toJSON().username}** \`(${botUser.toJSON().id})\` 

   
> :warning: Nota: Asegurate de que tu bot este online y sin bugs
Porfavor espera pacientemente hasta que un revisor lo revise y acepte
`)
.setThumbnail(botUser.toJSON().displayAvatarURL ||client.user.displayAvatarURL() ||null)
   .setFooter({ text: "Bot en espera de revision...." })
   .setColor("Orange") 
   client.channels.cache.get(config.channels.newbot).send({ content: `<@${req.user.id}>`, embeds: [embed2]})
    req.flash("success", "Tu bot se envio con exito, en espera de revision....")
    res.redirect("/")
    }
  })

module.exports = router;