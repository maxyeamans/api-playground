const Router = require('express').Router();

const userRoutes = require('./user');
const companyRoutes = require('./company');

Router.use('/user', userRoutes);
Router.use('/company', companyRoutes)

module.exports = Router;