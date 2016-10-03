'use strict';
const childProcess = require('child_process');

const branch = (callback, path) => {
    path = path || process.cwd();
    childProcess.exec('git rev-parse --abbrev-ref HEAD', {cwd: path}, function (error, stdout, stderr) {
        if (error) {
            callback(error, stderr.trim());
            return;
        }
        callback(null, stdout.trim());
    });
};

const sha = (callback, path) => {
    path = path || process.cwd();
    childProcess.exec('git rev-parse --short HEAD', {cwd: path}, function (error, stdout, stderr) {
        if (error) {
            callback(error, stderr.trim());
            return;
        }
        callback(null, stdout.trim());
    });
};

//git rev-parse --short HEAD

module.exports = {
    branch: branch,
    sha: sha
};
