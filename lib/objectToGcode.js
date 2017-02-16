/*
 * Parses a JSON object and returns a line of GCode
 * Expects a JSON object with each key value pair representing an axis and its corresponding value
 * Returns a Gcode string, without a line break
 */
function objectToGcode(gcodeObject) {
  // Validate input to be of type "object"
  if (typeof gcodeObject !== 'object') {
    throw new Error(`Input argument must be of type "object". ${gcodeObject} is type "${typeof gcodeObject}"`);
  }

  // Create the gcode string.
  // Start with the command
  // Followed by each axis
  // Then any extrusion amount
  // Then the feedrate
  let gcode = '';
  if (gcodeObject.command) {
    gcode += gcodeObject.command;
  }

  for (const key of Object.keys(gcodeObject.args)) {
    const value = gcodeObject[key];
    gcode += ' ';
    gcode += key.toUpperCase();
    gcode += value;
  }

  if (gcodeObject.comment) {
    gcode += ';';
    gcode += gcodeObject.comment;
  }

  return gcode;
}

module.exports = objectToGcode;
