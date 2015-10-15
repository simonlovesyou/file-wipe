# file-wipe

A npm module for wiping a file from the file system *completely* so that it cannot be retrieved later with file retrieval programs.
 
## Introduction
The method of wiping the file is based off on the paper by Peter Gutmann [Secure Deletion of Data from Magnetic and Solid-State Memory](https://www.cs.auckland.ac.nz/~pgut001/pubs/secure_del.html)

The file, before being deleted, is overwritten by a defined set of bytes, as specified in the above reference. This will make the file headers and file contents unrecognizeable through different kinds of magnetic hard drives. 

## Usage

Install with

```
npm install file-wipe --save
```
### ES6
In your application:

```
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

```
var wipe = require('file-wipe');

wipe('file.exe', function() {
	if(err)
		throw new Error(err);
	console.log("File completely erased!");
});
```

Regular callbacks can be used with ES6 as well.

## Contribution

Pull requests are welcome! I need help to setup a good test suite. 

## Disclaimer
Due to how *Solid State Drives* (SSD) store and retrive data this method will not work on an SSD. Please see [Reliably Erasing Data From Flash-Based Solid State Drives](https://www.usenix.org/legacy/events/fast11/tech/full_papers/Wei.pdf). 

I cannot completely **guarantee** that any file will be completely wiped from the magnetic hard drive. The results may wary on different machines, but this method should make file retrieval, at least, more difficult. 

## License
MIT (See LICENSE.txt)

## Author
**Github** [@simonlovesyou](https://github.com/simonlovesyou)

**Twitter** [@simonjohansosn](https://twitter.com/simonjohansosn)







