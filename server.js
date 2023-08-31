const mongoose = require('mongoose');
const { updateDividends } = require('./dividendsUpdater');
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const app = require('./app');
const axios = require('axios');
const https = require('https');

dotenv.config({ path: './config.env' });
// Increase the maximum number of listeners for the EventEmitter
// require('events').EventEmitter.defaultMaxListeners = 20; // Adjust the number as needed

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
     
    origin: '*', // Adjust this to your frontend's domain for production
    // origin: 'http://127.0.0.1:3000', // Adjust this to your frontend's domain for production
  },
});

const port = process.env.PORT || 9001;

///ANOTHER ONE

// fetch and emit market data
// const emitMarketData = async () => {
//   const socketAPI = new WebSocket(process.env.API_URL);
//   try {
//     const response = await axios.get(
//       `https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd`
//     );
//     const marketData = response.data.data;
//     const formattedData = marketData.map((asset) => {
//       return {
//         id: asset.id,
//         slug: asset.slug,
//         symbol: asset.symbol,
//         price_usd: asset.metrics.market_data.price_usd,
//         logo_url: asset.metrics.market_data.logo, // Assuming the logo URL is available in the metrics field
//       };
//     });
//     io.emit('crypto', formattedData);
//     io.emit('crypto', marketData);
//   } catch (err) {
//     console.error('Error fetching data', err.message);
//   }
// };
// io.on('connection', (socket) => {
//   console.log('client connected');

//   socket.on('disconnect', () => {
//     console.log('client disconnected');
//   });
// });

// const options = {
//   hostname: 'data.messari.io',
//   port: 443,
//   path: '/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
//   method: 'GET',
// };
// setInterval(() => {
//   https
//     .request(options, (res) => {
//       let str = '';
//       res.on('data', (chunk) => (str += chunk));
//       res.on('end', () => {
//         io.emit('crypto', str);
//       });
//     })
//     .end();
// }, 10000);

/// ANOTHER ONE

// const ws = new WebSocket(process.env.API_URL);

const tradingPairs = [
  { symbol: 'btcusdt', name: 'Bitcoin' },
  { symbol: 'ethusdt', name: 'Ethereum' },
  { symbol: 'xrpusdt', name: 'XRP' },
  { symbol: 'ltcusdt', name: 'Litecoin' },
  { symbol: 'bchusdt', name: 'Bitcoin Cash' },
  { symbol: 'adausdt', name: 'Cardano' },
  { symbol: 'shibusdt', name: 'Shiba Inu' },
  { symbol: 'dotusdt', name: 'Polkadot' },
  { symbol: 'dogeusdt', name: 'Dogecoin' },
  { symbol: 'linkusdt', name: 'Chainlink' },
  { symbol: 'solusdt', name: 'Solana' },
  { symbol: 'uniusdt', name: 'Uniswap' },
  { symbol: 'maticusdt', name: 'Polygon' },
  { symbol: 'vetusdt', name: 'VeChain' },
  { symbol: 'etcusdt', name: 'Ethereum Classic' },
  { symbol: 'atomusdt', name: 'Cosmos' },
  { symbol: 'xlmusdt', name: 'Stellar' },
  { symbol: 'filusdt', name: 'Filecoin' },
  { symbol: 'avalusdt', name: 'Avalanche' },
  { symbol: 'xtzusdt', name: 'Tezos' },
  { symbol: 'bnbusdt', name: 'Binance Coin' },
  { symbol: 'ftmusdt', name: 'Fantom' },
  { symbol: 'icpusdt', name: 'Internet Computer' },
  { symbol: 'enjusdt', name: 'Enjin' },
  { symbol: 'snxusdt', name: 'Synthetix' },

  { symbol: 'compusdt', name: 'Compound' },
  { symbol: 'aaveusdt', name: 'Aave' },
  { symbol: 'yfiusdt', name: 'yearn.finance' },
  { symbol: 'sushiusdt', name: 'SushiSwap' },
  { symbol: 'mkrusdt', name: 'Maker' },
  { symbol: 'crousdt', name: 'Crypto.com Coin' },

  { symbol: 'oceanusdt', name: 'Ocean Protocol' },
  { symbol: 'storjusdt', name: 'Storj' },
  { symbol: 'sandusdt', name: 'The Sandbox' },
  { symbol: 'chzusdt', name: 'Chiliz' },
];

// const dataObject = [];
// // Create WebSocket connections for each trading pair
// const websockets = tradingPairs.map((pair) => {
//   try {
//     console.log(pair);
//     const ws = new WebSocket(
//       `wss://stream.binance.com:9443/ws/${pair.symbol}@trade`
//     );

//     ws.on('message', (data) => {
//       const tradeUpdate = JSON.parse(data);
//       const symbol = tradeUpdate.s.toLowerCase();
//       const price = parseFloat(tradeUpdate.p);

//       // Extract the name of the currency (without "usdt")
//       const currency = symbol.replace('usdt', '');

//       const currencyInfo = {
//         name: pair.name,
//         symbol: currency,
//         price: price,
//       };

//       dataObject[symbol] = currencyInfo;

//       const dataArray = Object.values(dataObject);

//       io.emit('crypto', dataArray);
//     });

//     // return ws;
//   } catch (err) {
//     console.log(err.message);
//   }
// });
// Handle application exit
process.on('SIGINT', () => {
  websockets.forEach((ws) => ws.close());
  process.exit();
});

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

cron.schedule('*/60 * * * * *', updateDividends);
// cron.schedule('*/10 * * * * *', emitMarketData);

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
