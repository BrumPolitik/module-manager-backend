const express = require('express');
const router = express.Router();

// Load goal model
//const goal = require('../../models/goals');
//const User = require("../../models/User");
const {Module, User, Objective, Goal, Programme} = require("../../models/Models");
const CryptoJS = require("crypto-js");

// @route GET api/goals/test
// @description tests goals route
// @access Public
router.get('/test', (req, res) => res.send('goal route testing!'));

// @route GET api/goals
// @description Get all goals
// @access Public
router.get('/', (req, res) => {
    Goal.find()
        .then(goals => res.json(goals))
        .catch(err => res.status(404).json({ nogoalsfound: 'No goals found' }));
});

// @route GET api/goals/:id
// @description Get single goal by id
// @access Public
router.get('/:id', async (req, res) => {
    //goal.findById(req.params.id)
    //  .then(goal => res.json(goal))
    //  .catch(err => res.status(404).json({ nogoalfound: 'No goal found' }));
    try {
        let goals = await Goal.find({goal_id: req.params.id});
        if (goals.length === 0) {
            goals = await Goal.find({programme_id: req.params.id});
            if (goals.length === 0) {
                goals = await Goal.find({_id: req.params.id});
            }
        }
        res.json(goals);
    } catch (err) {
        res.status(404).json({nogoalsfound: 'No goals found'});
    }
});

// @route GET api/goals
// @description add/save goal
// @access Public
router.post('/', (req, res) => {
    Goal.create(req.body)
        .then(goal => res.json({ msg: 'goal added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this goal' }));
});

// @route GET api/goals/:id
// @description Update goal
// @access Public
router.put('/:id', (req, res) => {
    Goal.findByIdAndUpdate(req.params.id, req.body)
        .then(goal => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route GET api/goals/:id
// @description Delete goal by id
// @access Public
router.delete('/:id', (req, res) => {
    Goal.findByIdAndRemove(req.params.id, req.body)
        .then(goal => res.json({ mgs: 'goal entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such goal' }));
});

module.exports = router;