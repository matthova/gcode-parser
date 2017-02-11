const assert = require('chai').assert;
const parse = require('./index');

describe('GCode Parser', () => {
  it('Should throw an error when you ask to parse something other than a string', () => {
    try {
      const result = parse(42);
    } catch(ex) {
      assert.equal(ex.message, 'gcode argument must be of type "string". 42 is type "number"');
    }
  })

  it('Should parse "M114"', () => {
    const result = parse('M114');

    expected = {
      command: 'M114',
      args: {},
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse "G90" with a new line at the end', () => {
    const result = parse('G90\n');

    expected = {
      command: 'G90',
      args: {},
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse "G90" without a new line at the end', () => {
    const result = parse('G90');

    expected = {
      command: 'G90',
      args: {},
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse G28XY, G28 X Y, G28X Y, and G28  XY identically', () => {
    const result1 = parse('G28XY');
    const result2 = parse('G28 X Y');
    const result3 = parse('G28X Y');
    const result4 = parse('G28  XY');

    expected = {
      command: 'G28',
      args: {
        x: true,
        y: true,
      },
    };

    assert.deepEqual(result1, expected);
    assert.deepEqual(result2, expected);
    assert.deepEqual(result3, expected);
    assert.deepEqual(result4, expected);
  });

  it('Should parse "M106 S0"', () => {
    const result = parse('M106 S0');

    expected = {
      command: 'M106',
      args: {
        s: 0,
      },
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse "M104 S0 T0"', () => {
    const result = parse('M104 S0 T0');

    expected = {
      command: 'M104',
      args: {
        s: 0,
        t: 0
      },
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse "M104 S0"', () => {
    const result = parse('M104 S0');

    expected = {
      command: 'M104',
      args: {
        s: 0,
      },
    };

    assert.deepEqual(result, expected);
  });

  it('Should parse identically all versions of "G1 X1"', () => {
    const g1X1Array = [
      'G1X1',
      'G1 X1',
      'G1X 1',
      'G1 X 1',
      'G1X+1',
      'G1 X+1',
      'G1X +1',
      'G1 X +1'
    ];

    expected = {
      command: 'G1',
      args: {
        x: 1,
      },
    };

    g1X1Array.forEach(g1Command => {
      const g1Result = parse(g1Command);
      assert.deepEqual(g1Result, expected);
    });
  });

  it('Should parse identically all versions of "G1 X-1"', () => {
    const g1X1Array = [
      'G1X-1',
      'G1 X-1',
      'G1X -1',
      'G1 X -1'
    ];

    expected = {
      command: 'G1',
      args: {
        x: -1,
      },
    };

    g1X1Array.forEach(g1Command => {
      const g1Result = parse(g1Command);
      assert.deepEqual(g1Result, expected);
    });
  });

  it('Should parse identically all versions of "G1 X-0.1"', () => {
    const g1X1Array = [
      'G1X-0.1',
      'G1 X-0.1',
      'G1X -0.1',
      'G1 X -0.1',
      'G1X-.1',
      'G1 X-.1',
      'G1X -.1',
      'G1 X -.1'
    ];

    expected = {
      command: 'G1',
      args: {
        x: -0.1,
      },
    };

    g1X1Array.forEach(g1Command => {
      const g1Result = parse(g1Command);
      assert.deepEqual(g1Result, expected);
    });
  });

  it('Should parse identically all versions of "G1 X0.1"', () => {
    const g1X1Array = [
      'G1X0.1',
      'G1 X0.1',
      'G1X 0.1',
      'G1 X 0.1',
      'G1X+0.1',
      'G1 X+0.1',
      'G1X +0.1',
      'G1 X +0.1',
      'G1X.1',
      'G1 X.1',
      'G1X .1',
      'G1 X .1',
      'G1X+.1',
      'G1 X+.1',
      'G1X +.1',
      'G1 X +.1'
    ];

    expected = {
      command: 'G1',
      args: {
        x: 0.1,
      },
    };

    g1X1Array.forEach(g1Command => {
      const g1Result = parse(g1Command);
      assert.deepEqual(g1Result, expected);
    });
  });

  // Not sure if this makes the most sense, but for now this is how it works
  it('What do we do if we get "T0"?', () => {
    const result = parse('T0');

    const expected = {
      command: null,
      args: {
        t: 0,
      },
    };

    assert.deepEqual(result, expected);
  });

  it('should be able to process "G1 X1.23 Y 5.0 z-1"', () => {
    const result = parse('G1 X1.23 Y 5.0 z-1');

    const expected = {
      command: 'G1',
      args: {
        x: 1.23,
        y: 5,
        z: -1,
      },
    };

    assert.deepEqual(result, expected);
  });
});
