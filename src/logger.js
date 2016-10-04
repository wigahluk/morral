'use strict';

const utils = require('./utils');
const colors = require('./colors');

const maxArrayLength = 10;
const maxOuterStringLength = 1000;

const disableColors = process.argv.indexOf('--no-colors') >= 0;

const c = disableColors ? s => s : (s, color) => color ? `${color}${s}${colors.reset}` : s;

const timeStamp = () => {
    const n = new Date();
    return `${n.getFullYear()}-${format(n.getMonth() + 1, 2)}-${format(n.getDate() + 1, 2)}` +
        ` ${format(n.getHours(), 2)}:${format(n.getMinutes(), 2)}:${format(n.getSeconds(), 2)}`;
};

const format = (n, d) => (utils.zeroes(d).join('') + Math.floor(n)).slice(-2);

const numToString = s => c(s, colors.cyan);

const boolToString = b => c(b, colors.cyan);

const arrayToString = (a, maxDeep, deep) => {
    if (deep >= maxDeep) return c('<array>', colors.cyan);
    const isLonger = a.length > maxArrayLength;
    const message = a.slice(0, maxArrayLength).map(i => toString(i, maxDeep, deep + 1)).join(', ') +
        (isLonger ? ', ... ' : '');
    return c('[', colors.yellow) + message + c(']', colors.yellow);
};

const forEach = (obj, f) => {
    for (var prop in obj) {
        if( obj.hasOwnProperty( prop ) ) {
            f(obj[prop], prop);
        }
    }
};

const objectToArray = obj => {
    const a = [];
    forEach(obj, (v, k) => a.push([k, v]));
    return a;
};

const objectToString = (a, maxDeep, deep) => {
    if (typeof a === 'undefined' || a === undefined) return c('<undefined>', colors.cyan);
    if (a === null) return c('<null>', colors.cyan);
    if (deep >= maxDeep) return c('<obj>', colors.cyan);
    const array = objectToArray(a);
    const isLonger = array.length > maxArrayLength;
    const message = objectToArray(a).slice(0, maxArrayLength).map(i => `'${i[0]}': ${toString(i[1], maxDeep, deep + 1)}`).join(', ') +
        (isLonger ? ', ... ' : '');
    return c('{', colors.yellow) + message + c('}', colors.yellow);
};

const stringToString = (s, deep) => (deep === 0) ? s : `'${s}'`;

const toString = (o, maxDeep, deep) => {
    const t = typeof o;
    if (t === 'number') return numToString(o);
    if (t === 'boolean') return boolToString(o);
    if (t === 'string') return stringToString(o, deep);
    if (Array.isArray(o)) return arrayToString(o, maxDeep, deep);
    return objectToString(o, maxDeep, deep);
};

const appName = s => timeStamp() + ' ' + c(`[${s}]`, colors.green);

const log = name => function () {
    const args = utils.argsToArray(arguments);
    if (!args || args.length === 0) { return; }
    // If there are several arguments, objects are no longer at deep 0
    const deep = (args.length === 1) ? 0 : 1;
    const message = args.slice(0, maxArrayLength).map(i => toString(i, 3, deep)).join(',\n');

    console.log(appName(name), message);
};

const logger = (name) => {
    const l = log(name);
    return {
        log: l,
        info: l
    };
};

module.exports = logger;