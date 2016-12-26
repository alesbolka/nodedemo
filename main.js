'use strict';
const Path = require('path');

/**
 * A very hacky way to obtain the absolute path to a given location, platform independant
 * Always starts from the location of this file, which is supposed to be the root of this file (root folder of the project)
 * @return {string}
 */
global.getPath = function () {
  return Path.join.apply(null, [__dirname].concat(Array.prototype.slice.call(arguments)));
};

require('./server').bootUp(process.argv[2]);

