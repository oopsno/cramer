/**
 * config.js - Configuration manager
 *
 * Manage Codewars associated configurations in a single JSON file.
 */

'use strict';

const {join} = require('path');
const {exists} = require('./assistant');
const {ensureDirSync} = require('fs-extra');
const readline = require('readline');
const {homedir} = require('os');
const {openSync, readFileSync, writeFileSync} = require('fs');
const inquirer = require("inquirer");

const defaultRoot = join(homedir(), '.cramer');
const defaultConfigPath = join(defaultRoot, 'cramer.json');

/**
 * Config Cramer interactively
 * @param {string} path
 */
function createConfig(path) {
  let ui = new inquirer.ui.BottomBar();
  const questions = [
    {
      type: 'input',
      name: 'token',
      message: "What's your API ACCESS TOKEN?",
      validate: (token) => {
        if (token.length > 0) {
          let config = {token};
          let json = JSON.stringify(config, null, '  ');
          ui.log.write(`Is this cool?\n${json}`);
          ui.updateBottomBar('');
          return true;
        } else {
          ui.log.write("Cannot be empty.");
          ui.updateBottomBar('');
          return false;
        }
      }
    },
    {
      name: 'confirmed',
      type: "confirm",
      message: "Is this cool?"
    }
  ];
  inquirer.prompt(questions, function (answers) {
    if (answers.confirmed) {
      let {token} = answers;
      ensureDirSync(defaultRoot);
      writeFileSync(openSync(path, 'w'), JSON.stringify({token}), null, '  ');
      ui.log.write(`Configuration successfully wrote to ${path}.`);
    } else {
      ui.log.write("Configure terminated.");
    }
  });
}

/**
 * Returns default path of cramer.json, e.g. ~/.cramer/cramer.json in UNIX-like
 * systems.
 * @returns {string}
 */
function getDefaultConfigPath() {
  if (!exists(defaultConfigPath)) {
    createConfig(defaultConfigPath);
  }
  return defaultConfigPath;
}

/**
 * Load Cramer's configuration
 * @param {string} path - use defaultConfigPath() if not given
 */
function loadConfig(path = getDefaultConfigPath()) {
  let config = readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(config);
}

export {loadConfig, createConfig, getDefaultConfigPath};
export default loadConfig;
