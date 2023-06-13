const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Latencia del bot",
    type: 1,
    options: [],
    permissions: ["SendMessages"],
    run: async (client, interaction) => {
     const embed = new EmbedBuilder()
     .setAuthor({ name: "Pong!! Latencia", iconURL: client.user.displayAvatarURL()})
     .setDescription(`Latencia actual: \`${client.ws.ping}ms\``)
     .setColor("DarkAqua")
       return interaction.reply({ embeds: [embed]})
    }
};