const passport = require("passport");
const { Strategy } = require("passport-discord");
const config = require("../config");
let clientID = config.client.id;
let clientSecret = config.client.secret;
let callbackURL = config.url + "/login";
let scope = config.client.scope;
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL: callbackURL,
      scope,
    },
    (a, r, profile, cb) => {
      process.nextTick(() => {
        return cb(null, profile);
      });
    }
  )
);

module.exports = passport;
