const mongoose = require('mongoose');
//var autoIncrement = require('mongoose-auto-increment');

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    programme_id: {
        type: String,
        required: true
    },
    module_id: {
        type: String,
        required: true
    },
    module_leader: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    published_date: {
        type: Date
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password_id: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});

const ObjectiveSchema = new mongoose.Schema({
    obj_id: {
        type: String,
        required: true
    },
    obj_name: {
        type: String,
        required: true
    },
    module_ids: {
        type: String,
        required: true
    },
    goal_id: {
        type: String,
        required: true
    }
});


const GoalSchema = new mongoose.Schema({
    goal_id: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    goal_name: {
        type: String,
        required: true
    },
    programme_id: {
        type: String,
        required: true
    }
});

const ProgrammeSchema = new mongoose.Schema({
    programme_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    programme_leader: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    published_date: {
        type: Date
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});


//UserSchema.plugin(passportLocalMongoose);

const Module = mongoose.model('module', ModuleSchema);
const User = mongoose.model('user', UserSchema); //UserSchema.plugin(passportLocalMongoose));
const Objective = mongoose.model('objective', ObjectiveSchema);
const Goal = mongoose.model('goal', GoalSchema);
const Programme = mongoose.model('programme', ProgrammeSchema);

module.exports = {
    Module, User, Objective, Goal, Programme
}