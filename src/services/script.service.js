const chocolatey = require('../lib/chocolatey.generator');
// const ApiError = require('../utils/ApiError');
// const httpStatus = require('http-status');

/**
 * Generate Chocolatey script
 * @param {Object} options - File options
 * @returns {Promise<string>}
 */
const generateChocoScript = async (options) => {
  const fileConfig = {
    packages: options.packages.toString().replaceAll(',', ' '),
    dirName: options.dirName,
    fileName: `[${options.fileName}]Express-Install-script`,
  };
  // eslint-disable-next-line no-return-await
  return await chocolatey.generateScript(fileConfig);
};

module.exports = {
  generateChocoScript,
};
