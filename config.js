#!/usr/bin/env node

module.exports = 
{
 accounts: function()
 {
  var list = {
   first: {
    address:'rBvHCBR9kpbfZB8uh4S72GpaP8xV424Jbg',
    secret:'shtXnLyZV2AJ4TmPvSwGBp1U6Zgdn'
   },
   second: {
    address:'rEUvEw5afoq5VRd8UL1kYo1DDyXexbvm8z',
    secret:'snjSMiiX75R1ao72XKRhnNqtjufnn'
   },
   third: {
    address:'rLhCfGfaFBZaWDMr9x9QUaGsPnaTbtbC94',
    secret:'ssVhMbghQC73PEoUkid6ujQx15a1C'
   }
  };
  return list;
 },
 connection: function()
 {
  var mysql = require('promise-mysql');

  var connection = mysql.createPool({
     host     : 'localhost',
     user     : 'root',
     password : '*',
     database : 'rippled'
  });

  return connection;
 }
};
