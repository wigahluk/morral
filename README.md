# morral

A bag of small tools for node.js scripts

## Logger

A color logger:

```javascript
const cli = require('morral').logger('My App'); // Configure the logger with the name of your app
// Use it like you'ld useconsole.log
cli.log('This is just a string.'); // 2016-10-03 17:14:17 [My App] This is just a string with "log". 
```
To disable colors just send `--no-colors` as a *node* or *npm* argument.