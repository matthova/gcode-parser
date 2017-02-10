const assert = require('chai').assert;
const parse = require('./index');

describe('GCode Parser', function(){
  it('Should parse "M114"', function() {
    const result = parse('M114');

    expected = {
      command: 'M114'
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse "G90" with a new line at the end', function() {
    const result = parse('G90\n');

    expected = {
      command: 'G90'
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse "G90" without a new line at the end', function() {
    const result = parse('G90');

    expected = {
      command: 'G90'
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse G28XY, G28 X Y, G28X Y, and G28  XY identically', function() {
    const result1 = parse('G28XY');
    const result2 = parse('G28 X Y');
    const result3 = parse('G28X Y');
    const result4 = parse('G28  XY');

    expected = {
      command: 'G28',
      x: true,
      y: true,
    };

    assert.deepEqual(result1, expected);
    assert.deepEqual(result2, expected);
    assert.deepEqual(result3, expected);
    assert.deepEqual(result4, expected);
  });

  it('should parse the following GCode commands correctly', function(){

    const commands = [
      "G90",
      "M82",
      "M106 S0",
      "M104 S200 T0",
      "M109 S200 T0",
      "G28",
      "G28 X",
      "G28 XY",
      "G28 X Y",
      "G1 X900 F10000",
      "G92 E0",
      "G1 E-1.6000 F1800",
      "G1 Z0.350 F2000",
      "T0",
      "G1 X895.390 Y345.390 F10000",
      "G1 E0.0000 F540",
      "G92 E0",
      "G1 X904.610 Y345.390 E0.3946 F2000",
      "G1 X904.610 Y354.610 E0.7891",
      "G1 X895.390 Y354.610 E1.1837",
      "G1 X895.390 Y345.390 E1.5782",
      "G92 E0",
      "G1 E-1.6000 F1800",
      "M106 S255",
      "G1 X895.390 Y345.390 F10000",
      "G1 Z0.700 F2000",
      "G1 E0.0000 F1800",
      "G92 E0",
      "G1 X904.610 Y345.390 E0.3946 F2000",
      "G1 X904.610 Y354.610 E0.7891",
      "G1 X895.390 Y354.610 E1.1837",
      "G1 X895.390 Y345.390 E1.5782",
      "G92 E0",
      "G1 E-1.6000 F1800"
    ];

    commands.forEach(command => {
      console.log(parse(command));
    });
  });
});
