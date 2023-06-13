const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require("discord.js");
const Bots = require("../../../util/models/bot")
const config = require("../../../config")
module.exports = {
    name: "bot",
    description: "Hacer accion en el bot",
    type: 1,
    options: [{
        name: "id",
        description: "Id del bot",
        type: 3,
        required: true
    }, {
        name: "accion",
        description: "Que quieres hacer con el bot",
        type: 3,
        required: true,
        choices: [{
            name: "Rechazar", value: "denied"
        }, {
            name: "Aceptar", value: "accepted"
        }, {
            name: "Certificar",  value: "certified"
        },  {
            name: "Verificar", value: "verifier"
        }]
    }, {
        name: "razon",
        description: "Razon de la accion",
        type: 3,
        required: false
    }],
    permissions: ["SendMessages"],
    run: async (client, interaction) => {
     const op = interaction.options.getString("accion", true)
     const id = interaction.options.getString("id");

     const bot = await Bots.findOne({clientId: id})
 console.log(bot)
     if(!bot){
        return interaction.reply(":x: Este bot no se encuentra en la botlist.").catch((err) => null)
     }
     const razon = interaction.options.getString("razon")
     if(op === "denied"){
        const embed = new EmbedBuilder()
        .setAuthor({ name: "Logs | Rechazar", iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`:weary:  **${bot.author.username}** Tu bot **${bot.clientInfo.username}** ha sido denegado`)
        .addFields({
            name: "Moderador",
            value: `${interaction.user.tag}`
        })
        .setFooter({ text: "Tu bot ha sido rechazado"})
        .setColor("Red")
        await Bots.findOneAndUpdate({clientId: id }, { revisado: "denied" })
        return client.channels.cache.get(config.channels.denied).send({ content: `<@${bot.author.id}>`, embeds: [embed]})
     } else if (op === "accepted"){
        const embed = new EmbedBuilder()
        .setAuthor({ name: "Logs | Aceptar", iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`:smile: **${bot.author.username}** Tu bot **${bot.clientInfo.username}** ha sido aceptado`)
        .addFields({
            name: "Moderador",
            value: `${interaction.user.tag}`
        })
        .setFooter({ text: "Tu bot ha sido aceptado"})
        .setColor("Orange")
        if(razon){
        embed.addFields({
                name: "Notas",
                value: `${razon}`
            })
        }
        await Bots.findOneAndUpdate({clientId: id }, { revisado: "accepted" })
        return client.channels.cache.get(config.channels.accepted).send({ content: `<@${bot.author.id}>`, embeds: [embed]})
     } else if (op === "certified"){
        const embed = new EmbedBuilder()
        .setAuthor({ name: "Logs | Certificar", iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`:tada: **${bot.author.username}** Tu bot **${bot.clientInfo.username}** ha sido certificado`)
        .addFields({
            name: "Moderador",
            value: `${interaction.user.tag}`
        })
        .setFooter({ text: "Tu bot ha sido certificado"})
        .setColor("Orange")
        if(razon){
        embed.addFields({
                name: "Notas",
                value: `${razon}`
            })
        }
        await Bots.findOneAndUpdate({clientId: id }, { certificado: true })
        return client.channels.cache.get(config.channels.certified).send({ content: `<@${bot.author.id}>`, embeds: [embed]})
     }
    }
};