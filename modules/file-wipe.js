'use strict';
import secureRandom from 'secure-random';
import bluePromise from 'bluebird';
const fs = bluePromise.promisifyAll(require('fs'));
import shuffle from 'array-shuffle';

const passes = {
                      /* 1  random */ /* 32  random */
                      /* 2  random */ /* 33  random */
                      /* 3  random */ /* 34  random */
                      /* 4  random */ /* 35  random */

  DETERMINSTIC: [
    "\x55",           /* 5  RLL MFM */
    "\xaa",           /* 6  RLL MFM */
    "\x92\x49\x24",   /* 7  RLL MFM */
    "\x49\x24\x92",   /* 8  RLL MFM */
    "\x24\x92\x49",   /* 9  RLL MFM */
    "\x00",           /* 10 RLL     */
    "\x11",           /* 11 RLL     */
    "\x22",           /* 12 RLL     */
    "\x33",           /* 13 RLL     */
    "\x44",           /* 14 RLL     */
    "\x55",           /* 15 RLL     */
    "\x66",           /* 16 RLL     */
    "\x77",           /* 17 RLL     */
    "\x88",           /* 18 RLL     */
    "\x99",           /* 19 RLL     */
    "\xaa",           /* 20 RLL     */
    "\xbb",           /* 21 RLL     */
    "\xcc",           /* 22 RLL     */
    "\xdd",           /* 23 RLL     */
    "\xee",           /* 24 RLL     */
    "\xff",           /* 25 RLL     */
    "\x92\x49\x24",   /* 26 RLL MFM */
    "\x49\x24\x92",   /* 27 RLL MFM */
    "\x24\x92\x49",   /* 28 RLL MFM */
    "\x6d\xb6\xdb",   /* 29 RLL     */
    "\xb6\xdb\x6d",   /* 30 RLL     */
    "\xdb\x6d\xb6"    /* 31 RLL     */
  ]
}

const wipe = ((file, cb) => fs.statAsync(file)
                            .then(stats => {
    let noBytes         = stats.size,
        randomPasses    = [];
    passes.DETERMINSTIC = shuffle(passes.DETERMINSTIC);
    

    for(var i = 0; i < 7; i++) {
      randomPasses.push(secureRandom(noBytes, {type: 'Buffer'}));
    }
    return iter(0, file, noBytes, randomPasses.slice(0, 3))
    .then(() => iter(0, file, noBytes, passes.DETERMINSTIC))
    .then(() => iter(0, file, noBytes, randomPasses.slice(4,7)))
    .then(() => fs.unlinkAsync(file))
    .then(() => new Promise((resolve, reject) => {
      resolve();
    }))
    .catch(err => err); 
  })
  .then(() => {
    if(cb && typeof cb === 'function') {
      return cb(null);
    }
    return new Promise((resolve, reject) => {
      resolve();
    });
  })
  .catch(err => {
    if(cb && typeof cb === 'function') {
      return cb(err)
    } else return new Promise((resolve, reject) => {
      reject(err);
    });
  }));

function iter(i, file, noBytes, passes) {
  let ws = bluePromise.promisifyAll(fs.createWriteStream(file, {flags: 'w'}));
  let buf = Buffer.isBuffer(passes) ? passes[i] : (new Buffer(noBytes, {type: 'hex'})).fill(passes[i]);

  return ws.writeAsync((new Buffer(noBytes, {type: 'hex'})).fill(passes[i]))
  .then(() => fs.writeFileAsync(file, ''))
  .then(() => {
    if(i < passes.length) {
      return iter(++i, file, noBytes, passes);
    }
    else {
      return new Promise((resolve, reject) => {
        return resolve();
      });
    }
  }).catch(err => err);
}

module.exports = wipe;
