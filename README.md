# morral.js

A bag of small tools for node.js scripts

## Logger

A color logger:

```javascript
const cli = require('morral').logger('My App'); // Configure the logger with the name of your app
// Use it like you use console.log
cli.log('This is just a string.'); // 2016-10-03 17:14:17 [My App] This is just a string with "log". 
```
To disable colors just send `--no-colors` as a *node* or *npm* argument.

## Git

Some information for the git repo (depends on the git command line tools):

```javascript
const morral = require('./src/morral');
const cli = morral.logger('Morral');
const git = morral.git;

git.branch((err, b) => {cli.log(`Branch: ${b}`)}); // 2016-10-03 17:43:08 [Morral] Branch: master
git.sha((err, b) => {cli.log(`SHA: ${b}`)}); // 2016-10-03 17:43:08 [Morral] SHA: 2d78611

```

## Traverse

Will invoke a callback on each file and directory of a given path.
Invocation on directories is done twice, one on entering the directory and one more after all the content
has been processed.

```javascript
const fs = morral.fs;
fs.traverse(process.cwd(), (err, s) => {cli.log(s); });
// 2016-10-03 18:32:28 [Morral] {'path': '.../morral', 'isDirectory': true, 'exit': false}
// ...
// 2016-10-03 18:32:28 [Morral] {'path': '.../morral/src', 'isDirectory': true, exit: true}
// 2016-10-03 18:32:28 [Morral] {'path': '.../morral', 'isDirectory': true, exit: true}
```
