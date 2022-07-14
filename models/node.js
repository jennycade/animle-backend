const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
  },
  yearsSinceParent: {
    type: Number,
    min: 0,
  },
  lineage: [
    {
      ancestor: {
        type: Schema.Type.ObjectId,
        ref: 'Node',
      },
      yearsSinceAncestor: {
        type: Number,
      },
    }
  ],
  isSpecies: Boolean,
  speciesName: String,
  otherNames: {
    type: [String],
  },
});

module.exports = mongoose.model('Node', NodeSchema);