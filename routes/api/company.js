const Router = require('express').Router();
const Company = require('../../models/Company');

// matches with /api/company
Router.route('/')
  .get( (req, res, next) => {
    Company
      .find( req.query )
      .select('_id name description')
      .then( companies => res.json(companies));
  })
  .post( (req, res, next) => {
    const { name, description } = req.body;
    Company
      .create({ name, description })
      .then( newCompany => res.json(newCompany))
      .catch( err => res.status(422).json(err));
  });

Router.route('/:id')
  .get( (req, res, next) => {
    Company
      .findById(req.params.id)
      .select('_id name description')
      .then( foundCompany => res.json(foundCompany))
      .catch( err => res.status(422).json(err))
  })
  .patch( (req, res, next) => {
    Company
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
      .select('_id name description')
      .then( updatedCompany => res.json(updatedCompany))
      .catch( err => res.status(422).json(err));
  })
  .delete();

Router.route('/:id/employees')
  .get( (req, res, next) => {
    Company
      .findById( req.params.id )
      .populate('employees')
      .then( company => res.json(company) )
      .catch( err => res.status(422).json(err));
  });

module.exports = Router;