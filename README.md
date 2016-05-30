# file-wipe

A npm module for securely wiping files off the file system *completely* so that it cannot be retrieved later with file retrieval programs.
 
<br>
 
## Introduction
The method used of wiping the file from the hard drive can be found in Peter Gutmann's paper [Secure Deletion of Data from Magnetic and Solid-State Memory](https://www.cs.auckland.ac.nz/~pgut001/pubs/secure_del.html)

The file/s, before being deleted, is overwritten by a defined set of bytes, as specified in the above reference. This will make the file headers and file contents unrecognizeable through different kinds of magnetic hard drives. 

<br>

## Usage

Install with

```shell
npm install file-wipe --save
```
### ES6
In your application:

```js
import wipe from 'file-wipe';

wipe('file.exe')
.then((file) => {
	console.log("File %s completely erased!", file);
})
.catch(err => {
	throw err;
});
```
### ES5
or if you prefer the classical use of callbacks:

```js
var wipe = require('file-wipe');

wipe('file.exe', function(err, file) {
	if(err)
		throw err;
	console.log("File completely erased!");
});
```

File globbing is supported

```js
wipe('./sensitive-data/*')
.then((files) => {
	console.log("Wiped files:");
	console.log(files);
});
```

Pass an options object

```js
const options = {
	tap: (file) => {console.log("Wiped %s", file)}, //Provide a tap function
	unlink: false //If the file should be unlinked after it has been wiped. Defaults to true
}
wipe('./temp-files/*')
.then((files) => {
	console.log("Files wiped:");
	console.log(files);
})
```



<br>

##Documentation

### wipe(files [, options, [, callback]]) 

Will run the callback or return a promise when all files specified have been wiped.

**Parameters**

**files**: `string|array` The files to be wiped. A string or an array of strings. 

**options**: `object` `(OPTIONAL)`

**options.unlink**: `boolean` `(OPTIONAL)` If the files should be unlinked after wipe passes has been applied. Defaults to ``true``

**options.tap**: `function` `(OPTIONAL)` A function to be called after each file has been wiped. 

**callback**: `function`, `(OPTIONAL)` The callback to be executed when the file/s have been wiped.

**Returns**: `Promise`, A promise with an array of files wiped.


## Contribution

Pull requests are welcome! 

<br>

## Disclaimer
Due to how *Solid State Drives* (SSD) store and retrieve data this method will not work on an SSD. Please see [Reliably Erasing Data From Flash-Based Solid State Drives](https://www.usenix.org/legacy/events/fast11/tech/full_papers/Wei.pdf). 

I cannot completely **guarantee** that any file will be completely wiped from the magnetic hard drive. The results may wary on different machines, but this method should make file retrieval, at least, more difficult. 

<br>

## License
MIT (See LICENSE.txt)

<br>

## Author
**Github** [@simonlovesyou](https://github.com/simonlovesyou)

**Twitter** [@simonjohansosn](https://twitter.com/simonjohansosn)







