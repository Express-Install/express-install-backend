const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { packageService } = require('../services');

const createPackage = catchAsync(async (req, res) => {
  const pkg = await packageService.createPackage(req.body);
  res.status(httpStatus.CREATED).send(pkg);
});

const bulkCreatePackages = catchAsync(async (req, res) => {
  const packageList = await packageService.bulkCreatePackages(req.body);
  res.status(httpStatus.CREATED).send(packageList);
});

module.exports = {
  createPackage,
  bulkCreatePackages,
};
