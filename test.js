#!/usr/bin/env node

var config = require('./config.js');

var accounts = config.accounts();

console.info(accounts.first.address);
