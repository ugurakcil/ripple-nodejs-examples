#!/usr/bin/env node

const { RippleAPI } = require('ripple-lib');

const config = require('./config.js');

const accounts = config.accounts();

const connection = config.connection();

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

api.connect().then(() => {

  api.connection.on('transaction', (event) => {
    var post = JSON.stringify(event);
    console.log(post);
  });


  api.request('subscribe', {
   streams: ['ledger']
  }).then(response => {
   console.dir(response);
  }).catch(error => {
    console.log('############### ERROR ###############\n');
    console.log(error);
  });


   //console.info(transactions);
   //process.exit(0);

});
