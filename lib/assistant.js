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
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
}

exports.exists = exists;
