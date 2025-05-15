const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// Helper to find-or-create
async function upsertOAuth(profile, provider, done) {
  const query = { oauthId: profile.id, provider };
  let user = await User.findOne(query);
  if (!user) {
    user = await User.create({
      provider,
      oauthId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value
    });
  }
  return done(null, user);
}

// Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`
}, (accessToken, refreshToken, profile, done) =>
  upsertOAuth(profile, 'google', done)
));

// Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ['id','displayName','emails']
}, (accessToken, refreshToken, profile, done) =>
  upsertOAuth(profile, 'facebook', done)
));

// GitHub
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/github/callback`
}, (accessToken, refreshToken, profile, done) =>
  upsertOAuth(profile, 'github', done)
));
