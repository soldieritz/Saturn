const { Client } = require("discord.js");
const client = new Client({ intents: 3276799});
const colors = require("colors")
const {token} = require('../config').client;

const { EmbedBuilder, PermissionsBitField, Message, Collection } = require("discord.js");
const config = require("../config.js");

client.on("ready", () => {
  console.log("El bot esta prendido.".green);
});

client.slash_commands = new Collection();
module.exports = client;

["slash_commands"].forEach((file) => {
  require(`../bot/handlers/${file}`)(client, config);
});


client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return;

    try {
      if(!interaction.member.permissions.has(PermissionsBitField.resolve(command.permissions) || [])) return interaction.reply({content: "No tienes los permisos suficientes.", ephemeral: true})
      command.run(client, interaction);
    } catch (e) {
      console.error(e)
    };
  };
});



client.login(token);

module.exports = client;