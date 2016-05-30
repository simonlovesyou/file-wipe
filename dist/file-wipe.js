'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _arrayShuffle = require('array-shuffle');

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var fs = _bluebird2['default'].promisifyAll(require('fs'));

var passes = {
  /* 1  random */ /* 32  random */
  /* 2  random */ /* 33  random */
  /* 3  random */ /* 34  random */
  /* 4  random */ /* 35  random */

  DETERMINSTIC: ['\x55', /* 5  RLL MFM */
  '\xaa', /* 6  RLL MFM */
  '\x92\x49\x24', /* 7  RLL MFM */
  '\x49\x24\x92', /* 8  RLL MFM */
  '\x24\x92\x49', /* 9  RLL MFM */
  '\x00', /* 10 RLL     */
  '\x11', /* 11 RLL     */
  '\x22', /* 12 RLL     */
  '\x33', /* 13 RLL     */
  '\x44', /* 14 RLL     */
  '\x55', /* 15 RLL     */
  '\x66', /* 16 RLL     */
  '\x77', /* 17 RLL     */
  '\x88', /* 18 RLL     */
  '\x99', /* 19 RLL     */
  '\xaa', /* 20 RLL     */
  '\xbb', /* 21 RLL     */
  '\xcc', /* 22 RLL     */
  '\xdd', /* 23 RLL     */
  '\xee', /* 24 RLL     */
  '\xff', /* 25 RLL     */
  '\x92\x49\x24', /* 26 RLL MFM */
  '\x49\x24\x92', /* 27 RLL MFM */
  '\x24\x92\x49', /* 28 RLL MFM */
  '\x6d\xb6\xdb', /* 29 RLL     */
  '\xb6\xdb\x6d', /* 30 RLL     */
  '\xdb\x6d\xb6' /* 31 RLL     */
  ]
};

var wipe = function wipe(files, options, callback) {

  //Handle if the options parameter is omitted.
  if (callback === undefined && (typeof options === 'function' || options === undefined)) {
    callback = options;
    options = {};
  }

  if (typeof options !== 'object') {
    throw new Error('Parameter "options" needs to be an object. Got ' + typeof options);
  }

  if (files === undefined || files === null) {
    throw new Error('Parameter "files" needs to specified. Got ' + typeof files);
  }
  if (typeof files !== 'string' && !(files instanceof Array)) {
    throw new Error('Parameter "files" needs to be a string or array. Got ' + typeof files);
  }
  if (typeof callback !== 'function' && callback !== undefined) {
    throw new Error('Parameter "callback" needs to be a function, null or undefined. Got ' + typeof callback);
  }

  var tap = options.tap || function () {};
  var unlink = options.unlink === undefined ? true : options.unlink;

  return _getFileMatches(files).each(function (file) {
    return _wipeFile(file, tap, unlink);
  }).then(function (files) {
    if (callback) {
      return callback(null, files);
    }
    return files;
  })['catch'](function (err) {
    if (callback) {
      return callback(err, null);
    }
    throw err;
  });
};

var _getFileMatches = function _getFileMatches(files) {

  return new _bluebird2['default'](function (resolve, reject) {
    if (files instanceof Array) {
      return resolve(files);
    }
    return (0, _glob2['default'])(files, function (err, matches) {
      if (err) {
        return reject(err);
      }
      return resolve(matches);
    });
  });
};

var _wipeFile = function _wipeFile(file, tap, unlink) {
  return fs.statAsync(file).then(function (stats) {

    var noBytes = stats.size,
        randomPasses = [],
        allPasses = [],
        shuffledPasses = (0, _arrayShuffle2['default'])(passes.DETERMINSTIC);

    for (var i = 0; i < 7; i++) {
      randomPasses.push((0, _secureRandom2['default'])(noBytes, { type: 'Buffer' }));
    }

    allPasses = [].concat(_toConsumableArray(randomPasses.slice(0, 3)), _toConsumableArray(shuffledPasses), _toConsumableArray(randomPasses.slice(4, 7)));

    return new _bluebird2['default'](function (resolve) {
      resolve(allPasses);
    }).each(function (pass) {
      return _applyPass(file, noBytes, pass);
    }).then(function () {
      if (unlink) {
        fs.unlinkAsync(file);
      }
      return file;
    }).then(function (file) {
      return tap(file);
    })['catch'](function (err) {
      throw err;
    });
  });
};

var _applyPass = function _applyPass(file, noBytes, pass) {

  var ws = _bluebird2['default'].promisifyAll(fs.createWriteStream(file, { flags: 'w' }));

  var buf = Buffer.isBuffer(pass) ? pass : new Buffer(noBytes, { type: 'hex' }).fill(pass);

  return ws.writeAsync(buf).then(function () {
    return fs.writeFileAsync(file, '');
  })['catch'](function (err) {
    throw err;
  });
};

module.exports = wipe;
