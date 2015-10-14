'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _arrayShuffle = require('array-shuffle');

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

var fs = _bluebird2['default'].promisifyAll(require('fs'));

var passes = {
  /* 1  random */ /* 32  random */
  /* 2  random */ /* 33  random */
  /* 3  random */ /* 34  random */
  /* 4  random */ /* 35  random */

  DETERMINSTIC: ["\x55", /* 5  RLL MFM */
  "\xaa", /* 6  RLL MFM */
  "\x92\x49\x24", /* 7  RLL MFM */
  "\x49\x24\x92", /* 8  RLL MFM */
  "\x24\x92\x49", /* 9  RLL MFM */
  "\x00", /* 10 RLL     */
  "\x11", /* 11 RLL     */
  "\x22", /* 12 RLL     */
  "\x33", /* 13 RLL     */
  "\x44", /* 14 RLL     */
  "\x55", /* 15 RLL     */
  "\x66", /* 16 RLL     */
  "\x77", /* 17 RLL     */
  "\x88", /* 18 RLL     */
  "\x99", /* 19 RLL     */
  "\xaa", /* 20 RLL     */
  "\xbb", /* 21 RLL     */
  "\xcc", /* 22 RLL     */
  "\xdd", /* 23 RLL     */
  "\xee", /* 24 RLL     */
  "\xff", /* 25 RLL     */
  "\x92\x49\x24", /* 26 RLL MFM */
  "\x49\x24\x92", /* 27 RLL MFM */
  "\x24\x92\x49", /* 28 RLL MFM */
  "\x6d\xb6\xdb", /* 29 RLL     */
  "\xb6\xdb\x6d", /* 30 RLL     */
  "\xdb\x6d\xb6" /* 31 RLL     */
  ]
};

var wipe = function wipe(file, cb) {
  return fs.statAsync(file).then(function (stats) {

    var noBytes = stats.size;
    passes.DETERMINSTIC = (0, _arrayShuffle2['default'])(passes.DETERMINSTIC);
    var randomPasses = [];
    for (var i = 0; i < 7; i++) {
      randomPasses.push((0, _secureRandom2['default'])(noBytes, { type: 'Buffer' }));
    }
    iter(0, file, noBytes, randomPasses.slice(0, 3)).then(function () {
      return iter(0, file, noBytes, passes.DETERMINSTIC);
    }).then(function () {
      return iter(0, file, noBytes, randomPasses.slice(4, 7));
    }).then(function () {
      return fs.unlinkAsync(file);
    }).then(function () {
      return new Promise(function (resolve, reject) {
        resolve();
      });
    });
  }).then(function () {
    if (cb && typeof cb === 'function') {
      return cb(null);
    }
    return new Promise(function (resolve, reject) {
      resolve();
    });
  })['catch'](function (err) {
    if (cb && typeof cb === 'function') {
      return cb(err);
    } else return new Promise(function (resolve, reject) {
      reject(err);
    });
  });
};

function iter(i, file, noBytes, passes) {
  var ws = _bluebird2['default'].promisifyAll(fs.createWriteStream(file, { flags: 'w' }));
  var buf = Buffer.isBuffer(passes) ? passes[i] : new Buffer(noBytes, { type: 'hex' }).fill(passes[i]);

  return ws.writeAsync(new Buffer(noBytes, { type: 'hex' }).fill(passes[i])).then(function () {
    return fs.writeFileAsync(file, '');
  }).then(function () {
    if (i < passes.length) {
      return iter(++i, file, noBytes, passes);
    } else {
      return new Promise(function (resolve, reject) {
        return resolve();
      });
    }
  })['catch'](function (err) {
    return err;
  });
}

module.exports = wipe;
//# sourceMappingURL=file-wipe.js.map
