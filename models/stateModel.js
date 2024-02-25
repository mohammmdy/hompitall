const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    hospitalId: {
        type: String,
        trim: true,
        required: [true, 'hospital Id required'],
    },
    case: {
        type: String,
        trim: true,
        required: [true, 'case required'],
    },
    predictTime: {
        type: Number,
        trim: true,
    },
    state: {
        type: Number,
        enum: [0, 1],
        required: [true, 'patient state required 0 or 1'],
    },
    exist: {
        type: String,
        enum: ['yes', 'no'],
        required: [true, 'patient exist required yes or no'],
    }
}, { timestamps: true });

const stateModel = mongoose.model('state', stateSchema);
module.exports = stateModel;
