// Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style license that can be found
// in the LICENSE file.
'use strict';

var formatting = require('./formatting');
var parsing    = require('./parsing');

module.exports = {
  // Shorthands for your convenience.
  parse:  parsing.parse,
  pretty: formatting.pretty,
  // Or the full modules.
  parsing:    parsing,
  formatting: formatting,
};
