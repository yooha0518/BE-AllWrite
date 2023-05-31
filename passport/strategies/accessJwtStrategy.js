const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const env = require('../../.env');
const { User } = require('../../models/index.js');

const jwtOptions = {
	secretOrKey: env.ACCESSSECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const accessJwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findOne({ shortId: payload.shortId });

		return done(null, user);
	} catch {
		return done(err, false);
	}
});

module.exports = accessJwtStrategy;
