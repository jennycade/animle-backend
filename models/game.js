const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: 'Target',
    required: true,
  },
  won: {
    type: Boolean,
    required: true,
  },
  guesses: [
    {
      node: {
        type: String,
        ref: 'Node',
        required: true,
      },
      yearsSinceLastCommonAncestor: {
        type: Number,
        min: 0,
      },
    },
  ],
});

module.exports = mongoose.model('Game', GameSchema);
