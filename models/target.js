const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TargetSchema = new Schema({
  date: {
    type: String,
    index: true,
    match: /\d{4}-[01]\d-[0-3]\d/,
  },
  node: {
    type: String,
    ref: 'Node',
    required: true,
  },
  guessCache: [
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

module.exports = mongoose.model('Target', TargetSchema);
