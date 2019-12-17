const mongoose = require('mongoose');

const blockSchema = mongoose.Schema(
{
  name: { type: String, required: true},
  repeat: { type: String, required: true},
  exerciseList: { type: [], required: true},
  date: { type: String, required: true}
});

module.exports = mongoose.model('Block', blockSchema);
