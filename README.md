# file-wipe

A npm module for wiping a file from the file system *completely* so that it cannot be retrieved later with file retrieval programs.

The method of wiping the file is based off on https://www.cs.auckland.ac.nz/~pgut001/pubs/secure_del.html

## Usage

Install with

```
npm install file-wipe
```

In your application:

```
import file-wipe from 'file-wipe' as wipe;

wipe('file.exe').then(() => {
	console.log("File completely erased!");
});
```

### Customization

Add a ```option``` object to wipe to define a number of settings:

[Coming soon]


