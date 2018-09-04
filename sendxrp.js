#!/usr/bin/env node

const { RippleAPI } = require('ripple-lib');
const assert = require('assert');

const config = require('./config.js');

const accounts = config.accounts();

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();

  // Ripple payments are represented as JavaScript objects
  const payment = {
    source: {
      address: accounts.first.address,
      maxAmount: {
        value: '10.00',
        currency: 'XRP'
      }
    },
    destination: {
      address: accounts.second.address,
      amount: {
        value: '10.00',
        currency: 'XRP'
      }
    }
  };

  // Get ready to submit the payment
  const prepared = await api.preparePayment(accounts.first.address, payment, {
    maxLedgerVersionOffset: 5
  });

  // Sign the payment using the sender's secret
  const { signedTransaction } = api.sign(prepared.txJSON, accounts.first.secret);
  console.log('Signed', signedTransaction)

  // Submit the payment
  const res = await api.submit(signedTransaction);

  console.log('Done', res);
  process.exit(0);
}
