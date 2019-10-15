const mongoose = require('mongoose');

const dailyplanSchema = mongoose.Schema({
  userId: { type: String, required: true},
  blocks: [{id: String, repeat: String, completed: Boolean}],
  comment: { type: String, required: true},
  startDate: { type: String, required: true},
  endDate: { type: String, required: true},
  date: { type: String, required: true}
});

module.exports = mongoose.model('Dailyplan', dailyplanSchema);
