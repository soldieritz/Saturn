const client = require("../../server/bot");
const { PermissionsBitField, Routes, REST, User } = require('discord.js');
const fs = require("fs");
const colors = require("colors");
const config = require("../../config")
const path = require("path")
module.exports = (client) => {
  console.log("0------------------| Application commands Handler:".blue);

  let commands = [];

  // Slash commands handler:
  fs.readdirSync(path.join(__dirname, '../commands')).forEach((dir) => {
    
    const SlashCommands = fs.readdirSync(path.join(__dirname, '../commands/'+dir)).filter((file) => file.endsWith('.js'));

    for (let file of SlashCommands) {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.name, pull.description, pull.type == 1) {
        client.slash_commands.set(pull.name, pull);
        commands.push({
          name: pull.name,
          description: pull.description,
          type: pull.type || 1,
          options: pull.options ? pull.options : null,
          default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
          default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
        });

      } else {
        console.log(`[HANDLER - SLASH] Couldn't load the file ${file}, missing module name value, description, or type isn't 1.`.red)
        continue;
      };
    };
  });

  // Registering all the application commands:
  if (!config.client.id) {
    console.log("[CRASH] You need to provide your bot ID in config.js!".red + "\n");
    return process.exit();
  };

  const rest = new REST({ version: '10' }).setToken(config.client.token || process.env.TOKEN);

  (async () => {
;

    try {
      await rest.put(
        Routes.applicationCommands(config.client.id),
        { body: commands }
      );

      console.log('[HANDLER] Comandos de barra registrados.'.brightGreen);
    } catch (err) {
      console.log(err);
    }
  })();
};