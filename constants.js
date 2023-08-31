const plans = {
  bronze: {
    duration: 6, // Months
    investmentAmount: 1000,
    roi: 0.2,
    features: 'Bi-weekly trade updates, basic performance reports.',
    // dividendsPercentage: 0.03,
    dividendsPercentage: 0.6,
  },
  silver: {
    duration: 12, // Months
    investmentAmount: 5000,
    roi: 0.4,
    features:
      'Weekly trade updates, detailed performance reports, priority customer support.',
    dividendsPercentage: 1.29,
  },
  gold: {
    duration: 24, // Months
    investmentAmount: 10000,
    roi: 0.6,
    features:
      'Daily trade updates, comprehensive performance reports, personalized strategy consultation, 24/7 customer support.',
    dividendsPercentage: 1.9,
  },
};
// console.log(exports.plans);
// console.log(exports.plans['silver']);

module.exports = plans;
