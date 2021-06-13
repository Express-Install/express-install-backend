const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { packageService } = require('../services');

const createPackage = catchAsync(async (req, res) => {
  const pkg = await packageService.createPackage(req.body);
  res.status(httpStatus.CREATED).send(pkg);
});

const bulkUpdatePackages = catchAsync(async (req, res) => {
  const packageList = await packageService.bulkUpdatePackages(req.body);
  res.status(httpStatus.CREATED).send(packageList);
});

module.exports = {
  createPackage,
  bulkUpdatePackages,
};
