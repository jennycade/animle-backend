const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TargetSchema = new Schema({
  date: {
    type: Date,
  },
  animal: {
    type: Schema.Type.ObjectId,
    ref: 'Animal',
    required: true,
  },
  lineage: [
    {
      ancestor: {
        type: Schema.Type.ObjectId,
        ref: 'Animal',
        required: true,
      },
      yearsSinceAncestor: {
        type: Number,
        required: true,
        min: 0,
      },
    }
  ],
  guessCache: [
    {
      animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
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