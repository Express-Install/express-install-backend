const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const packageRoute = require('./package.route');
const scriptRoute = require('./script.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const { packageService } = require('../../services');
const pick = require('../../utils/pick');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/packages',
    route: packageRoute,
  },
  {
    path: '/script',
    route: scriptRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/search',
    route: router.get('/:query', async (req, res) => {
      const keyword = req.params.query;
      const options = pick(req.query, ['sortBy', 'limit', 'page']);
      const result = await packageService.findPackage(keyword, options);
      res.json(result);
    }),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
