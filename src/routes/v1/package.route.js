const express = require('express');
const auth = require('../../middlewares/auth');
const { validate } = require('../../middlewares/validate');
const packageValidation = require('../../validations/package.validation');
const packageController = require('../../controllers/package.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('managePackages'),
    validate(packageValidation.createPackage),
    packageController.createPackage,
  );

router
  .route('/bulk')
  .post(
    auth('managePackages'),
    validate(packageValidation.createMultiplePackages),
    packageController.bulkCreatePackages,
  );

module.exports = router;
