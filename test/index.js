'use strict';

var expect = require('chai').expect;

var stacky = require('../lib');

describe('stacky', function() {
  it('exposes .parse', function() {
    expect(stacky.parse).to.be.a('function');
  });

  it('exposes .pretty', function() {
    expect(stacky.pretty).to.be.a('function');
  });
});
