const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy =  require('passport-google-oauth').OAuth2Strategy;
const GoogleUser = require('../../psql_db/auth/google/findOrCreate');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8001/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    /**
      info stored with psql types
      {
        id numeric 
        name text
        avatar array of text (for now, just get a url)
        provider text 
      } 
     */  
    let user = null;
    if (profile.provider !== 'google') {
      return done(null, null);
    }
    user = await GoogleUser.findOrCreate({
      id: profile._json.sub,
      name: profile._json.name,
      avatar_url: profile._json.picture,
      provider: profile.provider
    });
    return done(null, user); 
  } 
));

router.get('/google', (req, res, next) => {
  // do some middleware 
  next();
}, passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login ']
}));

router.get('/google/callback',
  passport.authenticate('google',
  {failureRedirect: 'http://localhost:8000/login'}),
  function(req, res) {
    const token = jwt.sign({
      id: req.user.id,
      provider: req.user.provider 
    }, process.env.KEY_PRIVATE, {expiresIn: 60*60*24*14});
    res.status(201).cookie(
      'authorization', token, 
      {sameSite: 'Strict'}, 
      {expires: new Date(Date.now() + 43200000)} 
    )
    .redirect('http://localhost:8000/app/business-info');
});

module.exports = router;