const mongoose = require('mongoose');

const dailyplanSchema = mongoose.Schema({
  userId: { type: String, required: true},
  blocks: [{id: String, repeat: String, completed: Boolean}],
  comment: { type: String, required: false},
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  date: { type: String, required: true}
});

module.exports = mongoose.model('Dailyplan', dailyplanSchema);
