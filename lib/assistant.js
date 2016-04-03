'use strict';

let {accessSync, F_OK} = require('fs');

/**
 * Alternative to deprecated fs.existsSync
 * @param {string} path
 * @returns {boolean}
 */
function exists(path) {
  try {
    accessSync(path, F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

exports.exists = exists;
