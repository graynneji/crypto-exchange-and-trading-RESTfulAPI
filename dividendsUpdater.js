const Trade = require('./models/tradeModel');
// const cron = require('node-cron');

async function updateDividends() {
  const tradesToUpdate = await Trade.find({ status: 'active' });

  for (const trade of tradesToUpdate) {
    // const dividendsToAdd = (trade.amount * trade.dividendsPercentage) / 100;
    const dividendsToAdd = (
      (trade.amount * trade.dividendsPercentage) /
      100 /
      1440
    ).toFixed(3);

    console.log(dividendsToAdd);

    await Trade.updateOne(
      { _id: trade._id },
      { $inc: { dividendAmount: dividendsToAdd } }
    );
  }
}
module.exports = {
  updateDividends,
};
