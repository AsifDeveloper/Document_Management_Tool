const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let employeeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  tags: {
    type: String
  },
  document: {
    type: String
  },
  document_path: {
    type: String
  },
}, {
    collection: 'employee'
  })

module.exports = mongoose.model('Employee', employeeSchema)
