const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, OAuth } = require('../../models');

const config = {
  clientID:563377459908-vdlu3khs2spdopuprrmlvkjbpo91mb8j.apps.googleusercontent.com,
  clientSecret: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,
  callbackURL: "/auth/google/callback"
};

async function findOrCreateUser({ name, email }) {
  const user = await User.findOne({
    email,
  });

  if (user) { 
    return user;
  }

  const created = await User.create({
    name,
    email,
    password: 'GOOGLE_OAUTH',
  });

  return created;
}

module.exports = new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
  const { email, name } = profile._json;

  try {
    const user = await findOrCreateUser({ email, name })
    done(null, {
      shortId: user.shortId,
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    done(e, null);
  }
});