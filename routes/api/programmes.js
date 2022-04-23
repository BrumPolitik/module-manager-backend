const express = require('express');
const router = express.Router();

// Load programme model
//const programme = require('../../models/programmes');
//const User = require("../../models/User");
const {programme, User, Objective, Goal, Programme} = require("../../models/Models");
const CryptoJS = require("crypto-js");

// @route GET api/programmes/test
// @description tests programmes route
// @access Public
router.get('/test', (req, res) => res.send('programme route testing!'));

// @route GET api/programmes
// @description Get all programmes
// @access Public
router.get('/', (req, res) => {
    Programme.find()
        .then(programmes => res.json(programmes))
        .catch(err => res.status(404).json({ noprogrammesfound: 'No programmes found' }));
});

// @route GET api/programmes/:id
// @description Get single programme by id
// @access Public
router.get('/:id', async (req, res) => {
    //programme.findById(req.params.id)
    //  .then(programme => res.json(programme))
    //  .catch(err => res.status(404).json({ noprogrammefound: 'No programme found' }));
    try {
        let programmes = await Programme.find({programme_id: req.params.id});
        if (programmes.length === 0) {
            programmes = await Programme.find({programme_leader: req.params.id});
            if (programmes.length === 0) {
                programmes = await Programme.find({_id: req.params.id});
            }
        }
        res.json(programmes);
    } catch (err) {
        res.status(404).json({noprogrammesfound: 'No programmes found'});
    }
});

// @route GET api/programmes
// @description add/save programme
// @access Public
router.post('/', (req, res) => {
    Programme.create(req.body)
        .then(programme => res.json({ msg: 'programme added successfully' }))
        .catch(err => console.log(err));//res.status(400).json({ error: 'Unable to add this programme' }));
});

// @route GET api/programmes/:id
// @description Update programme
// @access Public
router.put('/:id', (req, res) => {
    Programme.findByIdAndUpdate(req.params.id, req.body)
        .then(programme => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route GET api/programmes/:id
// @description Delete programme by id
// @access Public
router.delete('/:id', (req, res) => {
    Programme.findByIdAndRemove(req.params.id, req.body)
        .then(programme => res.json({ mgs: 'programme entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such programme' }));
});

module.exports = router;