const express = require('express')
const app = express()
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
// pass : j52udxz1QxjOff4X
// user : mohamed
// mongodb+srv://mohamed:j52udxz1QxjOff4X@cluster0.dlj5gqs.mongodb.net/
const db = 'mongodb+srv://mohamed:j52udxz1QxjOff4X@cluster0.dlj5gqs.mongodb.net/hompital?retryWrites=true&w=majority'
mongoose.connect(db).then((conn) => {
    console.log(`db connected ! ${conn.connection.host}`);
})

app.use(express.json()); //parsing json
const state = require('./models/stateModel')

const createStateForReceptionist = asyncHandler(async (req, res, next) => {
    let stateRate
    if (req.body.state == 'Danger') stateRate = 1
    if (req.body.state == 'stable') stateRate = 0
    const stateField = await state.create({
        patientId: req.body.patientId,
        hospitalId: req.body.hospitalId,
        case: req.body.case,
        state: stateRate,
    })
    if (stateField) return res.status(200).json({ data: stateField })
    else throw new Error('cant create');
})



const updateStateForReceptionist = asyncHandler(async (req, res, next) => {
    const stateField = await state.findOneAndUpdate(
        { patientId: req.body.patientId,hospitalId:req.body.hospitalId },
        { exist: req.body.exist },
        { new: true }
    )
    if (stateField) return res.status(200).json({ data: stateField })
    else throw new Error('cant update');

})



router = express.Router()

app.use('/web', router.post('/createState', createStateForReceptionist))
app.use('/web', router.put('/updateState', updateStateForReceptionist))

app.use(express.json())   // parse to json
app.listen(9000, () => {
    console.log(`app running on port 9000`);
})