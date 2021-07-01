const express = require('express');
const { validate } = require('../../middlewares/validate');
const scriptValidation = require('../../validations/script.validation');
const scriptController = require('../../controllers/script.controller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(scriptValidation.generateChocoScript),
    scriptController.generateChocoScript,
  );

module.exports = router;
