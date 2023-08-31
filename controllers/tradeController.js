const User = require('../models/userModel');
const plans = require('../constants');
const Trade = require('../models/tradeModel');
const moment = require('moment');

exports.createTrade = async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;
    const { plan, amount } = req.body;
    const reqAmount = plans[plan].investmentAmount;

    // const selectedPlan = req.body.plan;
    if (!plan || !amount) {
      res.status(400);
      throw new Error('Pick a plan and amount');
    }
    const { investmentAmount } = plans[plan];

    if (amount < investmentAmount) {
      res.status(400);
      throw new Error(`Minimun amount is ${reqAmount} and above`);
    }
    if (!plans[plan]) {
      res.status(400);
      throw new Error('No plans available');
    }

    if (plans[plan]) {
      const planDetails = plans[plan];

      const startDate = moment(); // starting moment
      const durationInMonths = planDetails.duration; //duration in months

      // Calculate the end date by adding the duration to the start date
      const endDate = startDate.clone().add(durationInMonths, 'months');

      // Format the end date as "1st Dec 00:59"
      const formattedEndDate = endDate.format('Do MMM YYYY HH:mm');
      const formattedStartDate = startDate.format('Do MMM YYYY HH:MM');
      console.log('Formatted End Date:', formattedEndDate);
      const { roi, dividendsPercentage, features } = planDetails;

      const trade = await Trade.create({
        userId,
        email,
        roi,
        plan,
        dividendsPercentage,
        formattedStartDate,
        formattedEndDate,
        features,
        amount,
        status: 'active',
      });

      res.status(200).json({
        status: 'Success',

        trade,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.getAllTrades = async (req, res) => {
  const trade = await Trade.find();
  res.status(200).json({
    status: 'Sucess',
    trade,
  });
};
