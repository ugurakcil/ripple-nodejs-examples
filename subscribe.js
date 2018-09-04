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

    var query = connection.query(
      'INSERT INTO transactions SET ?',
      {data: post},
      function(error, results, fields){
       if(error) throw error;
      }
    );

   console.dir(post);
  });

  var liveAccounts = [];

  function setLiveAccounts(account){
    liveAccounts.push(account);
  }

  function getLiveAccounts(){
    return liveAccounts;
  }

  function setSubscribe(){
   connection.query('SELECT * FROM accounts ORDER BY id DESC')
   .then(results => {
     liveAccounts = [];
     results.forEach(function(row){
      setLiveAccounts(row.public_key);
     });
   })
   .then(results => {
     api.request('subscribe', {
       accounts: getLiveAccounts()
     }).then(response => {
       console.dir(response);
     }).catch(error => {
        console.log('############### ERROR ###############\n');
        console.log(error);
     });
   });
  }

  setSubscribe();
  setInterval(setSubscribe, 5 * 60 * 1000);
});
