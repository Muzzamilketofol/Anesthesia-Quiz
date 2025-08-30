const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  examDate: {
    type: Date,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  whatsappMessage: {
    type: String,
    required: true,
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;