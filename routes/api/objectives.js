const express = require('express');
const router = express.Router();

// Load objective model
//const objective = require('../../models/objectives');
//const User = require("../../models/User");
const {Module, User, Objective, Goal, Programme} = require("../../models/Models");

// @route GET api/objectives/test
// @description tests objectives route
// @access Public
router.get('/test', (req, res) => res.send('objective route testing!'));

// @route GET api/objectives
// @description Get all objectives
// @access Public
router.get('/', (req, res) => {
    Objective.find()
        .then(objectives => res.json(objectives))
        .catch(err => res.status(404).json({ noobjectivesfound: 'No objectives found' }));
});

// @route GET api/objectives/:id
// @description Get single objective by id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        let objectives = await Objective.find({module_ids: req.params.id});
        if (objectives.length === 0) {
            objectives = await Objective.find({_id: req.params.id});
            if (objectives.length === 0) {
                let string = req.params.id.split(':');
                objectives = await Objective.find({module_ids: string[0], goal_ids: string[1]});
            }
        }
        res.json(objectives);
    } catch (err) {
        try {
            let string = req.params.id.split(':');
            let objectives = await Objective.find({module_ids: string[0], goal_ids: string[1]});
            res.json(objectives);
        } catch (err) {
            res.status(404).json({ noobjectivesfound: 'No objectives found' });
        }
    }
        //.then(objectives => console.log(objectives))
        //.catch(err => res.status(404).json({noobjectivesfound: 'No objectives found'}));
});

// @route GET api/objectives
// @description add/save objective
// @access Public
router.post('/', (req, res) => {
    Objective.create(req.body)
        .then(objective => res.json({ msg: 'objective added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this objective' }));
});

// @route GET api/objectives/:id
// @description Update objective
// @access Public
router.put('/:id', (req, res) => {
    Objective.findByIdAndUpdate(req.params.id, req.body)
        .then(objective => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route GET api/objectives/:id
// @description Delete objective by id
// @access Public
router.delete('/:id', (req, res) => {
    Objective.findByIdAndRemove(req.params.id, req.body)
        .then(objective => res.json({ mgs: 'objective entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such objective' }));
});

module.exports = router;