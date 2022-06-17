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
});

module.exports = mongoose.model('Node', NodeSchema);