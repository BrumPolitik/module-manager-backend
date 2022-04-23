var express = require('express');
var router = express.Router();
const CryptoJS = require('crypto-js')
const basicAuth = require('@blossomfinance/express-basic-auth')
// Load User model
//var User = require('../../models/Users');
const {Module, User, Objective, Goal, Programme} = require("../../models/Models");
const Console = require("console");

// @route GET api/user/test
// @description tests user route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));

// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET api/users/:id
// @description Get single user by id
// @access Public
router.get('/:id', async (req, res) => {
    //User.findById(req.params.id)
    //  .then(user => res.json(user))
    //  .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
    let userVar;
    try {
        userVar = await User.find({user_id: req.params.id});
        if (userVar.length === 0) {
            userVar = await User.find({_id: req.params.id});
        }
    } catch (err) {
        return res.send(err);
    }
    //userVar = await User.collection.findOne(
    //    {
    //        "$or": [
     //           {user_id: req.params.id},
    //            {_id: req.params.id}
    //        ]
    //    }
    //);
    if (req.headers.authorization) {
        let auth = new Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');
        let username = auth[0];
        let password = auth[1]
        userVar[0].password_id = CryptoJS.AES.decrypt(userVar[0].password_id, "password").toString(CryptoJS.enc.Utf8);
        if (userVar[0].user_id != username || userVar[0].password_id != password) {
            console.log("here");
            return res.status(400).json({ unauthorised: 'unauthorised' });

        }
    }
    return res.send(userVar);
});

// @route GET api/users
// @description add/save user
// @access Public
router.post('/', (req, res) => {
  req.body.password_id = CryptoJS.AES.encrypt(req.body.password_id, "password");
  req.body.user_type = 'user'
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route GET api/users/:id
// @description Update user
// @access Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/users/:id
// @description Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such user' }));
});

function myAuthoriser(username, password) {
    console.log("here")
    var output = false;
    User.collection.findOne(
        {user_id: username},
          function (err, user) {
            const decryptPass = CryptoJS.AES.decrypt(user.password_id, "password");
            console.log(user.user_id);
            console.log(password);
            console.log(decryptPass.toString(CryptoJS.enc.Utf8));
            const userMatches = basicAuth.safeCompare(username, user.user_id);
            const passwordMatches = basicAuth.safeCompare(password, decryptPass.toString(CryptoJS.enc.Utf8));
            console.log(userMatches);
            console.log(passwordMatches);
            console.log(userMatches & passwordMatches);
            if ((userMatches & passwordMatches) == 1) {
                output = true;
            }
            console.log(output);
            //return output;
            return true;
        }
    );
    //return output;
}
//router.use(basicAuth({ authorizer: myAuthoriser }))

module.exports = router;