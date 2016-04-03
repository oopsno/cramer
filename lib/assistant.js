'use strict';

let {accessSync} = require('fs');

/**
 * Alternative to deprecated fs.existsSync
 * @param {string} path
 * @returns {boolean}
 */
function exists(path) {
  try {
    accessSync(path, fs.F_OK | fs.R_OK | fs.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

exports.exists = exists;
