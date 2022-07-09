const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);