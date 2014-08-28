// Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style license that can be found
// in the LICENSE file.
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
