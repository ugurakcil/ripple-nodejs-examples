#!/usr/bin/env node

const { RippleAPI } = require('ripple-lib');

const config = require('./config.js');

const accounts = config.accounts();

const connection = config.connection();

//var address_from = "rpKRPNZ5Y4hRoCc82LW9AKjnYJ4n9hBFSk";
//var address_to = "rnQeGYdupYey9KwTuZ7Moae87f6TBxNXaB";

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

api.connect().then(() => {
  const serverInfo = api.getServerInfo();

  const serverInfoData = serverInfo.then((data) => {
   const ledgers = data.completeLedgers.split('-');

   const ledgerVersionRange = {
     minLedgerVersion : Number(ledgers[0]),
     maxLedgerVersion : Number(ledgers[1])
   };

   return ledgerVersionRange;
  });

  const transactionList = serverInfoData.then((ledgerVersionRange) => {
   return transactions = api.getTransactions(accounts.first.address, ledgerVersionRange);
  });

  transactionList.then((transactions) => {
   console.info(transactions);
   process.exit(0);
  });

});
