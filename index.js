/*
 * Parses a line of GCode and returns an object
 * Expects a single line of gcode
 * Returns an object with a command and a list of arguments
 */
module.exports = function gcodeParser(gcode) {
  if (typeof gcode !== 'string') {
    throw new Error(`gcode argument must be of type "string". ${gcode} is type "${typeof gcode}"`);
  }

  const gcodeObject = {
    command: undefined,
    args: {},
  };

  const commandRegex = /[GM]\d+/;
  const commandResult = gcode.toUpperCase().match(commandRegex);
  gcodeObject.command = commandResult && commandResult[0];


  // Set the gcode to lower case and remove any G<number> or M<number> commands
  const gcodeArgString = gcode.toLowerCase().replace(/[gm]\d+/, '');

  // Parse each axis for a trailing floating number
  //If no float, treat the axis as a boolean flag
  const axes = "abcdefghijklmnopqrstuvwxyz".split("");
  axes.forEach(axis => {
    // In most cases we are looking for an axis followed by a number
    const axisAndFloatRegex = new RegExp(`${axis}\\s*([+-]?([0-9]*[.])?[0-9]+)`);
    const result = gcodeArgString.match(axisAndFloatRegex);
    if (result) {
      gcodeObject.args[axis] = Number(result[1]);
    // If there is an axis, but no trailing number, pass the axis as a boolean flag
    } else if (gcodeArgString.includes(axis)) {
      gcodeObject.args[axis] = true;
    }
  });

  return gcodeObject;
};
