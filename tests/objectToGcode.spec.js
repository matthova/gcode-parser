/* global describe, it */

const assert = require('chai').assert;
const gcodeToObject = require('../index').gcodeToObject;
const objectToGcode = require('../index').objectToGcode;

describe('GCode Parser', () => {
  it('Should throw an error when you ask to parse something other than a string', () => {
    try {
      objectToGcode(42);
    } catch (ex) {
      assert.equal(ex.message, 'Input argument must be of type "object". 42 is type "number"');
    }
  });

  it('Should parse a "M114" command object', () => {
    const gcodeObject = gcodeToObject('M114');
    const gcode = objectToGcode(gcodeObject);
    assert.equal('M114', gcode);
  });
});
