import test from 'ava';
import fs from 'fs';
import secureRandom from 'secure-random';
import path from 'path';
import bluebird from 'bluebird';
import wipe from '../dist/file-wipe';
bluebird.promisifyAll(fs);


const exampleFile = path.join(process.cwd(), 'example.txt');


test.before(async t => {
  //Create some random data
  let data = secureRandom(1337, {type: 'Buffer'});
  //Create a temporary test file from the data.
  await fs.writeFileAsync(exampleFile, data);
});

test('wiping', async t => {

  t.throws(
    wipe(exampleFile)
    .then(() => fs.statAsync(exampleFile))
    //File should be wiped.
  , /(ENOENT)/);
});