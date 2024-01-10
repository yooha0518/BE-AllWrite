const JwtStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../../models/index.js');

const jwtOptions = {
	secretOrKey: process.env.ACCESSSECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const accessJwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findOne({ email: payload.email });

		return done(null, user);
	} catch {
		return done(err, false);
	}
});

module.exports = accessJwtStrategy;
