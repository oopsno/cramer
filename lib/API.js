/**
 * Codewars API
 */

'use strict';

const request = require('request');

const baseURL = "https://www.codewars.com/api/v1";

function makeGET(api) {
  return function (arg, callback) {
    let url = `${baseURL}/${api}/${arg}`;
    request(url, (err, res, body) => {
      if (err) {
        return callback(err, body);
      } else {
        try {
          return callback(null, JSON.parse(body));
        } catch (jsonErr) {
          return callback(jsonErr, body);
        }
      }
    });
  }
}

const getUser = makeGET('users');
const getChallenge = makeGET('code-challenges');

export {getUser, getChallenge}


