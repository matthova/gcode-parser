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
  let keys = ['X', 'Y', 'Z', 'E', 'F', 'S', 'T'];
  let precisions = {'X':3, 'Y':3, 'Z':3, 'E':5, 'F':0, 'S':0, 'T':0};

  for (const key of keys) {
    if (gcodeObject.args.hasOwnProperty(key.toLowerCase())){
      const value = gcodeObject.args[key.toLowerCase()];
      // Don't add a space unless there's a command before it
      if (gcode.length > 0) {
        gcode += ' ';
      }
      gcode += key;
      if (typeof value !== 'boolean') {
        gcode += value.toFixed(precisions[key]);
      }
    }
  }

  if (gcodeObject.comment) {
    gcode += ';';
    gcode += gcodeObject.comment;
  }

  return gcode;
}

module.exports = objectToGcode;
