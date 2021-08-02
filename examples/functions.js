'use strict';

const start = Date.now();
process.on('exit', () => console.log(`Time: ${Date.now() - start}ms`));

const { evaluate: e, parse } = require('..');
// const e = require('./vendor/static-eval');
// const parse = require('esprima').parse;

const input = '[1,2,3+4*10+n,foo(3+5),bar(10-4, z),obj[""+"x"].y]';
// const ast = parse(input).body[0].expression;

const result = e(parse(input), {
  n: 6,
  foo: async function(x) { return await x * 100; },
  bar: async (x, y) => await x * 100 * y,
  obj: { x: { y: 555 } },
  z: 3
}, { functions: true });

result.then(console.log);