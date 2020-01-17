const Router = require('express').Router();
const User = require('../../models/User');
const Company = require('../../models/Company');

// matches with /api/user
Router.route('/')
  .get( (req, res, next) => {
    User
      // If there are query params, this will incorporate those into the search.
      .find(req.query)
      .then( users => res.json(users) );
  })
  .post( (req, res, next) => {
    User
      .create( req.body )
      .then( newUser => {
        // If a company was specified, push user ID to the company's employees
        if (req.body.company) {
           Company
            .findOneAndUpdate( { name: req.body.company }, { $push: { employees: newUser._id}}, { new: true})
            .then( result => console.log(result));
        }
        res.json(newUser);
      })
      .catch( err => {
        res.status(422).json(err);
      });
  });

// matches with /api/user/:id
Router.route('/:id')
  .get( (req, res, next) => {
    User
      .find({_id: req.params.id})
      .then( foundUser => res.json(foundUser) )
      .catch( err => res.status(422).json(err));
  })
  .patch( (req, res, next) => {
    User
      .findByIdAndUpdate(req.params.id, req.body)
      .then( foundUser => {
        // If the user switched companies, pull the user from the old company and push them to the new one.
        if (req.body.company && foundUser.company !== req.body.company) {
          Company
            .findOneAndUpdate( { name: foundUser.company }, { $pull: { employees: foundUser._id} }).exec();
          Company
            .findOneAndUpdate( { name: req.body.company }, { $push: { employees: foundUser._id } }).exec();
        }
        // Warning: this returns the *old* user info, not the updated info.
        res.json(foundUser);
      })
      .catch( err => res.status(422).json(err));
  })
  .delete();

module.exports = Router;