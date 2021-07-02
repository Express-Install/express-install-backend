const Joi = require('joi');

const generateChocoScript = {
  body: Joi.object().keys({
    packages: Joi.array().required(),
    dirName: Joi.string().required().allow('').trim(),
    fileName: Joi.string().required().trim(),
  }),
};

module.exports = {
  generateChocoScript,
};
