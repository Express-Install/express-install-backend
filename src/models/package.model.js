const mongoose = require('mongoose');

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
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

packageSchema.statics.isPackageExist = async function (packageName) {
  const pkg = await this.findOne({ packageName });
  return !!pkg;
};

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
