"use strict";

const should = require('chai').should();
const assistant = require('../lib/assistant');
const os = require("os");
const crytpo = require("crypto");
const path = require("path");

describe("assistant", () => {
  describe("exists", () => {
    it("should returns true when file exists", () => {
      assistant.exists(__filename).should.equal(true);
    });
    it("should returns false when file not exists", () => {
      for (let i = 0; i < 100; i++) {
        assistant.exists(path.join(os.tmpdir(), crytpo.randomBytes(16).toString('hex'))).should.equal(false);
      }
    });
    it("should throws an Error otherwise", () => {
      should.Throw(() => assistant.exists(-1), TypeError);
      should.Throw(() => assistant.exists(null), TypeError);
    });
  });
});