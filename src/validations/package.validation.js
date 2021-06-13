const Joi = require('joi');

const createPackage = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    packageName: Joi.string().required(),
    latestVersion: Joi.string(),
    download: Joi.number(),
    siteUrl: Joi.string().optional().allow(''),
    publishDate: Joi.string(),
    source: Joi.string().optional().allow(''),
    summary: Joi.string().optional().allow(''),
    tags: Joi.string().optional().allow(''),
  }),
};
const createMultiplePackages = {
  body: Joi.array().items(createPackage.body),
};

module.exports = {
  createPackage,
  createMultiplePackages,
};
