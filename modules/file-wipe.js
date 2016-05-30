'use strict';
import secureRandom from 'secure-random';
import bluePromise from 'bluebird';
const fs = bluePromise.promisifyAll(require('fs'));
import shuffle from 'array-shuffle';
import glob from 'glob';

const passes = {
                      /* 1  random */ /* 32  random */
                      /* 2  random */ /* 33  random */
                      /* 3  random */ /* 34  random */
                      /* 4  random */ /* 35  random */

  DETERMINSTIC: [
    '\x55',           /* 5  RLL MFM */
    '\xaa',           /* 6  RLL MFM */
    '\x92\x49\x24',   /* 7  RLL MFM */
    '\x49\x24\x92',   /* 8  RLL MFM */
    '\x24\x92\x49',   /* 9  RLL MFM */
    '\x00',           /* 10 RLL     */
    '\x11',           /* 11 RLL     */
    '\x22',           /* 12 RLL     */
    '\x33',           /* 13 RLL     */
    '\x44',           /* 14 RLL     */
    '\x55',           /* 15 RLL     */
    '\x66',           /* 16 RLL     */
    '\x77',           /* 17 RLL     */
    '\x88',           /* 18 RLL     */
    '\x99',           /* 19 RLL     */
    '\xaa',           /* 20 RLL     */
    '\xbb',           /* 21 RLL     */
    '\xcc',           /* 22 RLL     */
    '\xdd',           /* 23 RLL     */
    '\xee',           /* 24 RLL     */
    '\xff',           /* 25 RLL     */
    '\x92\x49\x24',   /* 26 RLL MFM */
    '\x49\x24\x92',   /* 27 RLL MFM */
    '\x24\x92\x49',   /* 28 RLL MFM */
    '\x6d\xb6\xdb',   /* 29 RLL     */
    '\xb6\xdb\x6d',   /* 30 RLL     */
    '\xdb\x6d\xb6'    /* 31 RLL     */
  ]
}


const wipe = (files, options, callback) => {

  //Handle if the options parameter is omitted.
  if(callback === undefined && (typeof options === 'function' || options === undefined)) {
    callback = options;
    options = {};
  }

  if(typeof options !== 'object') {
    throw new Error('Parameter "options" needs to be an object. Got ' + typeof options);
  }

  if(files === undefined || files === null) {
    throw new Error('Parameter "files" needs to specified. Got ' + typeof files);
  }
  if(typeof files !== 'string' && !(files instanceof Array)) {
    throw new Error('Parameter "files" needs to be a string or array. Got ' + typeof files);
  }
  if(typeof callback !== 'function' && callback !== undefined) {
    throw new Error('Parameter "callback" needs to be a function, null or undefined. Got ' + typeof callback);
  }


  return _getFileMatches(files)
  .each(_wipeFile)
  .then(() => {
      if(callback) {
        return callback(null);
      }
      return undefined;
    })
  .catch(err => {
    if(callback) {
      return callback(err);
    }
    throw err;
  });
}

const _getFileMatches = (files) => {

  return new bluePromise((resolve, reject) => {
    if(files instanceof Array) {
      return resolve(files);
    }
    return glob(files, (err, matches) => {
      if(err) {
        return reject(err);
      }
      return resolve(matches);
    })
  });
}


const _wipeFile = (file, tap) => {
  return fs.statAsync(file)
  .then(stats => {

    let noBytes             = stats.size,
        randomPasses        = [],
        allPasses           = [],
        shuffledPasses      = shuffle(passes.DETERMINSTIC);

    for(let i = 0; i < 7; i++) {
      randomPasses.push(secureRandom(noBytes, {type: 'Buffer'}));
    }

    allPasses = [...randomPasses.slice(0, 3), ...shuffledPasses, ...randomPasses.slice(4, 7)]

    return new bluePromise((resolve) => {
      resolve(allPasses)
    })
    .each(pass => _applyPass(file, noBytes, pass))
    .then(() => fs.unlinkAsync(file))
    .catch(err => {throw err;});

  });
}

const _applyPass = (file, noBytes, pass) => {

  let ws = bluePromise.promisifyAll(fs.createWriteStream(file, {flags: 'w'}));

  let buf = Buffer.isBuffer(pass) ? pass : (new Buffer(noBytes, {type: 'hex'})).fill(pass);

  return ws.writeAsync(buf)
        .then(() => fs.writeFileAsync(file, ''))
        .catch(err => {throw err});
}

module.exports = wipe;
