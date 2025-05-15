const mongoose = require('mongoose');
const SearchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  term: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Search', SearchSchema);
