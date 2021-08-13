require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const google = require('./routes/auth/google');
const app = express();
const port = 8001;
const db = require('./psql_db/init');
const GoogleUser = require('./psql_db/auth/google/findOrCreate');

const corsOptions = {
	origin: 'http://localhost:8000'
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/', google);
app.use('/auth/profile', require('./routes/auth/profile'));
app.use('/auth/logout', require('./routes/auth/logout'));


passport.serializeUser(function(user, cb) {
	console.log("user within serialize: ", user);
	cb(null, user);
});

passport.deserializeUser(async function(user, done) {
	let profile; 
	switch (user.provider) {
		// case 'github':
		// 	profile = await GithubUser.findById(user.id)
		// break;
		case 'google':
			profile = await GoogleUser.findById(user.id);
		break;
		// case 'twitter':
		// 	profile = await TwitterUser.findById(user.id);
		// break;
		default:
			profile = null;
		break;
	}
	console.log('deserialized profile: ', profile);
	return done(null, profile);
});

app.get('/', async (req,res) => {
	res.json({msg: 'api route: /'})
});

app.listen(port, () => {
	console.log(`api running on port ${port}`)
});