const express = require("express");


const {
  select
} = require("../services/selectService");

const authService = require("../services/authService");

const {
  predictTimeCalculator,
  minimumPredictTime
} = require("../services/backService");

const router = express.Router();

router.use(authService.protect);
router.get('/', predictTimeCalculator, minimumPredictTime, select)

module.exports = router;
