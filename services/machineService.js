const machine = require('../models/machineModel')
const state = require('../models/stateModel')
const asyncHandler = require("express-async-handler");

// create machine field in table(machine)
exports.createMachineState = asyncHandler(async (req, res, next) => {
    const machineField = await machine.create({
        case: 'نسا وتوليد',  // name of case as'نزيف عيون جلطة '
        predictTime: 86,     // the time will take in Emergency as : 20 50 45
        state: 1              // if stable case : 0  if Danger case : 1
    })
    console.log(machineField);
})

