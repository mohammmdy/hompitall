const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    patientId: {
        type: String,
        trim: true,
        required: [true, 'patient Id required'],
    },
    hospitalId: {
        type: String,
        trim: true,
        required: [true, 'hospital Id required'],
    },
    case: {                         //check box cases
        type: String,
        trim: true,
        required: [true, 'case required'],
    },
    predictTime: {
        type: Number,
        trim: true,
    },
    state: {                         //check box Danger /stable
        type: Number,
        enum: [0, 1],
        required: [true, 'patient state required 0 or 1'],
    },
    exist: {                            //check box yes/no
        type: String,
        enum: ['yes', 'no'],
        default:'yes'
    }
}, { timestamps: true });

const stateModel = mongoose.model('state', stateSchema);
module.exports = stateModel;
