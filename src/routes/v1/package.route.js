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
  )
  .get(
    // auth('getPackages'),
    validate(packageValidation.getPackages),
    packageController.getPackages,
  );

router
  .route('/bulk')
  .post(
    auth('managePackages'),
    validate(packageValidation.createMultiplePackages),
    packageController.bulkCreatePackages,
  );

router.route('/find/:key').get(packageController.findPackages);

router
  .route('/:packageId')
  .get(
    // auth('getPackages'),
    validate(packageValidation.getPackage),
    packageController.getPackage,
  )
  .patch(
    auth('managePackages'),
    validate(packageValidation.updatePackage),
    packageController.updatePackage,
  )
  .delete(
    auth('managePackages'),
    validate(packageValidation.deletePackage),
    packageController.deletePackage,
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Packages
 *   description: Package management
 */
