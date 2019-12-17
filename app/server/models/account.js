const mongoose = require('mongoose');

const accountSchema = mongoose.Schema(
{
  name: { type: String, required: true},
  email: { type: String, required: true},
  user: { type: String, required: true},
  pass: { type: String, required: true},
  country: { type: String, required: true},
  date: { type: String, required: true},
  cookie: { type: String, required: false},
  ip: { type: String, required: false},
  isAdmin: { type: Boolean, required: true}
});

module.exports = mongoose.model('Account', accountSchema);
