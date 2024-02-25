const mongoose = require('mongoose')

const machineSchema = new mongoose.Schema({
    case: {
        type: String,
        trim: true,
        required: [true, 'case required'],
    },
    predictTime: {
        type: Number,

    },
    state: {
        type: Number,
        required: [true, 'patient state danger(1) or stable(0)']
    },
})

const machineModel = mongoose.model('machine', machineSchema)
module.exports = machineModel

