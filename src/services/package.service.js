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

/**
 * Update package by id
 * @param {ObjectId} packageId
 * @param {Object} updateBody
 * @returns {Promise<Package>}
 */
const updatePackageById = async (packageId, updateBody) => {
  const pkg = await getPackageById(packageId);
  if (!pkg) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  if (
    updateBody.packageName &&
    (await pkg.isEmailTaken(updateBody.packageName, packageId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(pkg, updateBody);
  await pkg.save();
  return pkg;
};

/**
 * Delete package by id
 * @param {ObjectId} packageId
 * @returns {Promise<Package>}
 */
const deletePackageById = async (packageId) => {
  const pkg = await getPackageById(packageId);
  if (!pkg) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await pkg.remove();
  return pkg;
};

module.exports = {
  createPackage,
  bulkCreatePackages,
  queryPackages,
  getPackageById,
  getPackageByPackageName,
  updatePackageById,
  deletePackageById,
};
