'use strict';

const assert = require('assert').strict;
const { evaluate: e } = require('../support');

describe('identifiers', () => {
  it('should evaluate accessors', async () => {
    const foo = Promise.resolve('foo');
    const correct = Promise.resolve('correct');

    assert.equal(await e('a["b"]', { a: { b: Promise.resolve(correct) } }), 'correct');
    assert.equal(await e('a[b.c]', { a: { foo: correct }, b: { c: foo } }), 'correct');
    assert.equal(await e('a[b["c"]]', { a: { foo: correct }, b: { c: foo } }), 'correct');
    assert.equal(await e('a["b"].c', { a: { b: { c: correct } } }), 'correct');
    assert.equal(await e('a["b"].c["d"]', { a: { b: { c: { d: correct } } } }), 'correct');
    assert.equal(await e('a[b]', { a: { foo: correct }, b: foo }), 'correct');
  });

  it('should evaluate indenfifiers', async () => {
    assert.equal(await e('a'), undefined);
    assert.equal(await e('a', { a: 'foo' }), 'foo');
    assert.equal(await e('a.b', { a: { b: Promise.resolve('bar') } }), 'bar');
  });

  it('should throw an error when object is undefined', () => {
    return assert.rejects(() => e('a.b'), /Cannot read property 'b' of undefined/);
  });
});
