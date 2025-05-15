const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  provider: String,
  oauthId: String,
  name: String,
  email: String
});
module.exports = mongoose.model('User', UserSchema);
