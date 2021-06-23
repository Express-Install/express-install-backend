const httpStatus = require('http-status');
const { Package } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a package
 * @param {Object} pkg
 * @returns {Promise<Package>}
 */
const createPackage = async (pkg) => {
  if (await Package.isPackageExist(pkg.packageName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Package is already exist');
  }
  // eslint-disable-next-line no-return-await
  return await Package.create(pkg);
};

/**
 * Create multiple packages
 * @param {Object[]} packageList
 * @returns {Promise<Package>}
 */
const bulkCreatePackages = async (packageList) => {
  // eslint-disable-next-line no-return-await
  return await Package.insertMany(packageList);
};

/**
 * Query for packages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPackages = async (filter, options) => {
  // eslint-disable-next-line no-return-await
  return await Package.paginate(filter, options);
};

/**
 * Get package by id
 * @param {ObjectId} id
 * @returns {Promise<Package>}
 */
const getPackageById = async (id) => {
  return Package.findById(id);
};

/**
 * Get package by package name
 * @param {string} packageName
 * @returns {Promise<Package>}
 */
const getPackageByPackageName = async (packageName) => {
  return Package.findOne({ packageName });
};

module.exports = {
  createPackage,
  bulkCreatePackages,
  queryPackages,
  getPackageById,
  getPackageByPackageName,
};
