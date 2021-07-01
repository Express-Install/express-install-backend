const Joi = require('joi');
const { objectId } = require('./custom.validation');
// const category = require('../config/category.js');

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
    tags: Joi.array().optional(),
    category: Joi.string(),
  }),
};

const createMultiplePackages = {
  body: Joi.array().items(createPackage.body),
};

const getPackages = {
  query: Joi.object().keys({
    packageName: Joi.string(),
    category: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPackage = {
  params: Joi.object().keys({
    packageId: Joi.string().custom(objectId),
  }),
};

const updatePackage = {
  params: Joi.object().keys({
    packageId: Joi.required().custom(objectId),
  }),
  body: createPackage.body.min(1),
};

const deletePackage = {
  params: Joi.object().keys({
    packageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPackage,
  createMultiplePackages,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
};
