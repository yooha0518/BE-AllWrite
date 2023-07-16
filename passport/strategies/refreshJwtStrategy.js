const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const env = require('../../.env');
const { User } = require('../../models/index.js');

const jwtOptions = {
	secretOrKey: process.env.REFRESHSECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const refreshJwtStrategy = new JwtStrategy(
	jwtOptions,
	async (payload, done) => {
		try {
			const user = await User.findOne(
				{ email: payload.email },
				{ refreshToken: 1, email: 1 }
			);

			return done(null, user);
		} catch {
			return done(err, false);
		}
	}
);

module.exports = refreshJwtStrategy;
