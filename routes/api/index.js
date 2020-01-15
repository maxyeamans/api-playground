const Router = require('express').Router();

const userRoutes = require('./user');

Router.use('/user', userRoutes);

module.exports = Router;