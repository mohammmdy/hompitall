const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Machine = require("../models/machineModel");
const State = require("../models/stateModel");
const Hospital = require("../models/hospitalModel");

exports.predictTimeCalculator = asyncHandler(async (req, res, next) => {
    //check user still in hospital 
    const states = await State.find({ exist: 'yes' })
    for (const state of states) {

        // match cases
        const machineTable = await Machine.find({ case: state.case, state: state.state })
        const machineTablePredictTime = machineTable[0].predictTime
        // calculate predict time (real)
        const now = new Date(); // current date/time
        const createdAt = new Date(state.createdAt); // future date
        const passTime = Math.floor(((now - createdAt) / (1000 * 60)));
        let realPredictTime = machineTablePredictTime - passTime
        if (realPredictTime < 0) {
            realPredictTime = 0
            // save predict time in state 
            state.predictTime = realPredictTime
            // //save state
            await state.save()
        }
        else {
            // save predict time in state 
            state.predictTime = realPredictTime
            // //save state
            await state.save()
        }

    }
    next()
})


exports.minimumPredictTime = asyncHandler(async (req, res, next) => {
    const hospitals = await Hospital.find()
    for (const hospital of hospitals) {
        //calculate current beds in hospital table
        const stateCountDoc = await State.find({ hospitalId: hospital._id, exist: 'yes' }).countDocuments()
        const state = await State.find({ hospitalId: hospital._id, exist: 'yes' })
        const currentBed = hospital.beds - stateCountDoc
        hospital.currentBeds = currentBed

        // minimum predict time from state to hospital
        if (hospital.currentBeds == 0) {
            let predicts = []
            for (let i = 0; i < state.length; i++) {
                const predictOfSates = state[i].predictTime
                predicts.push(predictOfSates)
            }
            const minimum = Math.min(...predicts)


            hospital.availabilityTime = minimum

        }
        else {
            hospital.availabilityTime = undefined
        }
        //save minmum predict in hospital table
        hospital.save()
    }
    next()
})

