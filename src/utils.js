'use strict';

const argsToArray = args => Array.prototype.slice.call(args);

const zeroes = n => {
    const a = [];
    for (let i = 0; i < n; i ++) { a.push(0); }
    return a;
};

module.exports = {
    argsToArray: argsToArray,
    zeroes: zeroes
};
