const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService } = require('../services');

const createPackage = catchAsync(async (req, res) => {
  const pkg = await packageService.createPackage(req.body);
  res.status(httpStatus.CREATED).send(pkg);
});

const bulkCreatePackages = catchAsync(async (req, res) => {
  const packageList = await packageService.bulkCreatePackages(req.body);
  res
    .status(httpStatus.CREATED)
    .send(`Created ${packageList.length} packages.`);
});

const getPackages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['packageName', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await packageService.queryPackages(filter, options);
  res.send(result);
});

const findPackages = catchAsync(async (req, res) => {
  const keyword = req.params.key;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await packageService.findPackage(keyword, options);
  res.send(result);
});

const getPackage = catchAsync(async (req, res) => {
  const pkg = await packageService.getPackageById(req.params.packageId);
  if (!pkg) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  res.send(pkg);
});

const updatePackage = catchAsync(async (req, res) => {
  const pkg = await packageService.updatePackageById(
    req.params.packageId,
    req.body,
  );
  res.send(pkg);
});

const deletePackage = catchAsync(async (req, res) => {
  await packageService.deletePackageById(req.params.packageId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPackage,
  bulkCreatePackages,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
  findPackages,
};
