const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const category = require('../config/category.js');

const packageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    latestVersion: {
      type: String,
      trim: true,
    },
    download: {
      type: Number,
    },
    siteUrl: {
      type: String,
      trim: true,
    },
    publishDate: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    tags: {
      type: Array,
      trim: true,
    },
    category: {
      type: String,
      enum: category,
      default: 'common',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
packageSchema.plugin(toJSON);
packageSchema.plugin(paginate);

packageSchema.statics.isPackageExist = async function (packageName) {
  const pkg = await this.findOne({ packageName });
  return !!pkg;
};

packageSchema.index({ '$**': 'text' });

/**
 * @typedef Package
 */
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
