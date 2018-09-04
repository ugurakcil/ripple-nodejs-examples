#!/usr/bin/env node

const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'ws://192.168.10.31:5006' // Private rippled server
});

api.on('error', (errorCode, errorMessage, data) => {
  console.log(errorCode + ': ' + errorMessage);
});

api.on('connected', () => {
  console.log('Connection is open now.');
});

api.connect().then( () => {
  console.info('test');
}).catch(console.error);


/*
const { RippleAPI } = require('ripple-lib');

const api = new RippleAPI({
  server: 'ws://192.168.10.31:6006' // XRP Test Net
});

api.on('connected', () => {
  console.log('connected');
});

api.connect().then(() => {
  console.log('fck');
}).then(() => {
  return api.disconnect();
}).catch(console.error);

*/
