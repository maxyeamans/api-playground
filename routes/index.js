const Router = require('express').Router();

const apiRoutes = require('./api');

Router.use('/api', apiRoutes);

module.exports = Router;