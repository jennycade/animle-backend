const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
  _id: String,
  parent: String,
  yearsSinceParent: {
    type: Number,
    min: 0,
  },
  lineage: [
    {
      ancestor: String,
      yearsSinceAncestor: Number,
    }
  ],
  isSpecies: Boolean,
  speciesName: String,
  otherNames: {
    type: [String],
  },
});

module.exports = mongoose.model('Node', NodeSchema);