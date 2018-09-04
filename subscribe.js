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

   console.log('QUERY:'+query.sql);

   //console.log(JSON.stringify(event, null, 2));
  });


  api.request('subscribe', {
    accounts: [accounts.second.address ]
  }).then(response => {

   //var responseTest = { x: 5 };
   /*
   var post = JSON.stringify(response);

    var query = connection.query(
      'INSERT INTO transactions SET ?',
      {data: '['+post+']'},
      function(error, results, fields){
       if(error) throw error;
      }
    );

   console.log('QUERY:'+query.sql);
   */
   console.dir(response);
  }).catch(error => {
    console.log('############### ERROR ###############\n');
    console.log(error);
  });


   //console.info(transactions);
   //process.exit(0);

});
