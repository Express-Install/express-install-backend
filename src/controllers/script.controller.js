const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { scriptService } = require('../services');

const generateChocoScript = catchAsync(async (req, res) => {
  const scriptPath = await scriptService.generateChocoScript(req.body);
  res.status(httpStatus.CREATED).send(scriptPath);
});

module.exports = {
  generateChocoScript,
};
