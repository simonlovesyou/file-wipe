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

wipe('file.exe').then(() => {
	console.log("File completely erased!");
})
.catch(err => {
	throw new Error(err);
});
```
### ES5
or if you prefer the classical use of callbacks:

```js
var wipe = require('file-wipe');

wipe('file.exe', function() {
	if(err)
		throw new Error(err);
	console.log("File completely erased!");
});
```

Regular callbacks can be used with ES6 as well.

File globbing is supported

```js
wipe('./sensitive-data/*')
.then(() => {
	console.log("Sensitive files wiped.")
})
```


<br>

##Documentation

### wipe([files [, callback]]) 

Will run the callback or return a promise when all files specified have been wiped.

**Parameters**

**files**: `string|array` The files to be wiped. A string or an array of strings. 

**callback**: `function`, `(OPTIONAL)` The callback to be executed when the file/s have been wiped.

**Returns**: `Promise | undefined`, A promise with the result or undefined if a callback has been provided to the function


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







