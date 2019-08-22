const expect = require('chai').expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const notImplemented = require('../src/index');

describe('notImplemented', () => {
  it('should return null', () => {
    const result = notImplemented();

    expect(result).to.equal(null);
  });
});
