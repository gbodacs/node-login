const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
{
  name: { type: String, required: true},
  movielink: { type: String, required: true},
  unit: { type: String, required: true},
  comment: { type: String, required: true},
  date: { type: String, required: true}
});

module.exports = mongoose.model('Exercise', exerciseSchema);
