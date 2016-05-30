import test from 'ava';
import fs from 'fs';
import secureRandom from 'secure-random';
import path from 'path';
import bluebird from 'bluebird';
import wipe from '../dist/file-wipe';
import pathExists from 'path-exists';
import glob from 'glob';
const tempWrite = require('temp-write');
bluebird.promisifyAll(fs);

test('wiping file with promise', async t => {

  let fileName = tempWrite.sync(secureRandom(1337, {type: 'Buffer'}));

  //Make sure the example file exists.
  t.true(pathExists.sync(fileName));

  await wipe(fileName)
        .then(() => t.false(pathExists.sync(fileName)))
        //Fail the test if file-wipe returns an error.
        .catch(err => t.fail());

});

test('wiping with callback', async t => {

  let fileName = tempWrite.sync(secureRandom(1337, {type: 'Buffer'}));

  //Make sure the example file exists.
  t.true(pathExists.sync(fileName));

  await wipe(fileName, function(err) {
    if(err) {
      //Fail the test if file-wipe returns an error.
      return t.fail();
    }
    return t.false(pathExists.sync(fileName));
  })
});


test('invalid args', async t => {

  t.throws(() => wipe(), 'Parameter "files" needs to specified. Got undefined');
  t.throws(() => wipe({}), 'Parameter "files" needs to be a string or array. Got object');
  t.throws(() => wipe('', {}), 'Parameter "callback" needs to be a function, null or undefined. Got object');

});
