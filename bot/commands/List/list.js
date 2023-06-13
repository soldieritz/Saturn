const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require("discord.js");
const Bots = require("../../../util/models/bot")
const config = require("../../../config")
module.exports = {
    name: "list",
    description: "Ver lista de bots sin aceptar o revisar",
    type: 1,
    options: [],
    permissions: ["SendMessages"],
    run: async (client, interaction) => {
     
const backId = 'back'
const forwardId = 'forward'
const backButton = new ButtonBuilder({
  style: 2,
  label: 'Volver',
  emoji: '⬅️',
  customId: backId
})
const forwardButton = new ButtonBuilder({
  style: 2,
  label: 'Siguiente',
  emoji: '➡️',
  customId: forwardId
})

// Put the following code wherever you want to send the embed pages:

const bots = await Bots.find({ revisado: "pendiente"})
const guilds = [...bots]

const generateEmbed = async start => {
  const current = guilds.slice(start, start + 10)
const embed = new EmbedBuilder()
.setColor("Orange")
.setThumbnail(client.user.displayAvatarURL() ||client.user.defaultAvatarURL())
.addFields(await Promise.all(
    current.map(async guild => ({
      name: guild.clientInfo.username,
      value: `**ID:** ${guild.clientInfo.id}\n**Owner:** ${guild.author.username}#${guild.author.discriminator} \`(${guild.author.id})\` \n**Invitacion:** [Invitar](https://discord.com/api/oauth2/authorize?client_id=${guild.clientInfo.id}&permissions=51530719690689&scope=bot%20applications.commands)\n**Link:** ${config.url}/bot/${guild.clientInfo.id}`
    }))
  ))
  // You can of course customise this embed however you want
  return embed;
}


const canFitOnOnePage = guilds.length <= 10
const embedMessage = await interaction.reply({
  embeds: [await generateEmbed(0)],
  components: canFitOnOnePage
    ? []
    : [new ActionRowBuilder({components: [forwardButton]})]
})

if (canFitOnOnePage) return


const collector = embedMessage.createMessageComponentCollector({
  filter: ({user}) => user.id === interaction.user.id,
  componentType: ComponentType.Button
})

let currentIndex = 0
collector.on('collect', async i => {
  // Increase/decrease index
  i.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
  // Respond to interaction by updating message with new embed
  await i.update({
    embeds: [await generateEmbed(currentIndex)],
    components: [
      new ActionRowBuilder({
        components: [
          // back button if it isn't the start
          ...(currentIndex ? [backButton] : []),
          // forward button if it isn't the end
          ...(currentIndex + 10 < guilds.length ? [forwardButton] : [])
        ]
      })
    ]
  })
})
    }
};