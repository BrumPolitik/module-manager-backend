const express = require('express');
const router = express.Router();

// Load Module model
//const Module = require('../../models/Modules');
//const User = require("../../models/User");
const {Module, User, Objective, Goal, Programme} = require("../../models/Models");
const CryptoJS = require("crypto-js");

// @route GET api/modules/test
// @description tests modules route
// @access Public
router.get('/test', (req, res) => res.send('module route testing!'));

// @route GET api/modules
// @description Get all modules
// @access Public
router.get('/', (req, res) => {
  Module.find()
    .then(modules => res.json(modules))
    .catch(err => res.status(404).json({ nomodulesfound: 'No Modules found' }));
});

// @route GET api/modules/:id
// @description Get single module by id
// @access Public
router.get('/:id', async (req, res) => {
    //Module.findById(req.params.id)
    //  .then(module => res.json(module))
    //  .catch(err => res.status(404).json({ nomodulefound: 'No Module found' }));
    try {
        let modules = await Module.find({module_id: req.params.id});
        if (modules.length === 0) {
            modules = await Module.find({programme_id: req.params.id});
            if (modules.length === 0) {
                modules = await Module.find({module_leader: req.params.id});
                if (modules.length === 0) {
                    modules = await Module.find({_id: req.params.id})
                }
            }
        }
        res.json(modules);
    } catch (err) {
        console.log(err);
        res.status(404).json({nomodulesfound: 'No modules found'});
    }
});

// @route GET api/modules
// @description add/save module
// @access Public
router.post('/', (req, res) => {
  Module.create(req.body)
    .then(module => res.json({ msg: 'Module added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this module' }));
});

// @route GET api/modules/:id
// @description Update module
// @access Public
router.put('/:id', (req, res) => {
  Module.findByIdAndUpdate(req.params.id, req.body)
    .then(module => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/modules/:id
// @description Delete module by id
// @access Public
router.delete('/:id', (req, res) => {
  Module.findByIdAndRemove(req.params.id, req.body)
    .then(module => res.json({ mgs: 'Module entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such module' }));
});

module.exports = router;