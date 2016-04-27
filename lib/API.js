/**
 * Codewars API
 */

'use strict';

import loadConfig from './config'
const request = require('request');

const baseURL = "https://www.codewars.com/api/v1";

function auth(options) {
  if (options.headers === undefined) {
    options.headers = {};
  }
  let config = loadConfig();
  options.headers.Authorization = config.token;
  return options;
}

function requestJSONCallback(callback) {
  return function (err, res, body) {
    if (err) {
      return callback(err, body);
    } else {
      try {
        return callback(null, JSON.parse(body));
      } catch (jsonErr) {
        return callback(jsonErr, body);
      }
    }
  }
}

function makeGET(api) {
  return function (arg, callback) {
    let options = {
      method: 'GET',
      url: `${baseURL}/${api}/${arg}`
    };
    request(auth(options), requestJSONCallback(callback));
  }
}

const getUser = makeGET('users');
const getChallenge = makeGET('code-challenges');
const deferredResponse = makeGET('deferred');

export {getUser, getChallenge, deferredResponse}


