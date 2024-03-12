const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../../models/index.js');
const env = require('../../.env');

const jwtOptions = {
	secretOrKey: env.ACCESSSECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const accessJwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
	console.log("전략 함수가 호출되었습니다.");
	try {
		console.log("test2")
		const user = await User.findOne({ email: payload.email });
		console.log(`Auth user: ${user}`)

		if (!user) {
			return done(null, false, { message: '유저를 찾을 수 없습니다.' });
        }

		return done(null, user);
	} catch (err) {
        console.log(`auth error: ${err}`);
        return done(err, false);
    }
});

module.exports = accessJwtStrategy;
