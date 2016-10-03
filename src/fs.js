'use strict';

const fs = require('fs');
const path = require('path');

const traverse = (path, callback) => {
    if (!callback) { return; }
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach((file,index) => {
            const curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                callback(undefined, {path: path, isDirectory: true, exit: false});
                traverse(curPath, callback);
            } else {
                callback(undefined, {path: curPath, isDirectory: false, exit: true});
            }
        });
        callback(undefined, {path: path, isDirectory: true, exit: true});

    } else {
        callback(new Error(`No such file or directory: "${path}"`));
    }
};

module.exports = {
    traverse: traverse
};
