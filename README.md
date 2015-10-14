# file-wipe

A npm module for wiping a file from the file system *completely* so that it cannot be retrieved later with file retrieval programs.

## Introduction
The method of wiping the file is based off on https://www.cs.auckland.ac.nz/~pgut001/pubs/secure_del.html

The file is overwritten by a defined set of Buffer arrays filled with a particular setup of bytes, as specified in the above reference. I CANNOT completely guarantee that any file will be completely wiped. 

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

## License
MIT (See License.txt)

## Author

You can find me here on github as @simonlovesyou or on twitter as @simonjohansosn




