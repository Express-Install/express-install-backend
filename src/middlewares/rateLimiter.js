const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
});

const packageLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 30,
  skipSuccessfulRequests: false,
});

module.exports = {
  authLimiter,
  packageLimiter,
};
