const Router = require('express').Router();
const User = require('../../models/User');

// matches with /api/user
Router.route('/')
  .get( (req, res, next) => {
    // const {name} = req.query;
    // console.log(name);
    // res.send(req.query);
    User
      .find()
      .then( users => res.json(users) );
  })
  .post( (req, res, next) => {
    const { firstName, age } = req.body;
    User
      .create({ firstName, age })
      .then( newUser => {
        res.json(newUser)
      })
      .catch( err => {
        res.status(422).json(err)
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
  .patch()
  .delete();

module.exports = Router;