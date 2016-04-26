/**
 * Codewars API
 */

'use strict';

var request = require('request');

var baseURL = "https://www.codewars.com/api/v1";

function getAPI(api) {
  return function (arg, callback) {
    request.get(`${baseURL}/${api}/${arg}`).on('response', callback);
  }
}

var getUser = getAPI('users');

exports.getUser = getUser;


