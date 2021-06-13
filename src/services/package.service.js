const httpStatus = require('http-status');
const { Package } = require('../models');
const ApiError = require('../utils/ApiError');

const createPackage = async (pkg) => {
  if (await Package.isPackageExist(pkg.packageName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Package is already exist');
  }
  // eslint-disable-next-line no-return-await
  return await Package.create(pkg);
};

const bulkUpdatePackages = async (packageList) => {
  // eslint-disable-next-line no-return-await
  return await Package.insertMany(packageList);
};

module.exports = {
  createPackage,
  bulkUpdatePackages,
};
