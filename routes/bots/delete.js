const { Router } = require("express");
const router = Router();
const passport = require("../../server/passport");
const { auth } = require("../../util/middleware/auth");
const User = require("../../util/models/user")
const Bots = require("../../util/models/bot")
const client = require("../../server/bot")
const config = require("../../config.js")

const { EmbedBuilder } = require("discord.js")
router.post("/bot/:id/delete", auth, async (req, res) => {
    const bot = await Bots.findOne({clientId: req.params.id})
    if(!bot){
     req.flash("error", "Este bot no existe. [Eliminar Bot]")
     return res.redirect("/user/"+req.user.id)
    }
    if(bot.author.id !== req.user.id){
     req.flash("error", "Que intentas hacer.")
    }
    const embed2 = new EmbedBuilder()
    .setAuthor({ name: "Bot Eliminado", iconURL: bot.clientInfo.displayAvatarURL ||client.user.displayAvatarURL() ||null })
    .setDescription(`
    :wastebasket:  El usuario **${req.user.username}#${req.user.discriminator}** \`(${req.user.id})\` ha eliminado el bot **${bot.clientInfo.username}** \`(${bot.clientInfo.id})\` de la pagina 
 `)
 .setThumbnail(bot.clientInfo.displayAvatarURL ||client.user.displayAvatarURL() ||null)
    .setColor("Red") 

    client.channels.cache.get(config.channels.deleted).send({ content: `<@${req.user.id}>`, embeds: [embed2]})
    await Bots.findOneAndDelete({clientId: req.params.id})
    req.flash("success", "Bot eliminado con exito")
    res.redirect("/user/"+req.user.id)
 })
module.exports = router;