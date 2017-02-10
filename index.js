/*
 * Parses a line of GCode and returns an object
 */
module.exports = function gcodeParser(gcode) {
  const gcodeObject = {};

  const commandRegex = /[GM]\d+/;
  const commandResult = gcode.toUpperCase().match(commandRegex);
  gcodeObject.command = commandResult && commandResult[0];


  // Set the gcode to lower case and remove any G<number> or M<number> commands
  const gcodeArgString = gcode.toLowerCase().replace(/[gm]\d+/, '');

  // Parse each axis for a trailing floating number
  //If no float, treat the axis as a boolean flag
  const axes = "abcdefhijklnpqrstuvwxyz".split("");
  axes.forEach(axis => {
    const axisAndFloatRegex = new RegExp(`${axis}\s*([+-]?([0-9]*[.])?[0-9]+)`);
    const result = gcodeArgString.match(axisAndFloatRegex);

    if (result) {
      gcodeObject[axis] = Number(result[1]);
    } else if (gcodeArgString.includes(axis)) {
      gcodeObject[axis] = true;
    }
  });

  return gcodeObject;
};
