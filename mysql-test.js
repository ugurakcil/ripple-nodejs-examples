#!/usr/bin/env node

const { RippleAPI } = require('ripple-lib');

const config = require('./config.js');

const accounts = config.accounts();

const connection = config.connection();

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

api.connect().then(() => {
 connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.info('Test\n');
  console.info('The solution is: ', results[0].solution);
  process.exit();
 });
});
