const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TargetSchema = new Schema({
  date: {
    type: String,
    index: true,
  },
  node: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
    required: true,
  },
  guessCache: [
    {
      node: {
        type: Schema.Types.ObjectId,
        ref: 'Node',
        required: true,
      },
      yearsSinceLastCommonAncestor: {
        type: Number,
        min: 0,
      }
    }
  ]
});

module.exports = mongoose.model('Target', TargetSchema);