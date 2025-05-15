const router = require('express').Router();
const passport = require('passport');

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000'));

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000'));

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000'));

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.send({ success: true });
  });
});

// Current user
router.get('/user', (req, res) => {
  res.send(req.user || null);
});

module.exports = router;
