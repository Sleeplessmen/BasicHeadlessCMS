const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  key: String,
  label: String,
  type: String,
  sortable: Boolean,
  searchable: Boolean
}, { _id: false });

const FieldSchema = new mongoose.Schema({
  key: String,
  label: String,
  type: String,
  required: Boolean,
  options: [String],
  defaultValue: mongoose.Schema.Types.Mixed
}, { _id: false });

const ActionSchema = new mongoose.Schema({
  label: String,
  type: String,
  method: String,
  endpoint: String,
  confirm: Boolean
}, { _id: false });

const PageConfigSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  visibleForRoles: [{ type: String }],

  layout: {
    table: {
      columns: [ColumnSchema]
    },
    form: {
      fields: [FieldSchema]
    }
  },

  api: {
    get: { type: String },
    create: { type: String },
    update: { type: String },
    delete: { type: String }
  },

  actions: [ActionSchema],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PageConfig', PageConfigSchema);
