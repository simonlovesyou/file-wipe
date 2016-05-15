import test from 'ava';
import fs from 'fs';
import secureRandom from 'secure-random';
import path from 'path';
import bluebird from 'bluebird';
import wipe from '../dist/file-wipe';
import pathExists from 'path-exists';
import glob from 'glob';
bluebird.promisifyAll(fs);

//Remove all example files. 
const _rmExampleFiles = () => glob('example\d*.txt', (err, files) => {
  if(err) {
    throw err;
  }
  files.forEach(file => fs.unlink(file));
})

//Write some data to an example file.  
const _writeExampleFile = (file) => fs.writeFileAsync(file, secureRandom(1337, {type: 'Buffer'}))

//Remove the example files if the lib fails to wipe it. 
test.after(_rmExampleFiles);

test('wiping file with promise', async t => {

  let fileName = 'example1.txt';

  await _writeExampleFile(fileName)

  //Make sure the example file exists.
  t.true(pathExists.sync(fileName));

  await wipe(fileName)
        .then(() => t.false(pathExists.sync(fileName)))
        //Fail the test if file-wipe returns an error.
        .catch(err => t.fail());

});

test('wiping with callback', async t => {

  let fileName = 'example2.txt';

  await _writeExampleFile(fileName)

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
