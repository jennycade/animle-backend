const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema(
  {
    speciesName: {
      type: String,
      required: true,
      unique: true,
    },
    otherNames: {
      type: [String],
    },
    node: {
      type: Schema.Types.ObjectId,
      ref: 'Node',
      required: true,
    }
  }
);

// TODO:
// consider adding lineage field (nodes) to simplify logic for processing guesses.

module.exports = mongoose.model('Animal', AnimalSchema);