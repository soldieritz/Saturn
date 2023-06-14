const passport = require('passport')
const { Strategy } = require('passport-discord')
const DiscordOauth2 = require("discord-oauth2");
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const oauth = new DiscordOauth2();
const config = require("../config");
let clientId = config.client.id;
let clientSecret = config.client.secret;
let callbackURL = config.url + "/login";
let scope = config.client.scope;

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

passport.use(new Strategy({
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: callbackURL,
  scope: ["identify", "guilds.join"],
}, (accesstoken, refreshtoken, profile, cb) => {
  oauth.addMember({
	accessToken: accesstoken,
	botToken: process.env.token,
	guildId: config.guild,
	userId: profile.id,

	deaf: true,
}).then(console.log)
  process.nextTick(() => {
    return cb(null, profile)
  })
}))
);

module.exports = passport;
