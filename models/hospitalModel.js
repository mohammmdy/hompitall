const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'hospital name required'],
    },
    address: {
        type: String,
        required: [true, 'hospital address required'],
        trim: true,
    },
    beds: {
        type: Number,
        required: [true, 'hospital beds required'],
    },
    phone: {
        type: String,
        required: [true, 'hospital phone required'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },
    cases: {
        type: String,
        required: [true, 'hospital cases required'],
    },
    currentBeds: Number,
    availabilityTime: Number,
    type: {
        type: String,
        enum: ['Private', 'Governmental'],
        required: [true, 'hospital type required Private or Governmental'],
    },
    latitude: {
        type: Number,
        required: [true, 'latitude is required']
    },
    longitude: {
        type: Number,
        required: [true, 'longitude is required']
    },
}, { timestamps: true });

const hospitalModel = mongoose.model('hospital', hospitalSchema);
module.exports = hospitalModel;
